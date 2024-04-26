import { Modal } from 'react-native';
import { ContentModal, ViewModal } from '../CancelModal/style';
import { TextModal } from '../TextAdd/Style';
import { Button } from '../Button/Style';
import { ButtonTitle } from '../ButtonTitle/Style';
import { LinkModal } from '../Links/Style';
import { ModalImage } from '../UserPicture/Style';
import { Title } from '../Title/Style';

export const LocalModal = ({
	navigation,
	appointmentData = null,
	visible,
	setShowModalLocal,
	...rest
}) => {
	onPressHandler = () => {
		navigation.navigate('Home');
		setShowModalLocal(false);
	};

	onPressContinue = () => {
		navigation.navigate('LocalAppointment', appointmentData.medicoClinica.clinicaId);
		console.log(appointmentData.medicoClinica.clinicaId);
		console.log("ta na modal ainda");
		setShowModalLocal(false);
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
							appointmentData
								.medicoClinica
								.medico
								.idNavigation
								.nome
						}
					</Title>

					<TextModal>
						{
							appointmentData
								.medicoClinica
								.medico
								.especialidade
								.especialidade1
						}{' '}
						{
							appointmentData
								.medicoClinica
								.medico.crm
						}
					</TextModal>

					<Button
						onPress={() => {
							onPressContinue();
						}}
					>
						<ButtonTitle>
							Ver local da consulta
						</ButtonTitle>
					</Button>

					<LinkModal
						onPress={() => {
							onPressHandler();
						}}
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
