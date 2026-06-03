/**
 * ChapterComments SDK
 * 开箱即用的嵌入式评论组件
 * 
 * @version 1.0.0
 */
(function() {
  'use strict';

  /**
   * @typedef {Object} ChapterCommentsConfig
   * @property {string} baseUrl - 评论服务的基础URL
   * @property {string} appId - 应用ID
   * @property {string|HTMLElement} container - 容器选择器或DOM元素
   * @property {number} [chapterId] - 章节ID
   * @property {string} [token] - 代理登录token
   * @property {string} [theme='light'] - 主题 ('light' | 'dark')
   * @property {string} [lang='zh-CN'] - 语言
   * @property {boolean} [showPoweredBy=true] - 是否显示"Powered by"
   */

  class ChapterComments {
    /**
     * @param {ChapterCommentsConfig} config
     */
    constructor(config) {
      if (!config.appId) {
        throw new Error('appId is required');
      }
      if (!config.container) {
        throw new Error('container is required');
      }

      this.config = {
        baseUrl: config.baseUrl || window.location.origin,
        appId: config.appId,
        container: typeof config.container === 'string' 
          ? document.querySelector(config.container) 
          : config.container,
        chapterId: config.chapterId || 0,
        token: config.token || '',
        theme: config.theme || 'light',
        lang: config.lang || 'zh-CN',
        showPoweredBy: config.showPoweredBy !== false,
      };

      if (!this.config.container) {
        throw new Error('Container element not found');
      }

      this.iframe = null;
      this._init();
    }

    _init() {
      this._createIframe();
    }

    _createIframe() {
      const params = new URLSearchParams({
        appId: this.config.appId,
        theme: this.config.theme,
        lang: this.config.lang,
      });

      if (this.config.chapterId) {
        params.set('chapterId', String(this.config.chapterId));
      }
      if (this.config.token) {
        params.set('token', this.config.token);
      }

      const iframe = document.createElement('iframe');
      iframe.src = `${this.config.baseUrl}/embed?${params.toString()}`;
      iframe.style.width = '100%';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.setAttribute('title', '评论区');
      
      this.config.container.appendChild(iframe);
      this.iframe = iframe;

      // 监听来自 iframe 的消息
      this._messageHandler = this._handleMessage.bind(this);
      window.addEventListener('message', this._messageHandler);

      // 初始高度设置
      this._setHeight(400);
    }

    _handleMessage(event) {
      // 只处理来自 iframe 的消息
      if (event.source !== this.iframe.contentWindow) return;
      
      const data = event.data;
      if (!data || data.source !== 'chapter-comments') return;

      // 处理 resize 事件
      if (data.type === 'resize' && data.height) {
        this._setHeight(data.height);
      }

      // 处理评论数事件
      if (data.type === 'commentCount' && typeof data.count === 'number') {
        this._dispatchEvent('commentCount', { count: data.count });
      }

      // 处理登录事件
      if (data.type === 'login' && data.userId) {
        this._dispatchEvent('login', { userId: data.userId });
      }
    }

    _setHeight(height) {
      if (this.iframe) {
        this.iframe.style.height = Math.max(height, 200) + 'px';
      }
    }

    /**
     * 更新代理登录token
     * 当宿主应用切换用户时调用此方法
     * @param {string} token - 新的代理登录token
     */
    setToken(token) {
      this.config.token = token;
      if (this.iframe && this.iframe.contentWindow) {
        this.iframe.contentWindow.postMessage(
          { source: 'parent-sdk', action: 'setToken', token },
          '*'
        );
      }
    }

    /**
     * 更新章节ID
     * @param {number} chapterId - 新的章节ID
     */
    setChapterId(chapterId) {
      this.config.chapterId = chapterId;
      this._reload();
    }

    /**
     * 重新加载评论区
     */
    _reload() {
      if (this.iframe && this.config.container) {
        this.config.container.removeChild(this.iframe);
        this._createIframe();
      }
    }

    /**
     * 获取评论数
     * @returns {Promise<number>}
     */
    getCommentCount() {
      return new Promise((resolve, reject) => {
        let resolved = false;
        
        const handler = (e) => {
          if (e.source !== this.iframe.contentWindow) return;
          if (!e.data || e.data.source !== 'chapter-comments') return;
          
          if (e.data.type === 'commentCount' && typeof e.data.count === 'number') {
            resolved = true;
            window.removeEventListener('message', handler);
            clearTimeout(timeout);
            resolve(e.data.count);
          }
        };

        const timeout = setTimeout(() => {
          if (!resolved) {
            window.removeEventListener('message', handler);
            resolve(0);
          }
        }, 3000);

        window.addEventListener('message', handler);
        
        if (this.iframe && this.iframe.contentWindow) {
          this.iframe.contentWindow.postMessage(
            { source: 'parent-sdk', action: 'getCommentCount' },
            '*'
          );
        }
      });
    }

    /**
     * 派发自定义事件到容器元素
     * @param {string} type - 事件类型
     * @param {Object} detail - 事件详情
     * @private
     */
    _dispatchEvent(type, detail) {
      const event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail,
      });
      this.config.container.dispatchEvent(event);
    }

    /**
     * 销毁组件
     */
    destroy() {
      if (this._messageHandler) {
        window.removeEventListener('message', this._messageHandler);
      }
      if (this.iframe && this.config.container) {
        this.config.container.removeChild(this.iframe);
        this.iframe = null;
      }
    }

    /**
     * 获取组件版本
     * @returns {string}
     */
    static getVersion() {
      return '1.0.0';
    }
  }

  // 导出到全局
  if (typeof window !== 'undefined') {
    window.ChapterComments = ChapterComments;
  }

  // 支持 AMD / CommonJS
  if (typeof define === 'function' && define.amd) {
    define(function() { return ChapterComments; });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChapterComments;
  }
})();
