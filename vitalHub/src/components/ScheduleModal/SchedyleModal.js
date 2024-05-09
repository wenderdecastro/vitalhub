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
import Toast from 'react-native-toast-message';


export const ScheduleModal = ({
	navigation,
	route,
	visible,
	setShowModalSchedule,
	...rest
}) => {
	const [clicked, setClicked] = useState(false);

	const [rotinaClicked, setRotinaClicked] = useState(false);
	const [exameClicked, setExameClicked] = useState(false);
	const [urgenciaClicked, setUrgenciaClicked] = useState(false);
	const [prioridadeSelecionada, setPrioridadeSelecionada] = useState();

	const handleRotinaClick = () => {
		if (!rotinaClicked) {
			setRotinaClicked(true);
			setNivelConsulta({
				id: 'A85FDEF6-E3D2-4BF0-B5EE-88896399BC49',
				tipo: 'Rotina',
			});
			setPrioridadeSelecionada(true);
			setExameClicked(false);
			setUrgenciaClicked(false);
		} else {
			setRotinaClicked(false);
			setNivelConsulta({
				id: '',
				tipo: '',
			});
			setPrioridadeSelecionada(false);
		}
	};

	const handleExameClick = () => {
		if (!exameClicked) {
			setExameClicked(true);
			setNivelConsulta({
				id: 'FA8C170D-CDBC-42B4-92CC-A620B39B47E5',
				tipo: 'Exame',
			});
			setPrioridadeSelecionada(true);
			setRotinaClicked(false);
			setUrgenciaClicked(false);
		} else {
			setExameClicked(false);
			setNivelConsulta({
				id: '',
				tipo: '',
			});
			setPrioridadeSelecionada(false);
		}
	};

	const handleUrgenciaClick = () => {
		if (!urgenciaClicked) {
			setUrgenciaClicked(true);
			setNivelConsulta({
				id: '86571C4B-5522-4474-915A-BBF2661D804C',
				tipo: 'Urgente',
			});
			setPrioridadeSelecionada(true);
			setRotinaClicked(false);
			setExameClicked(false);
		} else {
			setUrgenciaClicked(false);
			setNivelConsulta({
				id: '',
				tipo: '',
			});
			setPrioridadeSelecionada(false);
		}
	};

	const [nivelConsulta, setNivelConsulta] = useState({
		id: '34065EDC-CB48-4045-82FB-949DAE435DC9',
		tipo: 'Rotina',
	});
	const [agendamento, setAgendamento] = useState({});

	async function onPressHandler() {
		console.log(agendamento);
		console.log(agendamento.localizacao);
		if (prioridadeSelecionada) {
			await setShowModalSchedule(false);
			navigation.replace('SelectClinic', {
				agendamento: agendamento,
			});
		} else {
			console.log('Selecione um nivel de prioridade');
			Toast.show({
				type: 'error',
				text1: 'Selecione um nivel de prioridade.',
				text2: 'Erro',
				text1Style: {
					fontSize: 16,
					fontWeight: 600,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
				text2Style: {
					fontSize: 16,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
			});
		}
		if (agendamento && agendamento.localizacao == '') {
			console.log('Digite alguma localização');
			Toast.show({
				type: 'error',
				text1: 'Digite alguma localização.',
				text2: 'Erro',
				text1Style: {
					fontSize: 16,
					fontWeight: 600,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
				text2Style: {
					fontSize: 16,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
			});
		}
	}

	return (
		<>
			<Modal
				{...rest}
				visible={visible}
				transparent={true}
				animationType="fade"
				animationOutTiming={0}
			>
				<ViewModal>
					<Toast/>
					<ContentModal>
					
						<Title>Agendar consulta</Title>

						<TypeAppointment>
							<LabelSchedule>
								Qual o nível da
								consulta
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
								Informe a
								localização
								desejada
							</LabelSchedule>
							<InputTextModificate
								value={
									agendamento
										? agendamento.localizacao
										: null
								}
								onChangeText={(
									txt,
								) =>
									setAgendamento(
										{
											...agendamento,
											prioridadeId:
												nivelConsulta.id,
											prioridadeLabel:
												nivelConsulta.tipo,
											localizacao:
												txt,
										},
									)
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
		</>
	);
};
