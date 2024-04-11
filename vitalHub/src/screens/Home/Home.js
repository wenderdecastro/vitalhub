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
import moment from 'moment';

export const Home = ({ navigation }) => {
	const [dataConsulta, setDataConsulta] = useState('');

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
		setProfile(token);
		setUserLogin(token.role);

		setDataConsulta(moment().format('YYYY-MM-DD'));
	}

	async function ListarConsulta() {
		try {
			if (profile.role === 'Paciente') {
				console.log(
					`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${profile.jti}`,
				);
				await api
					.get(
						`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${profile.jti}`,
						{
							headers: {
								Authorization: `Bearer ${profile.token}`,
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
				await api
					.get(
						`/Medicos/BuscarPorData?data=${dataConsulta}&id=${userToken.jti}`,
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
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		profileLoad();
	}, []);

	useEffect(() => {
		if (dataConsulta != '') {
			ListarConsulta();
		}
	}, [dataConsulta]);

	return (
		<Container>
			<Header
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
				renderItem={({ item }) =>
					statusList === item.situacao.situacao &&
					listaConsultas ? (
						<AppointmentCard
							profile={profile}
							situacao={
								item.situacao
									.situacao
							}
							onPressAppointment={
								profile.role ===
								'Paciente'
									? () => {
											setSelectedAppointment(
												item,
											);
											setShowModalAppointment(
												true,
											);
											console.log(
												selectedAppointment,
											);
									  }
									: null
							}
							onPressCancel={() =>
								setShowModalCancel(
									true,
								)
							}
							onPressLocal={
								profile.role ===
								'Paciente'
									? () => {
											setSelectedAppointment(
												item,
											);
											setShowModalLocal(
												true,
											);
											console.log(
												selectedAppointment,
											);
									  }
									: navigation.navigate(
											'ViewRecord',
											item,
									  )
							}
							name={
								profile.role ===
								'Paciente'
									? item
											.paciente
											.idNavigation
											.nome
									: item
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
							age={
								profile.role ===
								'Paciente'
									? item
											.paciente
											.dataNascimento
									: item
											.medicoClinica
											.medico
											.crm
							}
							reason={
								item.prioridade
									.prioridade ===
								1
									? 'Urgência'
									: prioridade ===
									  2
									? 'Consulta'
									: 'Rotina'
							}
							hour={item.dataConsulta}
						/>
					) : (
						<></>
					)
				}
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
				appointmentData={selectedAppointment}
				visible={showModalAppointment}
				setShowModalAppointment={
					setShowModalAppointment
				}
			/>
			<ScheduleModal
				// data={selectedAppointment}
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
