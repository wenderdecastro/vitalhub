import { ScrollView } from 'react-native';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { CardClinic } from '../../components/CardClinic/CardClinic';
import { Container } from '../../components/Container/Style';
import { CancelAppointment, LinkModal } from '../../components/Links/Style';
import { TitleB } from '../../components/Title/Style';
import { useEffect, useState } from 'react';
import { ScheduleModal } from '../../components/ScheduleModal/SchedyleModal';
import api from '../../service/Service';

export const SelectClinic = ({ navigation, route }) => {
	const [showModalSchedule, setShowModalSchedule] = useState(false);
	const [clinicaLista, setClinicaLista] = useState([]);
	const [clinica, setClinica] = useState({});

	useEffect(() => {
		listarClinicas();
	}, []);

	const onPressCancel = () => {
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

	return (
		<Container>
			<TitleB>Selecionar clínica</TitleB>

			<ScrollView>
				{clinicaLista.map((clinica) => (
					<CardClinic
						key={clinica.id}
						nome={clinica.nomeFantasia}
						endereco={
							clinica.endereco
								.logradouro
						}
						OnPress={() =>
							setClinica({
								clinicaId: clinica.id,
								clinicaLabel:
									clinica.nomeFantasia,
							})
						}
					/>
				))}
			</ScrollView>

			<Button
				onPress={() => {
					console.log({
						...route.params.agendamento,
						clinica: clinica,
					});

					navigation.replace('SelectDoctor', {
						agendamento: {
							...route.params
								.agendamento,
							...clinica,
						},
					});
				}}
			>
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
