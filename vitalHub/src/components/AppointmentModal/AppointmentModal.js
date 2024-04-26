import { Modal } from 'react-native';
import { ContentModal, ViewModal } from '../CancelModal/style';
import { Title } from '../Title/Style';
import { TextModal } from '../TextAdd/Style';
import { Button } from '../Button/Style';
import { ButtonTitle } from '../ButtonTitle/Style';
import { LinkModal } from '../Links/Style';
import { ModalImage } from '../UserPicture/Style';
import moment from 'moment';

export const AppointmentModal = ({
	navigation,
	appointmentData = null,
	visible,
	setShowModalAppointment,
	...rest
}) => {
	onPressHandler = () => {
		navigation.navigate('InsertRecord', appointmentData);
		setShowModalAppointment(false);
		console.log("levando para inserir prontuario");
		console.log("a");
	};

	return appointmentData !== null ? (
		<Modal
			{...rest}
			visible={visible}
			transparent={true}
			animationType="fade"
		>
			<ViewModal>
				<ContentModal>
					<ModalImage
						source={
							appointmentData
								.medicoClinica
								.medico
								.idNavigation
								.foto
						}
					/>

					<Title>
						{
							appointmentData.paciente
								.idNavigation
								.nome
						}
					</Title>

					<TextModal>
						{moment(
							appointmentData.paciente
								.dataNascimento,
						)
							.fromNow(true)
							.charAt(0)}{' '}
						anos
					</TextModal>
					<TextModal>
						{
							appointmentData.paciente
								.idNavigation
								.email
						}
					</TextModal>

					<Button
						onPress={() => {
							onPressHandler();
						}}
					>
						<ButtonTitle>
							INSERIR PRONTUÁRIO
						</ButtonTitle>
					</Button>

					<LinkModal
						onPress={() =>
							setShowModalAppointment(
								false,
							)
						}
					>
						Cancelar
					</LinkModal>
				</ContentModal>
			</ViewModal>
		</Modal>
	) : (
		<></>
	);
};
