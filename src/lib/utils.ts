import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const mergeClassNames = (...classList: ClassValue[]): string => twMerge(clsx(classList))
