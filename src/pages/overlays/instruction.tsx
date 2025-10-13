import React, { useState } from 'react'
import Image from 'next/image'

interface InstructionStep {
	stepNumber: number
	title: string
	description: string
	imagePath: string
	imageAlt: string
	highlight?: string
}

const instructionSteps: InstructionStep[] = [
	{
		stepNumber: 1,
		title: 'Browserquelle hinzufügen',
		description: 'Öffnen Sie OBS und gehen Sie zum Quellen-Panel. Klicken Sie auf die + Schaltfläche, um eine neue Quelle hinzuzufügen.',
		imagePath: '/images/add_browser_source.png',
		imageAlt: 'Browserquelle in OBS hinzufügen',
		highlight: 'START'
	},
	{
		stepNumber: 2,
		title: 'Browserquelle auswählen',
		description: 'Wählen Sie "Browser" als Quellentyp aus der Liste der verfügbaren Quellen.',
		imagePath: '/images/browser_source_init.png',
		imageAlt: 'Browserquellentyp auswählen'
	},
	{
		stepNumber: 3,
		title: 'Quelle benennen',
		description: 'Geben Sie Ihrer Browserquelle einen erkennbaren Namen (z.B. "Turnier-Overlay") und klicken Sie auf OK.',
		imagePath: '/images/browser_source_name_form.png',
		imageAlt: 'Browserquelle benennen'
	},
	{
		stepNumber: 4,
		title: 'Auflösung konfigurieren',
		description: 'Setzen Sie im Einstellungsfenster die Breite auf 1920 und die Höhe auf 1080 für Full HD Qualität.',
		imagePath: '/images/browser_source_full_hd.png',
		imageAlt: 'Auflösung der Browserquelle einstellen',
	},
	{
		stepNumber: 5,
		title: 'Overlay-URL hinzufügen',
		description: 'Fügen Sie im URL-Feld den Overlay-Link ein, den Sie vom Admin-Panel erhalten haben.',
		imagePath: '/images/browser_source_final.png',
		imageAlt: 'Overlay-URL hinzufügen'
	},
	{
		stepNumber: 6,
		title: 'Auf Vollbild anpassen',
		description: 'Stellen Sie sicher, dass das Overlay den gesamten Bildschirm ausfüllt. Klicken Sie mit der rechten Maustaste auf die Quelle und verwenden Sie Transformieren → An Bildschirm anpassen.',
		imagePath: '/images/browser_source_full_view.png',
		imageAlt: 'Overlay an Bildschirm anpassen'
	},
	{
		stepNumber: 7,
		title: 'Overlay überprüfen',
		description: 'Überprüfen Sie, ob die Slide-Animation korrekt erscheint und wechselt. Das Overlay sollte in den angegebenen Intervallen ein- und ausgeblendet werden.',
		imagePath: '/images/With overlay.png',
		imageAlt: 'Finale Overlay-Vorschau',
		highlight: 'FERTIG'
	}
]

