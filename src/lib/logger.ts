/**
 * Structured logging utility for Vercel deployment
 * Provides consistent, searchable logs with context and error tracking
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogContext {
	[key: string]: any
}

class Logger {
	private formatLog(
		level: LogLevel,
		message: string,
		context?: LogContext,
		error?: Error
	): string {
		const timestamp = new Date().toISOString()
		const logEntry: any = {
			timestamp,
			level: level.toUpperCase(),
			message,
		}

		// Add context if provided
		if (context && Object.keys(context).length > 0) {
			logEntry.context = context
		}

		// Add error details if provided
		if (error) {
			logEntry.error = {
				name: error.name,
				message: error.message,
				stack: error.stack,
			}
		}

		return JSON.stringify(logEntry)
	}

	info(message: string, context?: LogContext) {
		console.log(this.formatLog('info', message, context))
	}

	warn(message: string, context?: LogContext) {
		console.warn(this.formatLog('warn', message, context))
	}

	error(message: string, context?: LogContext, error?: Error) {
		console.error(this.formatLog('error', message, context, error))
	}

	debug(message: string, context?: LogContext) {
		if (process.env.NODE_ENV === 'development') {
			console.debug(this.formatLog('debug', message, context))
		}
	}

	// Timing utility for performance monitoring
	startTimer(label: string): () => void {
		const start = Date.now()
		return () => {
			const duration = Date.now() - start
			this.info(`${label} completed`, { duration_ms: duration })
		}
	}
}

// Export singleton instance
const logger = new Logger()
export default logger

