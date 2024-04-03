import { StatusBar } from 'expo-status-bar';
import { Container } from '../../components/Container/Style';
import { Header } from '../../components/Header/Header';
import { CalendarHome } from '../../components/CalendarHome/CalendarHome';
import { useEffect, useState } from 'react';
import { ButtonTabs } from '../../components/ButtonTabs/ButtonTabs';
import { ContainerAppointment } from './Style';
import {
	AppointmentCard,
	QueryCard,
} from '../../components/AppointmentCard/QueryCard';
import { ListComponent } from '../../components/List/List';
import { CancelModal } from '../../components/CancelModal/CancelModal';
import { AppointmentModal } from '../../components/AppointmentModal/AppointmentModal';
import { MakeAppointment } from '../../components/Button/Style';
import { FontAwesome } from '@expo/vector-icons';
import { ScheduleModal } from '../../components/ScheduleModal/SchedyleModal';
import { LocalModal } from '../../components/LocalModal/LocalModal';
import { userDecodeToken } from '../../utils/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../service/Service';

const Consultas = [
	{
		id: 1,
		nome: 'gustavo',
		age: 18,
		hour: '14:00',
		reason: 'Rotina',
		situacao: 'Pendente',
		imagem: { uri: 'https://github.com/GustavoPasqualetti.png' },
		email: 'gustavopasqualetti@gmail.com',
	},
	{
		id: 2,
		nome: 'Joao Vitor',
		age: 20,
		hour: '15:00',
		reason: 'Rotina',
		situacao: 'realizada',
		imagem: { uri: 'https://github.com/zAlves31.png' },
		email: 'joaovitoralves@gmail.com',
	},
	{
		id: 3,
		nome: 'eduardo',
		age: 18,
		hour: '16:00',
		reason: 'Rotina',
		situacao: 'cancelada',
		imagem: { uri: 'https://github.com/EduardoPasqualetti.png' },
		email: 'eduardopasqualetti@gmail.com',
	},
];

const ConsultasUser = [
	{
		id: 1,
		nome: 'DrClaudio',
		crm: '13456',
		especialidade: 'Clinico Geral',
		age: 52,
		hour: '10:00',
		reason: 'Rotina',
		situacao: 'Pendente',
		imagem: require('../../assets/medico1.jpg'),
	},
	{
		id: 2,
		nome: 'DrCesar',
		crm: '12690',
		especialidade: 'Ortopedista',
		age: 35,
		hour: '14:00',
		reason: 'Rotina',
		situacao: 'realizada',
		imagem: require('../../assets/medico2.jpg'),
	},
	{
		id: 3,
		nome: 'DrMarcio',
		crm: '26647',
		especialidade: 'Cardiologista',
		age: 43,
		hour: '17:00',
		reason: 'Rotina',
		situacao: 'cancelada',
		imagem: require('../../assets/medico3.webp'),
	},
	{
		id: 4,
		nome: 'DrAndre',
		crm: '21589',
		especialidade: 'Clinico Geral',
		age: 52,
		hour: '10:00',
		reason: 'Rotina',
		situacao: 'Pendente',
		imagem: require('../../assets/medico4.jpg'),
	},
];

