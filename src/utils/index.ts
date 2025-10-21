import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const mergeClassNames = (...classList: ClassValue[]): string => {
  return twMerge(clsx(classList))
}

export const formatCurrency = (value: number, currency = 'BRL'): string => 
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value)

export const formatDate = (date: Date, locale = 'pt-BR'): string => 
  new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)

export const formatDateTime = (date: Date, locale = 'pt-BR'): string => 
  new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

export const debounce = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  waitMs: number
): ((...args: TArgs) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return (...args: TArgs) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => callback(...args), waitMs)
  }
}

export const throttle = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  intervalMs: number
): ((...args: TArgs) => void) => {
  let locked = false
  return (...args: TArgs) => {
    if (locked) return
    callback(...args)
    locked = true
    setTimeout(() => {
      locked = false
    }, intervalMs)
  }
}

export const generateId = (): string => {
  return Math.random().toString(36).slice(2, 11)
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
