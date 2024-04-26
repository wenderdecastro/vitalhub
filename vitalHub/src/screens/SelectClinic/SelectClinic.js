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

const Clinicas = [
	{
		id: 1,
		nome: 'Clínica Natureh',
		endereco: 'São Paulo, SP',
		avaliacao: '4.5',
		funcionamento: 'Seg-Sex',
	},
	{
		id: 2,
		nome: 'Clinica GuVets',
		endereco: 'Santo Andre, SP',
		avaliacao: '4.9',
		funcionamento: 'Seg-Sex',
	},
	{
		id: 3,
		nome: 'Clinica Salutis',
		endereco: 'São Paulo, SP',
		avaliacao: '4.3',
		funcionamento: 'Seg-Sex',
	},
];

export const SelectClinic = ({ navigation }) => {
	const [showModalSchedule, setShowModalSchedule] = useState(false);
	const [clinicaLista, setClinicaLista] = useState([]);

	useEffect(() => {
		listarClinicas();
	}, []);

	const onPressCancel = () => {
		navigation.navigate('Main');
		setShowModalSchedule(true);
	};
	async function listarClinicas() {
		await api
			.get('/Clinica/ListarTodas')
			.then((response) => {
				setClinicaLista(response.data);
			})
			.catch((error) => console.error(error));
	}

	return (
		<Container>
			<TitleB>Selecionar clínica</TitleB>

			<ScrollView>
				{clinicaLista.map((clinica) => (
					<CardClinic
						nome={clinica.nomeFantasia}
						endereco={
							clinica.endereco
								.logradouro
						}
						// avaliacao={clinica.avaliacao}
						// funcionamento={
						// 	clinica.funcionamento
						// }
					/>
				))}
			</ScrollView>

			<Button
				onPress={() =>
					navigation.replace('SelectDoctor')
				}
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
