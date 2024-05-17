import { ActivityIndicator, ScrollView } from 'react-native';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { CardClinic } from '../../components/CardClinic/CardClinic';
import { Container } from '../../components/Container/Style';
import { CancelAppointment, LinkModal } from '../../components/Links/Style';
import { TitleB } from '../../components/Title/Style';
import { useEffect, useState } from 'react';
import { ScheduleModal } from '../../components/ScheduleModal/SchedyleModal';
import api from '../../service/Service';
import Toast from 'react-native-toast-message';

export const SelectClinic = ({ navigation, route }) => {
	const [showModalSchedule, setShowModalSchedule] = useState(false);
	const [clinicaLista, setClinicaLista] = useState(null);
	const [clinica, setClinica] = useState({});
	const [clicked, setClicked] = useState(false)

	const handleClick = () => {
		setClicked(!clicked); 
	};

	useEffect(() => {
		listarClinicas();
	}, []);

	useEffect(() => {
		if (clinicaLista && clinicaLista.length == 0) {
			Toast.show({
				type: 'error',
				text1: 'Nenhuma clinica encontrada para o endereço fornecido.',
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
	}, [clinicaLista]);

	const onPressCancel = () => {
		// navigation.navigate('Main');
		navigation.navigate('Main');
		setShowModalSchedule(true);
	};
	async function listarClinicas() {
		try {
			const response = await api.get(
				`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`,
			);
			console.log(response);
			setClinicaLista(response.data);
		} catch (error) {
			console.error(error);
			console.log(error.message);
			console.log(error.config);
		}
	}

	function handleContinue() {
		if (!clinica) {
			console.log('Clínica não selecionada');
			Toast.show({
				type: 'error',
				text1: 'Selecione uma clínica.',
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
		{
			clicked ?
				navigation.replace('SelectDoctor', {
					agendamento: {
						...route.params.agendamento,
						...clinica,
					},
				})
				:
				Toast.show({
					type: 'error',
					text1: 'Selecione uma clínica.',
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
		<Container>
			<TitleB>Selecionar clínica</TitleB>
			{clinicaLista ? (
				<ScrollView>
					{clinicaLista.map((clinica) => (
						<CardClinic
							key={clinica.id}
							nome={
								clinica.nomeFantasia
							}
							endereco={
								clinica.endereco
									.logradouro
							}
							OnPress={() => {
								setClinica({
									clinicaId: clinica.id,
									clinicaLabel:
										clinica.nomeFantasia,
								});
								handleClick()
							}
							}
							clicked={clicked}
						/>
					))}
				</ScrollView>
			) : (
				<ActivityIndicator />
			)}

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
