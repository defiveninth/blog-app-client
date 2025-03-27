import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL!

export function urlCreator(path: string) {
  return API_URL + '/' + path
}

export function validateUsername(str: string, maxLength: number) {
	if (str.length <= maxLength) return str
	const visibleChars = Math.min(6, maxLength)
	return str.slice(0, visibleChars) + '...'
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).split('/').join('.')
}
