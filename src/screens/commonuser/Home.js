import { StatusBar, View } from 'react-native';
import { Header } from '../../components/Header';
import { WeeklyCalendar } from '../../components/Calendar/WeeklyCalendar';
import { Container } from '../../components/Container';
import { ContainerBox } from '../../components/Container/style';
import { FilterButtonSwitch } from '../../components/Buttons';
import { SwitchContainer } from '../../components/Buttons/style';
import { useState } from 'react';
import { AppointmentCard, Appointments } from '../../components/Card';
import { CardList } from '../../components/Card/style';
import {
	CancelModal,
	ConfirmScheduleModal,
	MedicalRecordModal,
	ScheduleAppointment,
	ScheduleAppointmentModal,
} from '../../components/Modal';
import { NewScheduleButton } from '../../components/FixedButtons';

export const Home = ({ navigation }) => {
	const [AppointmentList, setAppointmentList] = useState([
		{
			consultationId: 1,
			patientName: 'Tasmania',
			patientAge: '69',
			appointmentPriority: 'Rotina',
			appointmentTime: '14:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 2,
			patientName: 'Pato donald',
			patientAge: '28',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'scheduled',
		},
		{
			consultationId: 3,
			patientName: 'Endauldi',
			patientAge: '24',
			appointmentPriority: 'Rotina',
			appointmentTime: '16:00',
			appointmentStatus: 'terminated',
		},
		{
			consultationId: 4,
			patientName: 'Aggrumgit',
			patientAge: '22',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'scheduled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
		{
			consultationId: 5,
			patientName: 'BUGIGANGA',
			patientAge: '13',
			appointmentPriority: 'Urgência',
			appointmentTime: '15:00',
			appointmentStatus: 'cancelled',
		},
	]);
	const [profile, setProfile] = useState('Patientsdfg');
	const [listView, setListView] = useState('scheduled');

	const [cancelModalVisible, setCancelModalVisible] = useState(false);
	const [medicalRecordModalVisible, setMedicalRecordModalVisible] =
		useState(false);
	const [NewRecordModalVisible, setNewRecordModalVisible] =
		useState(false);
	const [confirmModalVisible, setConfirmModalVisible] = useState(false);
	async function handleClose(screen) {
		await setMedicalRecordModalVisible(false);
		navigation.replace(screen);
	}

	return (
		<>
			<CancelModal
				isVisible={cancelModalVisible}
				hideModalFn={() => {
					setCancelModalVisible(false);
				}}
			/>
			<MedicalRecordModal
				profile={profile}
				navigateMap={() =>
					handleClose('AppointmentMap')
				}
				navigateRecords={() =>
					handleClose('MedicalRecord')
				}
				patientAge={22}
				patientName={'Tasmania Souza'}
				patientEmail={'ribossomos@gmail'}
				imgSource={{
					uri: 'https://http2.mlstatic.com/D_NQ_NP_912498-MLB52128503176_102022-O.png',
				}}
				isVisible={medicalRecordModalVisible}
				hideModalFn={() => {
					setMedicalRecordModalVisible(false);
				}}
			/>

			<ScheduleAppointmentModal
				isVisible={NewRecordModalVisible}
				hideModalFn={() =>
					setNewRecordModalVisible(false)
				}
			/>

			<ConfirmScheduleModal
				isVisible={confirmModalVisible}
				hideModalFn={() =>
					setConfirmModalVisible(false)
				}
			/>

			<ContainerBox>
				<StatusBar />

				{/* Header */}
				<Header
					profileClick={() =>
						navigation.navigate('Profile')
					}
				/>

				{/* Calendar */}

				<WeeklyCalendar />

				{/* Filtros (button) */}
				<SwitchContainer>
					<FilterButtonSwitch
						textButton={'Agendadas'}
						clickButton={
							listView === 'scheduled'
						}
						onPress={() =>
							setListView('scheduled')
						}
					/>
					<FilterButtonSwitch
						textButton={'Realizadas'}
						clickButton={
							listView ===
							'terminated'
						}
						onPress={() =>
							setListView(
								'terminated',
							)
						}
					/>
					<FilterButtonSwitch
						textButton={'Canceladas'}
						clickButton={
							listView === 'cancelled'
						}
						onPress={() =>
							setListView('cancelled')
						}
					/>
				</SwitchContainer>

				<Container>
					<NewScheduleButton
						NewScheduleFn={() => {
							setNewRecordModalVisible(
								true,
							);
						}}
					/>
					<CardList
						data={AppointmentList}
						key={(item) => item.id}
						renderItem={({ item }) =>
							listView ==
								item.appointmentStatus && (
								<AppointmentCard
									profile={
										profile
									}
									patientName={
										item.patientName
									}
									patientAge={
										item.patientAge
									}
									appointmentTime={
										item.appointmentTime
									}
									appointmentPriority={
										item.appointmentPriority
									}
									appointmentStatus={
										item.appointmentStatus
									}
									cancelFn={() => {
										setCancelModalVisible(
											true,
										);
									}}
									viewMedicalRecordsFn={
										profile ===
										'Paciente'
											? () => {
													navigation.navigate(
														'MedicalRecord',
													);
											  }
											: () => {
													setMedicalRecordModalVisible(
														true,
													);
											  }
									}
									navigation={
										navigation
									}
									cardClickFn={() => {
										setMedicalRecordModalVisible(
											true,
										);
									}}
								/>
							)
						}
					/>
				</Container>
				{/* Cards */}
			</ContainerBox>
		</>
	);
};
