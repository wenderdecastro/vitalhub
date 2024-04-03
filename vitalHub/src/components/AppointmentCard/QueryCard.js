import { useEffect, useState } from 'react';
import { Elipse } from '../UserPicture/Style';
import {
	ButtonCard,
	ButtonText,
	ClockCard,
	ContainerCard,
	ContentCard,
	DateProfileCard,
	ImageCard,
	ProfileData,
	ProfileName,
	TextAge,
	TextBold,
	ViewRow,
} from './Style';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

export const AppointmentCard = ({
	situacao = 'Pendente',
	onPressAppointment,
	onPressCancel,
	onPressLocal,
	reason,
	name,
	hour,
	imagem,
	age,
	DadosConsulta,
}) => {
	return (
		<ContainerCard onPress={onPressLocal}>
			<ImageCard source={imagem} />

			<ContentCard>
				<DateProfileCard>
					<ProfileName>{name}</ProfileName>

					<ProfileData>
						<TextAge>
							{moment(age)
								.fromNow(true)
								.charAt(0)}{' '}
							anos
						</TextAge>
						<FontAwesome
							name="circle"
							size={6}
							color="#D9D9D9"
						/>
						<TextBold>{reason}</TextBold>
					</ProfileData>
				</DateProfileCard>

				<ViewRow>
					<ClockCard situacao={situacao}>
						<AntDesign
							name="clockcircle"
							size={14}
							color={
								situacao ==
								'pendente'
									? '#49B3BA'
									: '4E4B59'
							}
						/>
						<TextBold situacao={situacao}>
							{hour}
						</TextBold>
					</ClockCard>
					{situacao == 'cancelada' ? (
						<></>
					) : situacao == 'pendente' ? (
						<ButtonCard
							onPress={onPressCancel}
						>
							<ButtonText
								situacao={
									situacao
								}
							>
								Cancelar
							</ButtonText>
						</ButtonCard>
					) : (
						<ButtonCard
							onPress={
								onPressAppointment
							}
						>
							<ButtonText
								situacao={
									situacao
								}
							>
								Ver Prontuario
							</ButtonText>
						</ButtonCard>
					)}
				</ViewRow>
			</ContentCard>
		</ContainerCard>
	);
};
