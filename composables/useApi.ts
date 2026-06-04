export function useApi() {
  const { token } = useAuthStore()

  const request = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    if (token.value) {
      headers['Authorization'] = `Bearer ${token.value}`
    }

    const response = await $fetch<T>(url, {
      ...options,
      headers,
    })

    return response
  }

  const get = <T>(url: string, params?: Record<string, any>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return request<T>(`${url}${query}`, { method: 'GET' })
  }

  const post = <T>(url: string, body?: any) => {
    return request<T>(url, { method: 'POST', body: JSON.stringify(body) })
  }

  const put = <T>(url: string, body?: any) => {
    return request<T>(url, { method: 'PUT', body: JSON.stringify(body) })
  }

  const del = <T>(url: string) => {
    return request<T>(url, { method: 'DELETE' })
  }

  return { get, post, put, del }
}
