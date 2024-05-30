import { AlbumsI } from '@/admin-scenes/gallery/AddAlbumModal'
import fs from 'fs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.formData()

	const deleted: string = data.get('delete') as unknown as string
	const deletedItems: AlbumsI[] = JSON.parse(deleted)

	const order: string = data.get('order') as unknown as string
	const orderItems: AlbumsI[] = JSON.parse(order)

	if (deletedItems.length > 0) {
		deletedItems.forEach(item => {
			const albumName = item.name

			fs.rmSync(`public/img/gallery/${albumName}`, {
				recursive: true,
				force: true,
			})
		})
	}

	orderItems.forEach((item, i) => {
		item.id = i + 1
	})

	let result = JSON.stringify(orderItems)

	fs.writeFileSync('public/data/albums.json', result)

	return NextResponse.json('')
}
