'use client'
import CollectionsIcon from '@mui/icons-material/Collections'
import PriceIcon from '@mui/icons-material/CurrencyRuble'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import HeroIcon from '@mui/icons-material/Slideshow'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { Box, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { ReactNode, useState } from 'react'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { colors } from '../theme'

import Link from 'next/link'
import './sidebar.css'

interface ItemPropsI {
	ftg: any
	title: string
	to: string
	icon: ReactNode
	selected: string
	setSelected: (title: any) => void
}

const Item = ({ title, to, icon, selected, ftg, setSelected }: ItemPropsI) => {
	return (
		<MenuItem
			active={selected === title}
			style={{ color: colors.grey[100] }}
			onClick={() => {
				setSelected(title)
				ftg()
			}}
			icon={icon}
			component={<Link href={to} />}
		>
			<Typography variant='h5'>{title}</Typography>
		</MenuItem>
	)
}

const SidebarEl = () => {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [selected, setSelected] = useState('Продукция')
	const [broken, setBroken] = useState(
		window.matchMedia('(max-width: 900px)').matches
	)
	const [toggled, setToggled] = useState(false)

	const handleCloseToggle = () => {
		setToggled(false)
	}

	const handleLogOut = () => {
		axios('/auth/logout').then(res => {
			window.location.replace('https://simter-st.ru/')
		})
	}

	return (
		<Box
			className={`sidebar__wrapper ${
				isCollapsed ? 'sidebar--collapsed' : null
			}`}
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary[400]}!important`,
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important',
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important',
				},
				'& .pro-inner-item:hover': {
					color: '#868dfb !important',
				},
				'& .pro-menu-item.active': {
					color: '#6870fa !important',
				},
			}}
		>
			<button className='toggle-button' onClick={() => setToggled(true)}>
				Меню
			</button>
			<Sidebar
				collapsed={isCollapsed}
				width='300px'
				className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : null}`}
				customBreakPoint='800px'
				onBreakPoint={setBroken}
				toggled={toggled}
				onBackdropClick={() => setToggled(false)}
			>
				<Menu className='sidebar--exit'>
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
						className={`${isCollapsed ? 'sidebar__icon' : ''}`}
					>
						{!isCollapsed && (
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								ml='15px'
							>
								<Typography variant='h3' color={colors.grey[100]}>
									Тротуарка59
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb='25px' className='sidebar__admin-title'>
							<Box textAlign='center'>
								<Typography
									variant='h3'
									color={colors.grey[100]}
									fontWeight='bold'
									sx={{ m: '10px 0 0 0' }}
								>
									Администратор
								</Typography>
							</Box>
						</Box>
					)}

					<Box
						paddingLeft={isCollapsed ? undefined : '10%'}
						className='sidebar__items'
					>
						<Item
							title='Продукция'
							to='/admin/add'
							icon={<DashboardCustomizeIcon />}
							selected={selected}
							setSelected={setSelected}
							ftg={handleCloseToggle}
						/>

						<Item
							title='Галерея'
							to='/admin/gallery'
							icon={<CollectionsIcon />}
							selected={selected}
							setSelected={setSelected}
							ftg={handleCloseToggle}
						/>
						<Item
							title='Главный экран'
							to='/admin/hero'
							icon={<HeroIcon />}
							selected={selected}
							setSelected={setSelected}
							ftg={handleCloseToggle}
						/>

						<Item
							title='Прайс-лист'
							to='/admin/price'
							icon={<PriceIcon />}
							selected={selected}
							setSelected={setSelected}
							ftg={handleCloseToggle}
						/>

						{/* <Item
								title='Заявки'
								to='/admin/contacts'
								icon={<GroupIcon />}
								selected={selected}
								setSelected={setSelected}
							/> */}

						<Item
							title='Профиль'
							to='/admin/profile'
							icon={<VpnKeyIcon />}
							selected={selected}
							setSelected={setSelected}
							ftg={handleCloseToggle}
						/>

						<Item
							title='Выйти из панели'
							to='/'
							icon={<LogoutIcon />}
							selected={selected}
							setSelected={setSelected}
							ftg={handleCloseToggle}
						/>
					</Box>
				</Menu>
			</Sidebar>
		</Box>
	)
}
export default SidebarEl