export const Home = ({ navigation }) => {
	const [dataConsulta, setDataConsulta] = useState();

	const [statusList, setStatusList] = useState('Pendente');

	const [showModalCancel, setShowModalCancel] = useState(false);

	const [listaConsultas, setListaConsultas] = useState([]);

	const [showModalAppointment, setShowModalAppointment] = useState(false);

	const [selectedAppointment, setSelectedAppointment] = useState(null);

	const [showModalSchedule, setShowModalSchedule] = useState(false);

	const [showModalLocal, setShowModalLocal] = useState(false);

	const [userLogin, setUserLogin] = useState();
	const [profile, setProfile] = useState();

	async function profileLoad() {
		const token = await userDecodeToken();

		console.log(token);
		setProfile(token);
		setUserLogin(token.role);
	}

	async function ListarConsulta() {
		try {
			const token = JSON.parse(
				await AsyncStorage.getItem('token'),
			).token;
			console.log(token);
			console.log(profile.jti);
			if (token) {
				await api
					.get(
						`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${profile.jti}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					.then((response) => {
						setListaConsultas(
							response.data,
						);
						console.log(response.data);
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				console.log(
					'Token de autorizacao nao encontrado',
				);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		ListarConsulta();
		profileLoad();
	}, []);

	useEffect(() => {
		if (dataConsulta != '') {
			ListarConsulta();
		}
	}, [dataConsulta]);

	return userLogin == 'Medico' ? (
		<Container>
			<StatusBar />

			<Header
				name={'Dr Claudio'}
				ProfileImage={require('../../assets/medico1.jpg')}
				navigation={navigation}
			/>

			<CalendarHome setDataConsulta={setDataConsulta} />

			<ContainerAppointment>
				<ButtonTabs
					textButton={'Pendentes'}
					clickButton={statusList === 'Pendente'}
					onPress={() =>
						setStatusList('Pendente')
					}
				/>

				<ButtonTabs
					textButton={'Realizadas'}
					clickButton={statusList === 'realizada'}
					onPress={() =>
						setStatusList('realizada')
					}
				/>

				<ButtonTabs
					textButton={'Canceladas'}
					clickButton={statusList === 'cancelada'}
					onPress={() =>
						setStatusList('cancelada')
					}
				/>
			</ContainerAppointment>

			<ListComponent
				data={listaConsultas}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					if (
						statusList === 'Pendente' &&
						item.situacao === 'Pendente'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								situacao={
									item
										.situacao
										.situacao
								}
								onPressCancel={() =>
									setShowModalCancel(
										true,
									)
								}
								name={
									item
										.medicoClinica
										.medico
										.idNavigation
										.nome
								}
								especialidade={
									item
										.medicoClinica
										.medico
										.especialidade
										.especialidade1
								}
								imagem={
									item
										.medicoClinica
										.medico
										.idNavigation
										.foto
								}
								crm={
									item
										.medicoClinica
										.medico
										.crm
								}
								age={
									item
										.paciente
										.dataNascimento
								}
								reason={
									item
										.prioridade
										.prioridade
								}
								hour={
									item.dataConsulta
								}
							/>
						);
					}
					if (
						statusList === 'realizada' &&
						item.situacao === 'realizada'
					) {
						return (
							<AppointmentCard
								situacao={
									item
										.situacao
										.situacao
								}
								onPressLocal={() => {
									setSelectedAppointment(
										item,
									);
									setShowModalAppointment(
										true,
									);
								}}
								onPressAppointment={() =>
									navigation.navigate(
										'ViewPrescription',
									)
								}
								name={
									item
										.medicoClinica
										.medico
										.idNavigation
										.nome
								}
								especialidade={
									item
										.medicoClinica
										.medico
										.especialidade
										.especialidade1
								}
								imagem={
									item
										.medicoClinica
										.medico
										.idNavigation
										.foto
								}
								crm={
									item
										.medicoClinica
										.medico
										.crm
								}
								age={
									item
										.paciente
										.dataNascimento
								}
								reason={
									item
										.prioridade
										.prioridade
								}
								hour={
									item.dataConsulta
								}
							/>
						);
					}
					if (
						statusList === 'cancelada' &&
						item.situacao.situacao ===
							'cancelada'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								situacao={
									item
										.situacao
										.situacao
								}
								name={
									item
										.medicoClinica
										.medico
										.idNavigation
										.nome
								}
								especialidade={
									item
										.medicoClinica
										.medico
										.especialidade
										.especialidade1
								}
								imagem={
									item
										.medicoClinica
										.medico
										.idNavigation
										.foto
								}
								crm={
									item
										.medicoClinica
										.medico
										.crm
								}
								age={
									item
										.paciente
										.dataNascimento
								}
								reason={
									item
										.prioridade
										.prioridade
								}
								hour={
									item.dataConsulta
								}
							/>
						);
					}
				}}
			/>

			<CancelModal
				visible={showModalCancel}
				setShowModalCancel={setShowModalCancel}
			/>
			<AppointmentModal
				visible={showModalAppointment}
				setShowModalAppointment={
					setShowModalAppointment
				}
				appointmentData={selectedAppointment}
				navigation={navigation}
			/>
		</Container>
	) : (
		<Container>
			<Header
				name={'Gustavo'}
				ProfileImage={require('../../assets/perfil.jpg')}
				navigation={navigation}
			/>

			<CalendarHome setDataConsulta={setDataConsulta} />

			<ContainerAppointment>
				<ButtonTabs
					textButton={'Pendentes'}
					clickButton={statusList === 'Pendente'}
					onPress={() =>
						setStatusList('Pendente')
					}
				/>

				<ButtonTabs
					textButton={'Realizadas'}
					clickButton={statusList === 'realizada'}
					onPress={() =>
						setStatusList('realizada')
					}
				/>

				<ButtonTabs
					textButton={'Canceladas'}
					clickButton={statusList === 'cancelada'}
					onPress={() =>
						setStatusList('cancelada')
					}
				/>
			</ContainerAppointment>

			<ListComponent
				data={listaConsultas}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					if (
						statusList === 'Pendente' &&
						item.situacao.situacao ===
							'Pendente'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								situacao={
									item
										.situacao
										.situacao
								}
								onPressAppointment={() =>
									setShowModalAppointment(
										true,
									)
								}
								onPressCancel={() =>
									setShowModalCancel(
										true,
									)
								}
								onPressLocal={() => {
									setShowModalLocal(
										true,
									);
									setSelectedAppointment(
										item,
									);
								}}
								name={
									item
										.medicoClinica
										.medico
										.idNavigation
										.nome
								}
								especialidade={
									item
										.medicoClinica
										.medico
										.especialidade
										.especialidade1
								}
								imagem={
									item
										.medicoClinica
										.medico
										.idNavigation
										.foto
								}
								crm={
									item
										.medicoClinica
										.medico
										.crm
								}
								age={
									item
										.paciente
										.dataNascimento
								}
								reason={
									item
										.prioridade
										.prioridade
								}
								hour={
									item.dataConsulta
								}
							/>
						);
					}
					if (
						statusList === 'realizada' &&
						item.situacao === 'realizada'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								situacao={
									item
										.situacao
										.situacao
								}
								onPressLocal={() =>
									navigation.navigate(
										'ViewRecord',
									)
								}
								name={
									item
										.medicoClinica
										.medico
										.idNavigation
										.nome
								}
								especialidade={
									item
										.medicoClinica
										.medico
										.especialidade
										.especialidade1
								}
								imagem={
									item
										.medicoClinica
										.medico
										.idNavigation
										.foto
								}
								crm={
									item
										.medicoClinica
										.medico
										.crm
								}
								age={
									item
										.paciente
										.dataNascimento
								}
								reason={
									item
										.prioridade
										.prioridade
								}
								hour={
									item.dataConsulta
								}
							/>
						);
					}
					if (
						statusList === 'cancelada' &&
						item.situacao === 'cancelada'
					) {
						return (
							<AppointmentCard
								situacao={
									item
										.situacao
										.situacao
								}
								name={
									item
										.medicoClinica
										.medico
										.idNavigation
										.nome
								}
								especialidade={
									item
										.medicoClinica
										.medico
										.especialidade
										.especialidade1
								}
								imagem={
									item
										.medicoClinica
										.medico
										.idNavigation
										.foto
								}
								crm={
									item
										.medicoClinica
										.medico
										.crm
								}
								age={
									item
										.paciente
										.dataNascimento
								}
								reason={
									item
										.prioridade
										.prioridade
								}
								hour={
									item.dataConsulta
								}
							/>
						);
					}
				}}
			/>

			<MakeAppointment
				onPress={() => setShowModalSchedule(true)}
			>
				<FontAwesome
					name="stethoscope"
					size={38}
					color="white"
				/>
			</MakeAppointment>

			<CancelModal
				visible={showModalCancel}
				setShowModalCancel={setShowModalCancel}
			/>
			<AppointmentModal
				visible={showModalAppointment}
				setShowModalAppointment={
					setShowModalAppointment
				}
			/>
			<ScheduleModal
				visible={showModalSchedule}
				navigation={navigation}
				setShowModalSchedule={setShowModalSchedule}
			/>
			<LocalModal
				visible={showModalLocal}
				navigation={navigation}
				setShowModalLocal={setShowModalLocal}
				appointmentData={selectedAppointment}
			/>
		</Container>
	);
};
