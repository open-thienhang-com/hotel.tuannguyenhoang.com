import { toast } from '@/hooks/use-toast'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

class ToastManager {
  private show(type: ToastType, options: ToastOptions) {
    const { title, description, duration = 5000 } = options

    return toast({
      title,
      description,
      variant: this.getVariant(type),
      duration,
    })
  }

  private getVariant(type: ToastType) {
    switch (type) {
      case 'success':
        return 'success' as const
      case 'error':
        return 'destructive' as const
      case 'warning':
        return 'warning' as const
      case 'info':
      default:
        return 'default' as const
    }
  }

  success(options: ToastOptions) {
    return this.show('success', options)
  }

  error(options: ToastOptions) {
    return this.show('error', options)
  }

  warning(options: ToastOptions) {
    return this.show('warning', options)
  }

  info(options: ToastOptions) {
    return this.show('info', options)
  }

  // Quick methods for common use cases
  successMessage(message: string, title = 'Success') {
    return this.success({ title, description: message })
  }

  errorMessage(message: string, title = 'Error') {
    return this.error({ title, description: message })
  }

  warningMessage(message: string, title = 'Warning') {
    return this.warning({ title, description: message })
  }

  infoMessage(message: string, title = 'Info') {
    return this.info({ title, description: message })
  }
}

export const toastManager = new ToastManager()
export type { ToastOptions, ToastType }
