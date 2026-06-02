/**
 * Chapter Comments SDK - Lightweight iframe embedding
 *
 * Usage:
 *   const cc = new window.ChapterComments({
 *     appId: 'app_xxx',
 *     chapterId: 123,
 *     token: 'optional-proxy-token',
 *     container: document.getElementById('comments'),
 *     theme: 'light',
 *   })
 *
 * Methods:
 *   cc.setToken(token) - Set user token for authentication
 *   cc.destroy() - Remove iframe and cleanup
 *   cc.getCommentCount() - Get current comment count
 */
;(function (window) {
  'use strict'

  /**
   * @param {Object} options
   * @param {string} options.appId - Application ID from admin panel
   * @param {number} options.chapterId - Chapter identifier
   * @param {string} [options.token] - Optional proxy login token
   * @param {HTMLElement} [options.container] - Container element (defaults to creating one)
   * @param {string} [options.theme] - 'light' or 'dark'
   * @param {string} [options.lang] - Language code, default 'zh-CN'
   * @param {string} [options.baseUrl] - Server base URL, defaults to current origin
   * @param {number} [options.bookId] - Optional book ID
   * @param {string} [options.chapterName] - Optional chapter name
   * @param {number} [options.segmentId] - Optional segment ID
   */
  function ChapterComments(options) {
    this.options = Object.assign(
      {
        appId: '',
        chapterId: 0,
        token: '',
        container: null,
        theme: 'light',
        lang: 'zh-CN',
        baseUrl: '',
        bookId: 0,
        chapterName: '',
        segmentId: 0,
      },
      options || {}
    )

    this.iframe = null
    this.commentCount = 0
    this._messageHandler = null
    this._destroyed = false

    if (!this.options.appId) {
      throw new Error('[ChapterComments] appId is required')
    }
    if (!this.options.chapterId) {
      throw new Error('[ChapterComments] chapterId is required')
    }

    this._init()
  }

  ChapterComments.prototype = {
    _init: function () {
      var self = this

      var params = [
        'appId=' + encodeURIComponent(this.options.appId),
        'chapterId=' + this.options.chapterId,
        'theme=' + encodeURIComponent(this.options.theme),
        'lang=' + encodeURIComponent(this.options.lang),
      ]

      if (this.options.token) params.push('token=' + encodeURIComponent(this.options.token))
      if (this.options.bookId) params.push('bookId=' + this.options.bookId)
      if (this.options.chapterName) params.push('chapterName=' + encodeURIComponent(this.options.chapterName))
      if (this.options.segmentId) params.push('segmentId=' + this.options.segmentId)

      var src = (this.options.baseUrl || window.location.origin) + '/embed?' + params.join('&')

      if (!this.options.container) {
        this.options.container = document.createElement('div')
        document.body.appendChild(this.options.container)
      }

      this.iframe = document.createElement('iframe')
      this.iframe.src = src
      this.iframe.style.border = 'none'
      this.iframe.style.width = '100%'
      this.iframe.style.minHeight = '200px'
      this.iframe.setAttribute('scrolling', 'no')
      this.iframe.setAttribute('frameborder', '0')
      this.iframe.setAttribute('allow', 'clipboard-write')

      this.options.container.innerHTML = ''
      this.options.container.appendChild(this.iframe)

      // Listen for messages from iframe
      this._messageHandler = function (event) {
        if (!event.data || event.data.source !== 'chapter-comments') return

        var type = event.data.type
        var data = event.data.data

        if (type === 'resize') {
          self.iframe.style.height = data.height + 'px'
        } else if (type === 'commentCount') {
          self.commentCount = data.count
        } else if (type === 'login') {
          self._emit('login', data)
        }
      }

      window.addEventListener('message', this._messageHandler)
    },

    /**
     * Set authentication token after creation
     * @param {string} token
     */
    setToken: function (token) {
      if (this._destroyed || !this.iframe) return
      this.iframe.contentWindow.postMessage(
        { source: 'parent-sdk', type: 'setToken', data: { token: token } },
        '*'
      )
    },

    /**
     * Get current comment count
     * @returns {number}
     */
    getCommentCount: function () {
      return this.commentCount
    },

    /**
     * Emit custom events
     * @private
     */
    _emit: function (type, data) {
      if (this.options.on && typeof this.options.on === 'function') {
        this.options.on(type, data)
      }
      // Also dispatch CustomEvent on container
      if (this.options.container) {
        this.options.container.dispatchEvent(
          new CustomEvent('cc:' + type, { detail: data })
        )
      }
    },

    /**
     * Destroy iframe and cleanup
     */
    destroy: function () {
      if (this._destroyed) return
      this._destroyed = true

      if (this._messageHandler) {
        window.removeEventListener('message', this._messageHandler)
      }
      if (this.iframe && this.iframe.parentNode) {
        this.iframe.parentNode.removeChild(this.iframe)
      }
      this.iframe = null
    },
  }

  // Expose globally
  window.ChapterComments = ChapterComments

  // Auto-init via data attributes
  document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('[data-cc-app-id]')
    for (var i = 0; i < els.length; i++) {
      var el = els[i]
      new ChapterComments({
        appId: el.getAttribute('data-cc-app-id') || '',
        chapterId: parseInt(el.getAttribute('data-cc-chapter-id') || '0', 10),
        token: el.getAttribute('data-cc-token') || '',
        container: el,
        theme: el.getAttribute('data-cc-theme') || 'light',
        lang: el.getAttribute('data-cc-lang') || 'zh-CN',
        bookId: parseInt(el.getAttribute('data-cc-book-id') || '0', 10),
        chapterName: el.getAttribute('data-cc-chapter-name') || '',
        segmentId: parseInt(el.getAttribute('data-cc-segment-id') || '0', 10),
      })
    }
  })
})(typeof window !== 'undefined' ? window : this)
