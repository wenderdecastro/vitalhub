import { useState } from 'react';
import { SubTitle, Title } from '../Title/Style';
import {
	ContainerCardDoctor,
	ContentDoctor,
	DoctorInfo,
	ImageCardDoctor,
} from './Style';

export const CardDoctor = ({ nome, especialidade, foto, isSelected }) => {

	return (
		<ContainerCardDoctor isSelected={isSelected}>
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
