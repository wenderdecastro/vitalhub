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
	role,
	dados,
}) => {
	return (
		<ContainerCard onPress={onPressLocal}>
			<ImageCard
				source={
					role === 'Paciente'
						? dados.medicoClinica.medico
								.idNavigation
								.foto
						: dados.paciente.idNavigation
								.foto
				}
			/>

			<ContentCard>
				<DateProfileCard>
					<ProfileName>
						{role === 'Paciente'
							? dados.medicoClinica
									.medico
									.idNavigation
									.nome
							: dados.paciente
									.idNavigation
									.nome}
					</ProfileName>

					<ProfileData>
						<TextAge>
							{role === 'Paciente'
								? moment(
										dados
											.paciente
											.dataNascimento,
								  )
										.fromNow(
											true,
										)
										.charAt(
											0,
										) +
								  ' Anos'
								: dados
										.medicoClinica
										.medico
										.crm}
						</TextAge>
						<FontAwesome
							name="circle"
							size={6}
							color="#D9D9D9"
						/>
						<TextBold>
							{dados.prioridade
								.prioridade ===
							1
								? 'Urgência'
								: prioridade ===
								  2
								? 'Consulta'
								: 'Rotina'}
						</TextBold>
					</ProfileData>
				</DateProfileCard>

				<ViewRow>
					<ClockCard
						situacao={
							dados.situacao.situacao
						}
					>
						<AntDesign
							name="clockcircle"
							size={14}
							color={
								situacao ==
								'Pendente'
									? '#49B3BA'
									: '4E4B59'
							}
						/>
						<TextBold
							situacao={
								situacao
									.situacao
									.situacao
							}
						>
							{dados.dataConsulta}
						</TextBold>
					</ClockCard>
					{situacao.situacao.situacao ==
					'Cancelada' ? (
						<></>
					) : situacao.situacao.situacao ==
					  'Pendente' ? (
						<ButtonCard
							onPress={onPressCancel}
						>
							<ButtonText
								situacao={
									situacao
										.situacao
										.situacao
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
										.situacao
										.situacao
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
