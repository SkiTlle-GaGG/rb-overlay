import React from 'react'
import styles from './slide-in.module.css'

export type SlideInStatus = 'hidden' | 'sliding-in' | 'visible' | 'sliding-out'

export enum SlideInStatusEnum {
	HIDDEN = 'hidden',
	SLIDING_IN = 'sliding-in',
	VISIBLE = 'visible',
	SLIDING_OUT = 'sliding-out'
}

interface SlideInProps {
	children: React.ReactNode
	status: SlideInStatus
	className?: string
}

function SlideIn({ children, status, className = '' }: SlideInProps) {
	const getStatusClassName = (): string => {
		switch (status) {
			case SlideInStatusEnum.HIDDEN:
				return styles.hidden
			case SlideInStatusEnum.SLIDING_IN:
				return styles.slideIn
			case SlideInStatusEnum.VISIBLE:
				return styles.visible
			case SlideInStatusEnum.SLIDING_OUT:
				return styles.slideOut
			default:
				return styles.hidden
		}
	}

	const combinedClassName = `${styles.container} ${getStatusClassName()} ${className}`.trim()

	return (
		<div className={combinedClassName}>
			{children}
		</div>
	)
}

export default SlideIn

