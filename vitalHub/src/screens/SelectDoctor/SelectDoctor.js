import { ScrollView } from 'react-native';
import { Button, ButtonSelect } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { CardDoctor } from '../../components/CardDoctor/CardDoctor';
import { Container } from '../../components/Container/Style';
import { TitleB } from '../../components/Title/Style';
import { CancelAppointment } from '../../components/Links/Style';
import { ScheduleModal } from '../../components/ScheduleModal/SchedyleModal';
import { useState, useEffect } from 'react';
import api from '../../service/Service';
import Toast from 'react-native-toast-message';
import { ListComponent } from '../../components/List/List';

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
		} else {

			navigation.replace('SelectDate', {
				agendamento: {
					...route.params.agendamento,
					...medico,
				},
			})

			// Toast.show({
			// 	type: 'error',
			// 	text1: 'Selecione um médico.',
			// 	text2: 'Erro',
			// 	text1Style: {
			// 		fontSize: 16,
			// 		fontWeight: 600,
			// 		fontFamily: 'MontserratAlternates_600SemiBold',
			// 	},
			// 	text2Style: {
			// 		fontSize: 16,
			// 		fontFamily: 'MontserratAlternates_600SemiBold',
			// 	},
			// });
		}

	}
	useEffect(() => {
		console.log(route.params);
		listarMedicos();
	}, []);

	return (
		<Container>
			<TitleB>Selecionar médico</TitleB>

			<ScrollView>
				{<ListComponent
					data={medicosLista}
					renderItem={({ item }) => (
						<ButtonSelect onPress={() => {
							setMedico({
								medicoClinicaId:
									item.id,
								medicoLabel:
									item
										.idNavigation
										.nome,
							});
						}}
						>
							<CardDoctor
								key={item.id}
								nome={item.idNavigation.nome}
								especialidade={
									item.especialidade
										.especialidade1
								}
								foto={item.idNavigation.foto}
								isSelected={medico ? item.id == medico.medicoClinicaId : false}
							/>
						</ButtonSelect>
					)}
				/>}
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
