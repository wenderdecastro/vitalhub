import { ActivityIndicator, Modal } from 'react-native';
import { ContentModal, ViewModal } from '../CancelModal/style';
import { SubTitle, Title } from '../Title/Style';
import { LabelSchedule } from '../ScheduleModal/Style';
import { BoxSchedule, CancelSchedule, SubTitleSchedule } from './Style';
import { Button } from '../Button/Style';
import { ButtonTitle } from '../ButtonTitle/Style';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { userDecodeToken } from '../../utils/Auth';
import api from '../../service/Service';

export const SummaryScheduleModal = ({
	navigation,
	visible,
	agendamento,
	setShowModalSummary,
	route,
	...rest
}) => {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		profileLoad();
	}, []);

	// useEffect(() => {
	// 	if (agendamento) {
	// 		setFormattedDate(
	// 			,
	// 		);
	// 		console.log(agendamento);
	// 		setAgendamentoFinal({ ...agendamento });
	// 	}
	// }, [agendamento]);
	async function profileLoad() {
		const token = await userDecodeToken();

		if (token) {
			setProfile(token);
		}
	}

	async function agendarConsulta() {
		await api
			.post('/Consultas/Cadastrar', {
				...agendamento,
				pacienteId: profile.jti,
				situacaoId: 'B15F2BA2-5856-4B00-98A0-266CE5CF9F87',
			})
			.then(async (response) => {
				await setShowModalSummary(false);
				navigation.replace('Main');
			})
			.catch((error) => {
				console.log(error);
				console.log(error.config);
				console.log(error.message);
			});
	}

	const onPressHandler = () => {
		navigation.navigate('SelectDate');
		setShowModalSummary(false);
	};

	return (
		<Modal
			{...rest}
			visible={visible}
			transparent={true}
			animationType="fade"
		>
			<ViewModal>
				{agendamento != null ? (
					<ContentModal>
						<Title>Agendar Consulta</Title>
						<SubTitleSchedule>
							Consulte os dados
							selecionados para a sua
							consulta
						</SubTitleSchedule>

						<BoxSchedule>
							<LabelSchedule>
								Data da consulta
							</LabelSchedule>
							<SubTitle>
								{moment(
									agendamento.dataConsulta,
									'YYYY-MM-DD HH:mm',
								).format(
									'DD/MM/YYYY HH:mm',
								)}
							</SubTitle>
						</BoxSchedule>
						<BoxSchedule>
							<LabelSchedule>
								Médico(a) da
								consulta
							</LabelSchedule>
							<SubTitle>
								{
									agendamento.medicoLabel
								}
							</SubTitle>
						</BoxSchedule>
						<BoxSchedule>
							<LabelSchedule>
								Clínica da
								consulta
							</LabelSchedule>
							<SubTitle>
								{
									agendamento.clinicaLabel
								}
							</SubTitle>
						</BoxSchedule>
						<BoxSchedule>
							<LabelSchedule>
								Local da
								consulta
							</LabelSchedule>
							<SubTitle>
								{
									agendamento.localizacao
								}
							</SubTitle>
						</BoxSchedule>
						<BoxSchedule>
							<LabelSchedule>
								Tipo da consulta
							</LabelSchedule>
							<SubTitle>
								{
									agendamento.prioridadeLabel
								}
							</SubTitle>
						</BoxSchedule>

						<Button
							onPress={() =>
								agendarConsulta()
							}
						>
							<ButtonTitle>
								CONFIRMAR
							</ButtonTitle>
						</Button>

						<CancelSchedule
							onPress={() =>
								onPressHandler()
							}
						>
							Cancelar
						</CancelSchedule>
					</ContentModal>
				) : (
					<ActivityIndicator />
				)}
			</ViewModal>
		</Modal>
	);
};
