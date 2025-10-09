#!/usr/bin/env node

/**
 * Utility script to encode GCP service account key to base64
 * Usage: node scripts/encode-gcp-key.js path/to/service-account-key.json
 */

const fs = require('fs')
const path = require('path')

function encodeGCPKey(filePath) {
	try {
		// Check if file exists
		if (!fs.existsSync(filePath)) {
			console.error(`❌ Error: File not found: ${filePath}`)
			process.exit(1)
		}

		// Read the file
		const fileContent = fs.readFileSync(filePath, 'utf-8')

		// Validate JSON
		let jsonData
		try {
			jsonData = JSON.parse(fileContent)
		} catch (parseError) {
			console.error(`❌ Error: Invalid JSON in file: ${parseError.message}`)
			process.exit(1)
		}

		// Check required fields
		const requiredFields = ['type', 'project_id', 'private_key', 'client_email']
		const missingFields = requiredFields.filter(field => !jsonData[field])

		if (missingFields.length > 0) {
			console.error(`❌ Error: Missing required fields in service account key: ${missingFields.join(', ')}`)
			process.exit(1)
		}

		// Encode to base64
		const base64Encoded = Buffer.from(fileContent).toString('base64')

		console.log('\n✅ Successfully encoded GCP service account key!\n')
		console.log('📋 Add this to your .env.local file:\n')
		console.log('GCP_SERVICE_ACCOUNT_KEY=' + base64Encoded)
		console.log('\n📝 Also add these variables:\n')
		console.log(`GCP_PROJECT_ID=${jsonData.project_id}`)
		console.log('GCP_BUCKET_NAME=your-bucket-name')
		console.log('\n🔐 Generate a CRON_SECRET with:')
		console.log('node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
		console.log('\n')
	} catch (error) {
		console.error(`❌ Error: ${error.message}`)
		process.exit(1)
	}
}

// Main execution
const args = process.argv.slice(2)

if (args.length === 0) {
	console.log('Usage: node scripts/encode-gcp-key.js <path-to-service-account-key.json>')
	console.log('\nExample:')
	console.log('  node scripts/encode-gcp-key.js ./my-service-account.json')
	process.exit(0)
}

const keyFilePath = path.resolve(args[0])
encodeGCPKey(keyFilePath)

