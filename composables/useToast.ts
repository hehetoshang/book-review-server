export function useToast() {
  const show = (msg: string) => {
    if (import.meta.client) {
      alert(msg)
    }
  }

  const error = (e: any, fallback: string = '操作失败') => {
    if (import.meta.client) {
      const msg = e.data?.message || e.data?.statusMessage || e.message || fallback
      alert(msg)
    }
  }

  return { show, error }
}
