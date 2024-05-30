'use client'
import isAuth from '@/admin-scenes/isAuth '
import PriceListAdmin from '@/admin-scenes/price-list/PriceListAdmin'
const AdminPrice = () => {
	return <PriceListAdmin />
}
export default isAuth(AdminPrice)
