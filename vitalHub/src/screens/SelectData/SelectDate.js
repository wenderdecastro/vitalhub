import { useEffect, useState } from 'react';
import FullCalender from '../../components/CalendarSelectDate/CalendarSelectDate';
import { Container } from '../../components/Container/Style';
import { TitleB } from '../../components/Title/Style';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { CancelAppointment } from '../../components/Links/Style';
import SelectInput from '../../components/SelectInput/SelectInput';
import { SummaryScheduleModal } from '../../components/SummaryAppointmentModal/SummaryShedule';
import { ScheduleModal } from '../../components/ScheduleModal/SchedyleModal';
import moment from 'moment';

export const SelectDate = ({ navigation, route }) => {
	const [agendamento, setAgendamento] = useState(null);
	const [selectedDate, setSelectedDate] = useState();
	const [selectedTime, setSelectedTime] = useState();

	const [showModalSummary, setShowModalSummary] = useState(false);
	const [showModalSchedule, setShowModalSchedule] = useState(false);

	useEffect(() => {
		setAgendamento({
			...route.params.agendamento,
			dataConsulta: `${selectedDate} ${selectedTime}`,
		});
	}, [selectedDate, selectedTime]);

	const onPressCancel = () => {
		setShowModalSchedule(true);
		navigation.navigate('Main');
	};

	return (
		<Container>
			<TitleB>Selecionar Data</TitleB>
			<FullCalender
				selectedDate={selectedDate}
				handleSelectedDateFn={setSelectedDate}
			/>

			<SelectInput
				labelText="Selecione um horário disponível"
				defaultText="Selecionar horário"
				handleSelectedFn={setSelectedTime}
			/>

			<Button
				onPress={() => (
					setAgendamento({
						...agendamento,
						dataConsulta: `${selectedDate} ${selectedTime}`,
					}),
					console.log(agendamento),
					console.log(moment()),
					setShowModalSummary(true)
				)}
			>
				<ButtonTitle>CONFIRMAR</ButtonTitle>
			</Button>

			<CancelAppointment onPress={() => onPressCancel()}>
				Cancelar
			</CancelAppointment>

			<SummaryScheduleModal
				agendamento={agendamento}
				visible={showModalSummary}
				setShowModalSummary={setShowModalSummary}
				navigation={navigation}
			/>

			<ScheduleModal
				route={route}
				visible={showModalSchedule}
				setShowModalSchedule={setShowModalSchedule}
			/>
		</Container>
	);
};