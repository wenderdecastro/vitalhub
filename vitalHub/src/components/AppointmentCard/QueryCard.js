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
import api from '../../service/Service';
import { userDecodeToken } from '../../utils/Auth';

export const AppointmentCard = ({
	situacao = 'Pendente',
	onPressAppointment,
	onPressCancel,
	onPressLocal,
	reason,
	name,
	hour,
	age,
	profile,
}) => {
	const [photo, setPhoto] = useState()

	async function profileLoad() {
		const token = await userDecodeToken();

		if (photo == null) {
			await GetUser(token.jti)
		}
	}

	useEffect(() => {
		profileLoad();
	}, []);

	async function GetUser(id) {
		try {
			const response = await api.get(`/Usuario/BuscarPorId?id=${id}`)
			setPhoto(response.data.foto)
		} catch (error) {
			console.log(error + 'erro buscar usuario');
		}
	}


	return (
		<ContainerCard onPress={onPressLocal}>
			<ImageCard source={{uri: photo}} />

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
								'Pendente'
									? '#49B3BA'
									: '#4E4B59'
							}
						/>
						<TextBold situacao={situacao}>
							{hour}
						</TextBold>
					</ClockCard>
					{situacao == 'Cancelada' ? (
						<></>
					) : situacao == 'Pendente' ? (
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
								{profile ==
								'Patient'
									? 'Ver local da consulta'
									: 'Ver Prontuário'}
							</ButtonText>
						</ButtonCard>
					)}
				</ViewRow>
			</ContentCard>
		</ContainerCard>
	);
};
