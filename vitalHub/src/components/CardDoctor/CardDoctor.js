import { useState } from 'react';
import { SubTitle, Title } from '../Title/Style';
import {
	ContainerCardDoctor,
	ContentDoctor,
	DoctorInfo,
	ImageCardDoctor,
} from './Style';

export const CardDoctor = ({ nome, especialidade, foto, ButtonFn }) => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(!clicked);
	};

	const handlePress = () => {
		handleClick();
		ButtonFn();
	};

	return (
		<ContainerCardDoctor onPress={handlePress} clicked={clicked}>
			<ContentDoctor>
				<ImageCardDoctor source={{ uri: foto }} />

				<DoctorInfo>
					<Title>{nome}</Title>
					<SubTitle>{especialidade}</SubTitle>
				</DoctorInfo>
			</ContentDoctor>
		</ContainerCardDoctor>
	);
};
