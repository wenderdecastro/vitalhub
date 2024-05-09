import { ScrollView } from 'react-native';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { CardDoctor } from '../../components/CardDoctor/CardDoctor';
import { Container } from '../../components/Container/Style';
import { TitleB } from '../../components/Title/Style';
import { CancelAppointment } from '../../components/Links/Style';
import { ScheduleModal } from '../../components/ScheduleModal/SchedyleModal';
import { useState, useEffect } from 'react';
import api from '../../service/Service';
import Toast from 'react-native-toast-message';

export const SelectDoctor = ({ navigation, route }) => {
	const [showModalSchedule, setShowModalSchedule] = useState(false);

	const onPressCancel = () => {
		navigation.navigate('Main');
		setShowModalSchedule(true);
	};

	const [medicosLista, setMedicosLista] = useState([]);
	const [medico, setMedico] = useState(null);

	async function listarMedicos() {
		await api
			.get(
				`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`,
			)
			.then((response) => {
				setMedicosLista(response.data);
			})
			.catch((error) => console.error(error));
	}
	function handleContinue() {
		if (!medico) {
			console.log('Médico não selecionado');
			Toast.show({
				type: 'error',
				text1: 'Selecione um médico.',
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
			return;
		}
		navigation.replace('SelectDate', {
			agendamento: {
				...route.params.agendamento,
				...medico,
			},
		});
	}
	useEffect(() => {
		console.log(route.params.agendamento);
		listarMedicos();
	}, []);

	return (
		<Container>
			<TitleB>Selecionar médico</TitleB>

			<ScrollView>
				{medicosLista.map((medico) => (
					<CardDoctor
						key={medico.id}
						nome={medico.idNavigation.nome}
						especialidade={
							medico.especialidade
								.especialidade1
						}
						foto={medico.idNavigation.foto}
						ButtonFn={() =>
							setMedico({
								medicoClinicaId:
									medico.id,
								medicoLabel:
									medico
										.idNavigation
										.nome,
							})
						}
					/>
				))}
			</ScrollView>

			<Button onPress={() => handleContinue()}>
				<ButtonTitle>CONTINUAR</ButtonTitle>
			</Button>

			<CancelAppointment onPress={() => onPressCancel()}>
				Cancelar
			</CancelAppointment>

			<ScheduleModal
				visible={showModalSchedule}
				setShowModalSchedule={setShowModalSchedule}
			/>
		</Container>
	);
};
