import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Download, RefreshCw, Database, Calendar, FileJson, AlertCircle, CheckCircle2 } from 'lucide-react'
import withAuth from '@/components/hoc/Auth'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

interface FileInfo {
	name: string
	size: number
	created: string
	updated: string
	publicUrl: string
	signedUrl: string
}

interface SyncResult {
	success: boolean
	message: string
	timestamp: string
	localFile?: string
	gcsUpload?: {
		success: boolean
		fileName?: string
		bucket?: string
		publicUrl?: string
		error?: string
	}
	error?: string
}

function DataSyncPage() {
	const [files, setFiles] = useState<FileInfo[]>([])
	const [loading, setLoading] = useState(false)
	const [syncing, setSyncing] = useState(false)
	const [syncResult, setSyncResult] = useState<SyncResult | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [bucketName, setBucketName] = useState<string>('')

	const fetchFiles = async () => {
		setLoading(true)
		setError(null)
		try {
			const response = await fetch('/api/list-event-files')
			const data = await response.json()

			if (data.success) {
				setFiles(data.files || [])
				setBucketName(data.bucketName || '')
			} else {
				setError(data.error || 'Failed to load files')
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load files')
		} finally {
			setLoading(false)
		}
	}

	const handleSync = async () => {
		setSyncing(true)
		setSyncResult(null)
		setError(null)

		try {
			const response = await fetch('/api/sync-event-data', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const data = await response.json()
			setSyncResult(data)

			if (data.success) {
				// Refresh the file list after successful sync
				setTimeout(fetchFiles, 2000)
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to sync data')
		} finally {
			setSyncing(false)
		}
	}

	useEffect(() => {
		fetchFiles()
	}, [])

	const formatBytes = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
	}

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(date)
	}

	return (
		<DashboardLayout>
			<div className="space-y-6">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold text-white font-redbull-cond-bold tracking-wider">
						EVENT DATA SYNC
					</h1>
					<p className="text-gaming-light-gray font-redbull-book">
						Manage event data synchronization and view archived versions
					</p>
				</div>

			<div className="grid gap-6">
				<Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
					<CardHeader>
						<CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
							<Database className="h-5 w-5 text-redbull-red" />
							Data Synchronization
						</CardTitle>
						<CardDescription className="text-gaming-light-gray font-redbull-book">
							Fetch the latest event data from Riot Games API and store it locally and in GCP Cloud Storage
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button
							onClick={handleSync}
							disabled={syncing}
							className="w-full sm:w-auto"
							size="lg"
						>
							{syncing ? (
								<>
									<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
									Syncing Data...
								</>
							) : (
								<>
									<RefreshCw className="mr-2 h-4 w-4" />
									Sync Event Data
								</>
							)}
						</Button>

						{syncResult && (
							<Alert variant={syncResult.success ? 'default' : 'destructive'}>
								{syncResult.success ? (
									<CheckCircle2 className="h-4 w-4" />
								) : (
									<AlertCircle className="h-4 w-4" />
								)}
								<AlertTitle>
									{syncResult.success ? 'Sync Successful' : 'Sync Failed'}
								</AlertTitle>
								<AlertDescription className="space-y-2">
									<p>{syncResult.message}</p>
									{syncResult.success && syncResult.gcsUpload && (
										<div className="text-sm space-y-1 mt-2">
											<p>
												<strong>Local File:</strong> Updated successfully
											</p>
											<p>
												<strong>Cloud Storage:</strong>{' '}
												{syncResult.gcsUpload.success ? (
													<>
															<Badge variant="secondary" className="ml-1">
																<p className='text-black'>{syncResult.gcsUpload.fileName}</p>
														</Badge>
													</>
												) : (
													<Badge variant="destructive" className="ml-1">
														{syncResult.gcsUpload.error}
													</Badge>
												)}
											</p>
										</div>
									)}
									{syncResult.error && (
										<p className="text-sm mt-2">
											<strong>Error:</strong> {syncResult.error}
										</p>
									)}
								</AlertDescription>
							</Alert>
						)}

						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
								<FileJson className="h-5 w-5 text-redbull-red" />
								Archived Files
							</CardTitle>
							<CardDescription className="text-gaming-light-gray font-redbull-book">
								{bucketName && (
									<span>
										Bucket: <Badge variant="outline">{bucketName}</Badge>
									</span>
								)}
							</CardDescription>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={fetchFiles}
							disabled={loading}
						>
							{loading ? (
								<RefreshCw className="h-4 w-4 animate-spin" />
							) : (
								<RefreshCw className="h-4 w-4" />
							)}
						</Button>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div className="flex items-center justify-center py-8">
								<RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
							</div>
						) : files.length === 0 ? (
							<div className="text-center py-8 text-muted-foreground">
								<FileJson className="h-12 w-12 mx-auto mb-2 opacity-50" />
								<p>No archived files found</p>
								<p className="text-sm">Sync data to create your first archive</p>
							</div>
						) : (
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>File Name</TableHead>
											<TableHead>
												<Calendar className="inline h-4 w-4 mr-1" />
												Created
											</TableHead>
											<TableHead>Size</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{files.map((file, idx) => (
											<TableRow
												key={file.name}
												className={`text-white ${idx % 2 === 1 ? 'bg-gaming-dark/60' : ''}`}
											>
												<TableCell className="font-mono text-sm">
													{file.name}
												</TableCell>
												<TableCell>{formatDate(file.created)}</TableCell>
												<TableCell>{formatBytes(file.size)}</TableCell>
												<TableCell className="text-right">
													<Button
														variant="ghost"
														size="sm"
														asChild
													>
														<a
															href={file.signedUrl}
															target="_blank"
															rel="noopener noreferrer"
															download={file.name}
														>
															<Download className="h-4 w-4 mr-1" />
															Download
														</a>
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
			</div>
		</DashboardLayout>
	)
}

export default withAuth(DataSyncPage)

