import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const AUTH_KEY = 'redbull_gaming_password'
const CORRECT_PASSWORD = 'abracadabra'

function setCookie(name: string, value: string, days: number = 365) {
	const expires = new Date()
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
	const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
	document.cookie = cookieString
	console.log('[setCookie] Setting cookie:', cookieString)
}

function Login() {
	const [input, setInput] = useState('')
	const [error, setError] = useState('')
	const [isChecking, setIsChecking] = useState(true)
	const router = useRouter()

	useEffect(() => {
		// Check if already authenticated
		if (typeof window !== 'undefined') {
			const storedPassword = localStorage.getItem(AUTH_KEY)
			if (storedPassword === CORRECT_PASSWORD) {
				// Already authenticated, redirect to home
				router.push('/')
			} else {
				setIsChecking(false)
			}
		}
	}, [router])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		
		if (input === CORRECT_PASSWORD) {
			console.log('[Login] Password correct, setting auth...')
			
			// Set both localStorage and cookie
			localStorage.setItem(AUTH_KEY, CORRECT_PASSWORD)
			console.log('[Login] localStorage set')
			
			setCookie(AUTH_KEY, CORRECT_PASSWORD)
			console.log('[Login] Cookie set')
			
			// Verify cookie was set
			console.log('[Login] Document cookies:', document.cookie)
			
			// Redirect to home page
			console.log('[Login] Redirecting to home...')
			router.push('/')
		} else {
			setError('Incorrect password. Try again.')
		}
	}

	if (isChecking) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<div>Checking authentication...</div>
			</div>
		)
	}

	return (
		<div style={{ 
			display: 'flex', 
			justifyContent: 'center', 
			alignItems: 'center', 
			minHeight: '100vh',
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
		}}>
			<div style={{
				background: 'white',
				padding: '40px',
				borderRadius: '12px',
				boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
				minWidth: '350px'
			}}>
				<form onSubmit={handleSubmit} style={{ 
					display: 'flex', 
					flexDirection: 'column', 
					gap: 16 
				}}>
					<h1 style={{ 
						textAlign: 'center', 
						marginBottom: '20px',
						color: '#333',
						fontSize: '28px'
					}}>
						🔐 Red Bull Gaming
					</h1>
					<p style={{ 
						textAlign: 'center', 
						color: '#666',
						marginBottom: '20px'
					}}>
						Enter password to access
					</p>
					<input
						type="password"
						placeholder="Enter password"
						value={input}
						onChange={e => setInput(e.target.value)}
						style={{ 
							padding: '12px 16px', 
							fontSize: '16px',
							border: '2px solid #e0e0e0',
							borderRadius: '8px',
							outline: 'none',
							transition: 'border-color 0.3s'
						}}
						onFocus={(e) => e.target.style.borderColor = '#667eea'}
						onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
					/>
					<button 
						type="submit" 
						style={{ 
							padding: '12px 16px', 
							fontSize: '16px',
							background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
							color: 'white',
							border: 'none',
							borderRadius: '8px',
							cursor: 'pointer',
							fontWeight: 'bold',
							transition: 'transform 0.2s'
						}}
						onMouseEnter={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.02)'}
						onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
					>
						Login
					</button>
					{error && (
						<div style={{ 
							color: '#e74c3c', 
							marginTop: '8px',
							textAlign: 'center',
							padding: '8px',
							background: '#fee',
							borderRadius: '6px',
							fontSize: '14px'
						}}>
							{error}
						</div>
					)}
				</form>
			</div>
		</div>
	)
}

export default Login