export const dynamic = 'force-dynamic'
import fs from 'fs'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const AllProductsJSON = fs.readFileSync('public/data/heroes.json', 'utf-8')
	const products = JSON.parse(AllProductsJSON)

	return NextResponse.json(products)
}
