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

const Medicos = [
	{
		id: 1,
		nome: 'DrClaudio',
		especialidade: 'Clinico Geral',
		foto: require('../../assets/medico1.jpg'),
	},
	{
		id: 2,
		nome: 'DrCesar',
		especialidade: 'Ortopedista',
		foto: require('../../assets/medico2.jpg'),
	},
	{
		id: 3,
		nome: 'DrMarcio',
		especialidade: 'Cardiologista',
		foto: require('../../assets/medico3.webp'),
	},
	{
		id: 4,
		nome: 'DrAndre',
		especialidade: 'Clinico Geral',
		foto: require('../../assets/medico4.jpg'),
	},
];

export const SelectDoctor = ({ navigation }) => {
	const [showModalSchedule, setShowModalSchedule] = useState(false);

	const onPressCancel = () => {
		navigation.navigate('Main');
		setShowModalSchedule(true);
	};

	const [medicosLista, setMedicosLista] = useState([]);

	async function listarMedicos() {
		await api
			.get('/Medicos')
			.then((response) => {
				setMedicosLista(response.data);
			})
			.catch((error) => console.error(error));
	}

	useEffect(() => {
		listarMedicos();
	}, []);

	return (
		<Container>
			<TitleB>Selecionar médico</TitleB>

			<ScrollView>
				{medicosLista.map((medico) => (
					// console.log(medico),
					<CardDoctor
						nome={medico.idNavigation.nome}
						especialidade={
							medico.especialidade
								.especialidade1
						}
						foto={medico.idNavigation.foto}
					/>
				))}
			</ScrollView>

			<Button
				onPress={() => navigation.replace('SelectDate')}
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
