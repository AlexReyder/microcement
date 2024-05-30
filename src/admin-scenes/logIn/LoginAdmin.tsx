'use client'
import {
	Alert,
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function LoginAdmin() {
	const [authError, setAuthError] = useState(false)
	const [resetPassAlert, setResetPassAlert] = useState(false)
	const [resetPassFailAlert, setResetPassFailAlert] = useState(false)

	const router = useRouter()
	const handleSubmit = event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		axios
			.post('/api/auth/login', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(res => {
				if (res.data) {
					setCookie('isAuthenticated', true, { maxAge: 60 * 6 * 24 })
					setAuthError(false)
					window.location.href = '/admin/add'
				} else {
					// localStorage.setItem('isAuthenticated', 'false')
					setAuthError(true)
				}
			})
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component='h1' variant='h1'>
					Авторизация
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Логин'
						name='username'
						error={authError}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Пароль'
						type='password'
						id='password'
						autoComplete='current-password'
						error={authError}
					/>
					<FormControlLabel
						control={
							<Checkbox
								value='remember'
								color='primary'
								id='remember'
								name='remember'
							/>
						}
						label='Запомнить меня'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2, backgroundColor: 'var(--color-primary)' }}
					>
						Войти
					</Button>
					<Grid container>
						<Grid item xs></Grid>
					</Grid>
				</Box>
			</Box>
			{resetPassAlert ? (
				<Alert
					variant='filled'
					severity='success'
					className='alert'
					onClick={() => setResetPassAlert(false)}
				>
					Новый пароль отправлен на почту!
				</Alert>
			) : null}
			{resetPassFailAlert ? (
				<Alert
					variant='filled'
					severity='error'
					className='alert'
					onClick={() => setResetPassFailAlert(false)}
				>
					Произошла ошибка
				</Alert>
			) : null}
		</Container>
	)
}
