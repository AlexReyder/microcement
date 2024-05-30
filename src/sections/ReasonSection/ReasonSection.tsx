import { Container } from '@/shared/ui/Layout/Container/Container'
import { Section } from '@/shared/ui/Layout/Section/Section'
import cls from './ReasonSection.module.scss'

const ReasonSection = () => {
	return (
		<Section id='reasons'>
			<Container>
				<div className={cls.Wrapper}></div>
			</Container>
		</Section>
	)
}
export default ReasonSection

const Reason = ({ reason }: any) => {
	return (
		<div key={reason.id} className={cls.Reason}>
			<img src={reason.image} alt={reason.name} className={cls.ReasonImage} />
		</div>
	)
}

const reasonsData = [
	{
		id: 1,
		name: '',
		image: 'img/advantages/manufacturer.jpg',
	},
	{
		id: 2,
		name: '',
		image: 'img/advantages/second.jpg',
	},
	{ id: 3, name: '', image: 'img/advantages/third.jpg' },
]
