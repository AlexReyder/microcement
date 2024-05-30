export const dynamic = 'force-dynamic'
import fs from 'fs'
import { NextResponse } from 'next/server'
import { productItemI } from '../saveOrder/route'

export async function POST(request: Request) {
	const data = await request.formData()
	const res: string | null = data.get('data') as unknown as string
	const newProduct: productItemI = JSON.parse(res)

	const AllProductsJSON = fs.readFileSync('public/data/heroes.json', 'utf-8')
	const products: productItemI[] = JSON.parse(AllProductsJSON)

	const index = products.findIndex(arr => arr.id == newProduct.id)
	products[index] = newProduct

	let result = JSON.stringify(products)
	fs.writeFileSync('public/data/heroes.json', result)

	return NextResponse.json('')
}
