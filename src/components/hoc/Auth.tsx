import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AUTH_KEY, CORRECT_PASSWORD } from '@/lib/auth'

/**
 * Higher-Order Component for authentication
 * Wraps a component and protects it with authentication check
 * 
 * Usage:
 * export default withAuth(YourComponent)
 * 
 * Or with display name:
 * export default withAuth(YourComponent, 'YourComponentName')
 */
function withAuth<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	displayName?: string
) {
	const AuthComponent = (props: P) => {
		const [isAuthenticated, setIsAuthenticated] = useState(false)
		const [isLoading, setIsLoading] = useState(true)
		const router = useRouter()

		useEffect(() => {
			const checkAuth = () => {
				if (typeof window === 'undefined') {
					return
				}

				console.log('[withAuth] Checking authentication...')
				const storedPassword = localStorage.getItem(AUTH_KEY)

				if (storedPassword === CORRECT_PASSWORD) {
					console.log('[withAuth] User is authenticated')
					setIsAuthenticated(true)
					setIsLoading(false)
				} else {
					console.log('[withAuth] User is not authenticated, redirecting to login')
					router.push('/login')
				}
			}

			checkAuth()
		}, [router])

		// Loading state
		if (isLoading) {
			return (
				<div 
					style={{ 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center', 
						height: '100vh',
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						color: 'white',
						fontFamily: 'sans-serif'
					}}
				>
					<div style={{ textAlign: 'center' }}>
						<div style={{ fontSize: '24px', marginBottom: '16px' }}>🔐</div>
						<div style={{ fontSize: '16px' }}>Verifying authentication...</div>
					</div>
				</div>
			)
		}

		// Not authenticated (will redirect, but show nothing meanwhile)
		if (!isAuthenticated) {
			return null
		}

		// Authenticated - render the wrapped component
		return <WrappedComponent {...props} />
	}

	// Set display name for better debugging
	AuthComponent.displayName = displayName || `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

	return AuthComponent
}

export default withAuth