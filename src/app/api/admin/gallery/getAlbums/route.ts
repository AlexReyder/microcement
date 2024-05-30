export const dynamic = 'force-dynamic'

import fs from 'fs'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const AllAlbumsJSON = fs.readFileSync('public/data/albums.json', 'utf-8')
	const albums = JSON.parse(AllAlbumsJSON)

	return NextResponse.json(albums)
}
