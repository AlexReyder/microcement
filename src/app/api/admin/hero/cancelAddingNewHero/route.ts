import fs from 'fs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.formData()

	const path: string = data.get('path') as unknown as string
	fs.unlink(path, err => {
		if (err) {
			console.error(err)
		}
	})

	return NextResponse.json('')
}
