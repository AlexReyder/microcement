import fs from 'fs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.formData()
	const res: string | null = data.get('data') as unknown as string
	const newAlbum = JSON.parse(res)

	const newImages = newAlbum.images.map((orig: string, i: number) => {
		const oldPath = orig.substring(1)
		const newPath =
			orig.split('/').slice(0, -1).join('/').substring(1) + `/${++i}.jpg`
		if (newPath !== oldPath) {
			fs.renameSync(oldPath, newPath)
			const path = '/' + newPath
			return path
		}
		return orig
	})

	const AllAlbumsJSON = fs.readFileSync('public/data/albums.json', 'utf-8')
	const albums = JSON.parse(AllAlbumsJSON)
	newAlbum.images = newImages

	albums.push(newAlbum)

	let result = JSON.stringify(albums)
	fs.writeFileSync('public/data/albums.json', result)

	return NextResponse.json('')
}
