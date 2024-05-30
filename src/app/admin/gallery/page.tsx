'use client'
import AdminAlbums from '@/admin-scenes/gallery/AdminAlbums'
import isAuth from '@/admin-scenes/isAuth '

const GalleryAdnun = () => {
	return <AdminAlbums />
}
export default isAuth(GalleryAdnun)
