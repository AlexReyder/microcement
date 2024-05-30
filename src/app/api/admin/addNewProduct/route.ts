export const dynamic = 'force-dynamic'
import fs from 'fs'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const data = await request.formData()
	const res: string | null = data.get('data') as unknown as string
	const dels: string | null = data.get('delete') as unknown as string
	const newProduct = JSON.parse(res)
	const delsProduct = JSON.parse(dels)

	const AllProductsJSON = fs.readFileSync('public/data/products.json', 'utf-8')

	const slug = require('slug')
	newProduct.slug = slug(newProduct.name)

	if (delsProduct.length > 0) {
		newProduct.images.originals.forEach((orig: string[], i: number) => {
			const oldPath = orig[0].substring(1)
			const newPath =
				orig[0].split('/').slice(0, -1).join('/').substring(1) + `/${++i}.jpg`
			if (newPath !== oldPath) {
				fs.renameSync(oldPath, newPath)
				orig[0] = '/' + newPath
			}
		})

		newProduct.images.previews.forEach((prev: string[], i: number) => {
			const oldPath = prev[0].substring(1)
			const newPath =
				prev[0].split('/').slice(0, -1).join('/').substring(1) + `/${++i}.jpg`
			if (newPath !== oldPath) {
				fs.renameSync(oldPath, newPath)
				prev[0] = '/' + newPath
			}
		})
	}
	// }
	// const newImages = [newOrigs, newPrevs]
	// newProduct.images = newImages

	const products = JSON.parse(AllProductsJSON)
	products.push(newProduct)

	let result = JSON.stringify(products)
	fs.writeFileSync('public/data/products.json', result)

	return NextResponse.json('')
}
