import { Modal } from 'react-native';
import { Button } from '../Button/Style';
import { ButtonTitle } from '../ButtonTitle/Style';
import { ContentModal, ViewModal } from '../CancelModal/style';
import { LinkModal } from '../Links/Style';
import { Title } from '../Title/Style';
import {
	BlueTitle,
	ContainerButtonsSchedule,
	LabelSchedule,
	SmallButton,
	TypeAppointment,
	TypeButton,
} from './Style';
import { useState } from 'react';
import { InputTextModificate } from '../BoxInput/style';

export const ScheduleModal = ({
	navigation,
	route,
	visible,
	setShowModalSchedule,
	...rest
}) => {
	const [nivelConsulta, setNivelConsulta] = useState({
		id: '34065EDC-CB48-4045-82FB-949DAE435DC9',
		tipo: 'Rotina',
	});
	const [agendamento, setAgendamento] = useState({});

	async function onPressHandler() {
		console.log(agendamento);
		console.log(agendamento.localizacao);
		await setShowModalSchedule(false);
		navigation.replace('SelectClinic', {
			agendamento: agendamento,
		});
	}

	return (
		<Modal
			{...rest}
			visible={visible}
			transparent={true}
			animationType="fade"
			animationOutTiming={0}
		>
			<ViewModal>
				<ContentModal>
					<Title>Agendar consulta</Title>

					<TypeAppointment>
						<LabelSchedule>
							Qual o nível da consulta
						</LabelSchedule>

						<ContainerButtonsSchedule>
							<SmallButton
								onPress={() =>
									setNivelConsulta(
										{
											id: '34065EDC-CB48-4045-82FB-949DAE435DC9',
											tipo: 'Rotina',
										},
									)
								}
							>
								<BlueTitle>
									Rotina
								</BlueTitle>
							</SmallButton>
							<SmallButton
								onPress={() =>
									setNivelConsulta(
										{
											id: '8BB82967-1CA9-4D71-A37C-715E473D00AC',
											tipo: 'Exame',
										},
									)
								}
							>
								<BlueTitle>
									Exame
								</BlueTitle>
							</SmallButton>
							<SmallButton
								onPress={() =>
									setNivelConsulta(
										{
											id: 'ADD341BE-8E85-40F1-BCA3-71C72A1585D3',
											tipo: 'Urgente',
										},
									)
								}
							>
								<BlueTitle>
									Urgência
								</BlueTitle>
							</SmallButton>
						</ContainerButtonsSchedule>

						<LabelSchedule>
							Informe a localização
							desejada
						</LabelSchedule>
						<InputTextModificate
							value={
								agendamento
									? agendamento.localizacao
									: null
							}
							onChangeText={(txt) =>
								setAgendamento({
									...agendamento,
									prioridadeId:
										nivelConsulta.id,
									prioridadeLabel:
										nivelConsulta.tipo,
									localizacao:
										txt,
								})
							}
						></InputTextModificate>
					</TypeAppointment>

					<Button
						onPress={() => {
							onPressHandler();
						}}
					>
						<ButtonTitle>
							CONTINUAR
						</ButtonTitle>
					</Button>

					<LinkModal
						onPress={() =>
							setShowModalSchedule(
								false,
							)
						}
					>
						Cancelar
					</LinkModal>
				</ContentModal>
			</ViewModal>
		</Modal>
	);
};
