import fs from 'fs'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.formData()
	const innerId = data.get('innerId')
	const name = data.get('albumName') as unknown as string
	const original: File | null = data.get('original') as unknown as File

	if (!original) {
		return NextResponse.json({ success: false })
	}

	const bytesOriginal = await original.arrayBuffer()
	const bufferOriginal = Buffer.from(bytesOriginal)

	const directoryPath = `upload/gallery/${name}`

	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(directoryPath)
	}

	const pathOriginal = directoryPath + `/${innerId}.jpg`

	writeFile(pathOriginal, bufferOriginal)
	const path = '/' + pathOriginal

	const res = [path]

	return NextResponse.json(res)
}
