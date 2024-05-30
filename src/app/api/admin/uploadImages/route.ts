import fs from 'fs'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.formData()
	const innerId = data.get('innerId')
	const type = data.get('productType')
	const name = data.get('productName') as unknown as string
	const original: File | null = data.get('original') as unknown as File
	const preview: File | null = data.get('preview') as unknown as File

	console.log(type)
	console.log(name)
	if (!original && !preview) {
		return NextResponse.json({ success: false })
	}

	const bytesOriginal = await original.arrayBuffer()
	const bufferOriginal = Buffer.from(bytesOriginal)

	const bytesPreview = await preview.arrayBuffer()
	const bufferPreview = Buffer.from(bytesPreview)

	const directoryPathGeneral = `upload/products/${type}`
	const directoryPathOriginal = `upload/products/${type}/${name}`
	const directoryPathPreview = `upload/products/${type}/${name}/previews`

	if (!fs.existsSync(directoryPathGeneral)) {
		fs.mkdirSync(directoryPathGeneral)
	}
	if (!fs.existsSync(directoryPathOriginal)) {
		fs.mkdirSync(directoryPathOriginal)
	}
	if (!fs.existsSync(directoryPathPreview)) {
		fs.mkdirSync(directoryPathPreview)
	}

	const pathOriginal = directoryPathOriginal + `/${innerId}.jpg`
	const pathPreviews = directoryPathPreview + `/${innerId}.jpg`

	writeFile(pathOriginal, bufferOriginal)
	writeFile(pathPreviews, bufferPreview)

	const pathToOriginal = '/' + directoryPathOriginal + `/${innerId}.jpg`
	const pathToPReview = '/' + directoryPathPreview + `/${innerId}.jpg`

	const res = {
		originals: [pathToOriginal],
		previews: [pathToPReview],
	}

	return NextResponse.json(res)
}
