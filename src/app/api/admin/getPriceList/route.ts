export const dynamic = 'force-dynamic'
import fs from 'fs'
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET(request: Request) {
	const AllProductsJSON = fs.readFileSync('public/data/products.json', 'utf-8')
	const products = JSON.parse(AllProductsJSON)

	let htmlProducts1 = ''
	let htmlProducts2 = ''

	for (let i = 0; i < products.length; i++) {
		let product = products[i]
		if (i < 14) {
			htmlProducts1 += `
			<div class="product">
			<img src="${process.env.domainUrl}/${product.images.originals[0]}" alt="" class="product__img" />
			<p class="product__price">
				<span class="number">${product.price}</span>
				руб/кв.м
			</p>
			<div class="product__info">
				<p class="product__name">"${product.name}"</p>
				<p class="product__size">${product.size} мм</p>
				<p class="product__pallet">${product.pallet} шт/кв.м</p>
			</div>
		</div>
			`
		}
		if (i >= 14) {
			htmlProducts2 += `
			<div class="product">
			<img src="${process.env.domainUrl}/${
				product.images.originals[0]
			}" alt="" class="product__img" />
			<p class="product__price">
				<span class="number">${product.price}</span>
				руб/кв.м
			</p>
			<div class="product__info">
				<p class="product__name ${product.name.length > 13 ? 'small' : ''}">"${
				product.name
			}"</p>
				<p class="product__size">${product.size} мм</p>
				<p class="product__pallet">${product.pallet} шт/кв.м</p>
			</div>
		</div>
			`
		}
	}

	console.log(htmlProducts1)

	const html = `
	<html>
	<body>
		<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap');

			*,
			*::after,
			*::before {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			html {
				font-size: 62.5%;
				box-sizing: border-box;
				scroll-behavior: smooth;

				@media (max-width: 75em) {
					font-size: 56.25%;
				}

				@media (max-width: 56.25em) {
					font-size: 50%;
				}

				@media (min-width: 112.5em) {
					font-size: 75%;
				}
			}

			body {
				font-family: 'Montserrat';
				font-size: 16px;
				line-height: 1.6;
				font-weight: 400;
				background-color: #fff;
			}


			.main {
				display: flex;
				align-items: flex-start;
				gap: 20px;
				/* padding: 20px; */
				width: 100vw;
				height: 100vh;
				overflow: hidden;
			}

			.container {
				border: 1px solid #222;
				width: 50vw;
				height: 100vh;
				background-color: #fbf9a6;
				padding: 10px 40px;
			}
			.heading {
				font-size: 48px;
				font-weight: 900;
				line-height: 1.05;
				text-transform: uppercase;
				color: #cc0c03;
				text-align: center;
			}
			h3 {
				font-size: 28px;
				font-weight: bold;
				color: #0d0053;
				text-align: center;
				margin-bottom: 10px;
			}

			.header {
				background-color: #f4f073;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 40px;
				list-style: none;
				padding: 0 0 10px 0;
				margin-bottom: 20px;
			}

			.header__item {
				font-size: 23px;
				font-weight: 900;
				color: #cc0c03;
			}

			.product__wrapper {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 15px;
				padding-bottom: 35px;
			}
			.product {
				position: relative;
				background-color: #f4f073;
				display: flex;
				align-items: center;
				justify-content: space-around;
				gap: 10px;
				width: 420px;
				height: 85px;
				box-shadow: 7px 5px 0px 0px rgba(13, 0, 83, 0.75);
			}
			.product__img {
				width: auto;
				height: 95%;
				object-fit: cover;
				aspect-ratio: 4/3;
				border-radius: 12px;
			}
			.product__name {
				font-size: 20px;
				color: #0d0053;
				line-height: 1;
				font-weight: 900;
				margin-bottom: 5px;
				text-transform: uppercase;
			}
			.product__size {
				margin-bottom: 5px;
			}
			.product__pallet,
			.product__size {
				font-size: 16px;
				font-weight: 400;
				line-height: 1;
			}
			.product__price {
				font-size: 10px;
				font-weight: 800;
				color: #cc0c03;
				text-align: center;
				/* position: absolute;
	top: 0;
	left: 0; */
			}
			.number {
				font-size: 28px;
				line-height: 1;
				display: block;
			}
			.small {
				font-size:15px;
			}

			.fixes {
				font-size: 14px;
				font-weight: 600;
				line-height: 1.2;
				color: #cc0c03;
				text-align: left;
			}
			.quarantee {
				margin-top: 10px;
				font-size: 20px;
				line-height: 1;
				font-weight: bold;
				color: #0d0053;
				text-align: left;
			}
		</style>
		<div class="main">
			<div class="container">
				<div>
					<h2 class="heading">Тротуарная плитка</h2>
					<h3>от производителя, вибролитьевая</h3>
					<ul class="header">
						<li class="header__item">slava1700@yandex.ru</li>
						<li class="header__item">www.тротуарка59.рф</li>
						<li class="header__item">+7 (965) 558-88-82</li>
					</ul>
				</div>
				<div class="product__wrapper">
				${htmlProducts1}
				</div>
				<div>
					<p class="fixes">
						<strong>Примечания:</strong>
						<br />
						- В прайс-листе указаны цены на продукцию серого цвета. Цветное
						исполнение +200 руб./кв.м <br />
						- Допускается незначительно колебание оттенков цвета <br />
						- На поверхности изделий допускается проявление высолов. <br />
						- При большом объеме предусмотрена система скидок - Доставка.
						Залоговая стоимость транспортного поддона 70 руб. <br />
						- Укладка.
					</p>
					<p class="quarantee">
						Индивидуальный подход к каждому клиенту! Гарантированная система
						скидок.
					</p>
				</div>
			</div>
			<div class="container">
				<div>
					<h2 class="heading">Тротуарная плитка</h2>
					<h3>от производителя, вибролитьевая</h3>
					<ul class="header">
						<li class="header__item">slava1700@yandex.ru</li>
						<li class="header__item">www.тротуарка59.рф</li>
						<li class="header__item">+7 (965) 558-88-82</li>
					</ul>
				</div>
				<div class="product__wrapper">
					${htmlProducts2}
				</div>
				<div>
					<p class="quarantee">
						Индивидуальный подход к каждому клиенту! Гарантированная система
						скидок.
					</p>
				</div>
			</div>
		</div>
	</body>
</html>
`

	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	})
	const page = await browser.newPage()
	// await page.goto('http://qr.wedraft.ru:3000/catalog', {
	// 	waitUntil: 'domcontentloaded',
	// })
	await page.setContent(html)
	const take = await page.$('.product')
	// await take.screenshot({
	// 	path: 'public/pricelist/price.png',
	// 	omitBackground: true,
	// })
	// await page.goto(`file://public/pricelist.html`)
	await page.setViewport({ width: 1920, height: 39 * products.length })

	await page.screenshot({ path: 'upload/pricelist/price.png' })

	await browser.close()
	return NextResponse.json(true)
}
