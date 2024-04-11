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
					clickButton={statusList === 'Realizada'}
					onPress={() =>
						setStatusList('Realizada')
					}
				/>

				<ButtonTabs
					textButton={'Canceladas'}
					clickButton={statusList === 'Cancelada'}
					onPress={() =>
						setStatusList('Cancelada')
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
								role={userLogin}
								dados={item}
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
								// name={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.nome
								// }
								// especialidade={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.especialidade
								// 		.especialidade1
								// }
								// imagem={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.foto
								// }
								// crm={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.crm
								// }
								// age={
								// 	item
								// 		.paciente
								// 		.dataNascimento
								// }
								// reason={
								// 	item
								// 		.prioridade
								// 		.prioridade
								// }
								// hour={
								// 	item.dataConsulta
								// }
							/>
						);
					}
					if (
						statusList === 'Realizada' &&
						item.situacao === 'Realizada'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								role={userLogin}
								dados={item}
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
								// name={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.nome
								// }
								// especialidade={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.especialidade
								// 		.especialidade1
								// }
								// imagem={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.foto
								// }
								// crm={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.crm
								// }
								// age={
								// 	item
								// 		.paciente
								// 		.dataNascimento
								// }
								// reason={
								// 	item
								// 		.prioridade
								// 		.prioridade
								// }
								// hour={
								// 	item.dataConsulta
								// }
							/>
						);
					}
					if (
						statusList === 'Cancelada' &&
						item.situacao.situacao ===
							'Cancelada'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								role={userLogin}
								dados={item}
								situacao={
									item
										.situacao
										.situacao
								}
								// name={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.nome
								// }
								// especialidade={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.especialidade
								// 		.especialidade1
								// }
								// imagem={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.foto
								// }
								// crm={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.crm
								// }
								// age={
								// 	item
								// 		.paciente
								// 		.dataNascimento
								// }
								// reason={
								// 	item
								// 		.prioridade
								// 		.prioridade
								// }
								// hour={
								// 	item.dataConsulta
								// }
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
					clickButton={statusList === 'Realizada'}
					onPress={() =>
						setStatusList('Realizada')
					}
				/>

				<ButtonTabs
					textButton={'Canceladas'}
					clickButton={statusList === 'Cancelada'}
					onPress={() =>
						setStatusList('Cancelada')
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
								role={userLogin}
								dados={item}
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
								// name={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.nome
								// }
								// especialidade={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.especialidade
								// 		.especialidade1
								// }
								// imagem={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.foto
								// }
								// crm={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.crm
								// }
								// age={
								// 	item
								// 		.paciente
								// 		.dataNascimento
								// }
								// reason={
								// 	item
								// 		.prioridade
								// 		.prioridade
								// }
								// hour={
								// 	item.dataConsulta
								// }
							/>
						);
					}
					if (
						statusList === 'Realizada' &&
						item.situacao === 'Realizada'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								role={userLogin}
								dados={item}
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
								// name={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.nome
								// }
								// especialidade={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.especialidade
								// 		.especialidade1
								// }
								// imagem={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.foto
								// }
								// crm={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.crm
								// }
								// age={
								// 	item
								// 		.paciente
								// 		.dataNascimento
								// }
								// reason={
								// 	item
								// 		.prioridade
								// 		.prioridade
								// }
								// hour={
								// 	item.dataConsulta
								// }
							/>
						);
					}
					if (
						statusList === 'Cancelada' &&
						item.situacao === 'Cancelada'
					) {
						return (
							<AppointmentCard
								usuarioConsulta={
									profile
								}
								role={userLogin}
								dados={item}
								situacao={
									item
										.situacao
										.situacao
								}
								// name={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.nome
								// }
								// especialidade={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.especialidade
								// 		.especialidade1
								// }
								// imagem={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.idNavigation
								// 		.foto
								// }
								// crm={
								// 	item
								// 		.medicoClinica
								// 		.medico
								// 		.crm
								// }
								// age={
								// 	item
								// 		.paciente
								// 		.dataNascimento
								// }
								// reason={
								// 	item
								// 		.prioridade
								// 		.prioridade
								// }
								// hour={
								// 	item.dataConsulta
								// }
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
