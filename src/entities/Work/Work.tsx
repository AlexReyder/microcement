import cls from './Work.module.scss'
interface WorkProps {
	bg: string
	heading: string
}

const Work = ({ bg, heading }: WorkProps) => {
	return (
		<div className={cls.Container}>
			<img
				src={bg}
				alt={heading}
				className={cls.Image}
				alt='Примеры наших работ'
			/>

			<div className={cls.Overlay}></div>

			<div className={cls.Info}>
				<h3 className={cls.Heading}>{heading}</h3>
			</div>
		</div>
	)
}
export default Work
