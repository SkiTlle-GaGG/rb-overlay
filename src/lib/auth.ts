export const AUTH_KEY = 'redbull_gaming_password'
export const CORRECT_PASSWORD = 'abracadabra'

export function setCookie(name: string, value: string, days: number = 365) {
	const expires = new Date()
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
	const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
	document.cookie = cookieString
	console.log('[setCookie] Setting cookie:', cookieString)
}

export function deleteCookie(name: string) {
	document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`
	console.log('[deleteCookie] Deleting cookie:', name)
}

export function logout() {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(AUTH_KEY)
		deleteCookie(AUTH_KEY)
		window.location.href = '/login'
	}
}

export function isAuthenticated(): boolean {
	if (typeof window !== 'undefined') {
		return localStorage.getItem(AUTH_KEY) === CORRECT_PASSWORD
	}
	return false
}