function InstructionPage() {
	const [selectedImage, setSelectedImage] = useState<InstructionStep | null>(null)

	const handleImageClick = (step: InstructionStep) => {
		setSelectedImage(step)
	}

	const handleCloseModal = () => {
		setSelectedImage(null)
	}

  return (
		<div 
			className="min-h-screen relative overflow-hidden"
			style={{
				background: 'linear-gradient(135deg, #0A0E27 0%, #1a1a2e 50%, #16213e 100%)'
			}}
		>
			{/* Animated background pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
			</div>

			{/* Red Bull accent lines */}
			<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600" />
			<div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600" />
			
			<div className="relative z-10 container mx-auto px-4 py-16">
				{/* Header Section */}
				<div className="text-center mb-16 relative">
					{/* Diagonal accent stripe */}
					<div 
						className="absolute -top-20 left-1/2 -translate-x-1/2 w-[150%] h-40 opacity-20"
						style={{
							background: 'linear-gradient(120deg, transparent 40%, #DC0A2D 45%, #FDB913 50%, #DC0A2D 55%, transparent 60%)',
							transform: 'translateX(-50%) skewY(-2deg)'
						}}
					/>
					
					<div className="relative">
						<div className="inline-block mb-4">
							<div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-2 transform -skew-x-12">
								<span className="text-yellow-300 font-bold text-sm tracking-widest font-redbull-cond">
									SETUP
								</span>
							</div>
						</div>
						
						<h1 className="text-7xl font-black text-white mb-6 font-redbull-cond tracking-tight uppercase leading-none">
							OBS OVERLAY
							<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">
								EINRICHTUNG
							</span>
						</h1>
						
						<div className="max-w-3xl mx-auto">
							<div className="bg-black/40 backdrop-blur-sm border-l-4 border-red-600 px-6 py-4">
								<p className="text-xl text-gray-200 font-redbull-book">
									Folgen Sie dieser Schritt-für-Schritt-Anleitung, um das Turnier-Overlay zu Ihrem OBS-Streaming-Setup hinzuzufügen
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Instructions Steps */}
				<div className="max-w-7xl mx-auto space-y-6">
					{instructionSteps.map((step, index) => (
						<div 
							key={step.stepNumber}
							className="group relative"
						>
							{/* Step connector line */}
							{index < instructionSteps.length - 1 && (
								<div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-red-600 to-transparent z-0" />
							)}

							<div className={`relative flex flex-col lg:flex-row gap-6 bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-sm border-2 border-gray-800 hover:border-red-600 transition-all duration-300 overflow-hidden ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
								{/* Red Bull accent corner */}
								<div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
									<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-600/20 to-transparent transform rotate-45 translate-x-20 -translate-y-20" />
								</div>

								{/* Step number badge */}
								<div className="absolute -left-4 top-8 z-20">
									<div className="relative">
										<div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 transform -skew-x-12 flex items-center justify-center shadow-lg shadow-red-600/50">
											<span className="text-white font-black text-3xl font-redbull-cond skew-x-12">
												{step.stepNumber}
											</span>
										</div>
										{step.highlight && (
											<div className="absolute -right-4 -top-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold transform rotate-12">
												{step.highlight}
											</div>
										)}
									</div>
								</div>

								{/* Content */}
								<div className="flex-1 p-8 pl-16 flex flex-col justify-center">
									<div className="mb-4">
										<div className="flex items-center gap-3 mb-2">
											<div className="h-1 w-12 bg-gradient-to-r from-red-600 to-yellow-400" />
											<span className="text-red-400 font-bold text-xs tracking-widest font-redbull-cond">
												SCHRITT {step.stepNumber}
											</span>
										</div>
										<h2 className="text-4xl font-black text-white font-redbull-cond uppercase tracking-tight leading-tight mb-4">
											{step.title}
										</h2>
									</div>
									<p className="text-gray-300 text-lg leading-relaxed font-redbull-book">
										{step.description}
									</p>

									{/* Action indicator */}
									<div className="mt-6 flex items-center gap-2 text-yellow-400">
										<div className="w-2 h-2 bg-yellow-400 animate-pulse" />
										<span className="text-sm font-bold font-redbull-cond tracking-wide">
											AKTION ERFORDERLICH
										</span>
									</div>
								</div>

								{/* Image */}
								<div 
									className="flex-1 relative min-h-[350px] lg:min-h-[450px] bg-black/30 border-l-4 border-red-600/30 group cursor-pointer"
									onClick={() => handleImageClick(step)}
								>
									<div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent" />
									<Image
										src={step.imagePath}
										alt={step.imageAlt}
										fill
										className="object-contain p-6 transition-transform duration-300 ease-in-out group-hover:scale-105"
										priority={index < 2}
									/>
									{/* Zoom indicator */}
									<div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="flex items-center gap-2 text-white">
											<svg 
												className="w-5 h-5" 
												fill="none" 
												viewBox="0 0 24 24" 
												stroke="currentColor"
											>
												<path 
													strokeLinecap="round" 
													strokeLinejoin="round" 
													strokeWidth={2} 
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" 
												/>
											</svg>
											<span className="text-xs font-bold font-redbull-cond">VERGRÖSSERN</span>
										</div>
									</div>
									{/* Image frame accent */}
									<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Completion Banner */}
				<div className="mt-16 relative">
					<div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 opacity-20 blur-xl" />
					<div className="relative bg-gradient-to-r from-red-600/90 to-red-800/90 backdrop-blur-sm transform -skew-x-2 p-8">
						<div className="skew-x-2 text-center">
							<div className="inline-block mb-4">
								<div className="flex items-center justify-center gap-4">
									<div className="h-1 w-16 bg-yellow-400" />
									<svg 
										className="w-12 h-12 text-yellow-400" 
										fill="none" 
										viewBox="0 0 24 24" 
										stroke="currentColor"
									>
										<path 
											strokeLinecap="round" 
											strokeLinejoin="round" 
											strokeWidth={3} 
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
										/>
									</svg>
									<div className="h-1 w-16 bg-yellow-400" />
								</div>
							</div>
							<h3 className="text-4xl font-black text-white mb-4 font-redbull-cond uppercase tracking-tight">
								Bereit zum Streamen!
							</h3>
							<p className="text-xl text-gray-100 max-w-3xl mx-auto font-redbull-book">
								Ihr Overlay ist jetzt einsatzbereit. Starten Sie Ihren Stream und bringen Sie das Turnier auf das nächste Level!
							</p>
						</div>
					</div>
				</div>

				{/* Bottom spacing */}
				<div className="h-16" />
			</div>

			{/* Full Screen Image Modal */}
			{selectedImage && (
				<div 
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
					onClick={handleCloseModal}
				>
					{/* Close button */}
					<button
						className="absolute top-6 right-6 z-50 group"
						onClick={handleCloseModal}
						aria-label="Close"
					>
						<div className="bg-gradient-to-br from-red-600 to-red-800 p-3 transform -skew-x-12 hover:scale-110 transition-transform duration-200 shadow-lg shadow-red-600/50">
							<svg 
								className="w-8 h-8 text-white skew-x-12" 
								fill="none" 
								viewBox="0 0 24 24" 
								stroke="currentColor"
							>
								<path 
									strokeLinecap="round" 
									strokeLinejoin="round" 
									strokeWidth={3} 
									d="M6 18L18 6M6 6l12 12" 
								/>
							</svg>
						</div>
					</button>

					{/* Modal header */}
					<div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-8 z-40">
						<div className="container mx-auto">
							<div className="flex items-center gap-4">
								<div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 transform -skew-x-12">
									<span className="text-yellow-300 font-bold text-sm tracking-widest font-redbull-cond skew-x-12">
										SCHRITT {selectedImage.stepNumber}
									</span>
								</div>
								<h3 className="text-3xl font-black text-white font-redbull-cond uppercase">
									{selectedImage.title}
								</h3>
							</div>
						</div>
					</div>

					{/* Image container */}
					<div 
						className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-20"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="relative w-full h-full bg-gradient-to-br from-gray-900/50 to-black/50 border-4 border-red-600/50 shadow-2xl shadow-red-600/20">
							<Image
								src={selectedImage.imagePath}
								alt={selectedImage.imageAlt}
								fill
								className="object-contain p-4"
								quality={100}
							/>
						</div>
					</div>

					{/* Modal footer */}
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 z-40">
						<div className="container mx-auto text-center">
							<p className="text-xl text-gray-300 font-redbull-book max-w-4xl mx-auto">
								{selectedImage.description}
							</p>
							<div className="mt-4 flex items-center justify-center gap-2 text-red-400">
								<span className="text-sm font-bold font-redbull-cond tracking-wide">
									KLICKEN SIE AUSSERHALB DES BILDES ZUM SCHLIESSEN
								</span>
							</div>
						</div>
					</div>

					{/* Decorative corners */}
					<div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-red-600" />
					<div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-red-600" />
					<div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-red-600" />
					<div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-red-600" />
				</div>
			)}
		</div>
	)
}

export default InstructionPage
