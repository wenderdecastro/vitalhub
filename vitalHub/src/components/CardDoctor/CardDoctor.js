import { useState } from 'react';
import { SubTitle, Title } from '../Title/Style';
import {
	ContainerCardDoctor,
	ContentDoctor,
	DoctorInfo,
	ImageCardDoctor,
} from './Style';

export const CardDoctor = ({ nome, especialidade, foto, ButtonFn }) => {
	// const [clicked, setClicked] = useState(false);

	// const handleClick = () => {
	// 	setClicked(!clicked);
	// };

	return (
		<ContainerCardDoctor
			onPress={ButtonFn}
			// clicked={clicked}
		>
			<ContentDoctor>
				<ImageCardDoctor source={foto} />

				<DoctorInfo>
					<Title>{nome}</Title>
					<SubTitle>{especialidade}</SubTitle>
				</DoctorInfo>
			</ContentDoctor>
		</ContainerCardDoctor>
	);
};
