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
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(!clicked);
	};

	const [rotinaClicked, setRotinaClicked] = useState(false);
	const [exameClicked, setExameClicked] = useState(false);
	const [urgenciaClicked, setUrgenciaClicked] = useState(false);

	const handleRotinaClick = () => {
		setRotinaClicked(!rotinaClicked);
		setNivelConsulta({
			id: 'A85FDEF6-E3D2-4BF0-B5EE-88896399BC49',
			tipo: 'Rotina',
		});
	};

	const handleExameClick = () => {
		setExameClicked(!exameClicked);
		setNivelConsulta({
			id: 'FA8C170D-CDBC-42B4-92CC-A620B39B47E5',
			tipo: 'Exame',
		});
	};

	const handleUrgenciaClick = () => {
		setUrgenciaClicked(!urgenciaClicked);
		setNivelConsulta({
			id: '86571C4B-5522-4474-915A-BBF2661D804C',
			tipo: 'Urgente',
		});
	};

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
								onPress={
									handleRotinaClick
								}
								clicked={
									rotinaClicked
								}
							>
								<BlueTitle>
									Rotina
								</BlueTitle>
							</SmallButton>
							<SmallButton
								onPress={
									handleExameClick
								}
								clicked={
									exameClicked
								}
							>
								<BlueTitle>
									Exame
								</BlueTitle>
							</SmallButton>
							<SmallButton
								onPress={
									handleUrgenciaClick
								}
								clicked={
									urgenciaClicked
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
