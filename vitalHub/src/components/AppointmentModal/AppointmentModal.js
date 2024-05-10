import { Modal } from 'react-native';
import { ContentModal, ViewModal } from '../CancelModal/style';
import { Title } from '../Title/Style';
import { TextModal } from '../TextAdd/Style';
import { Button } from '../Button/Style';
import { ButtonTitle } from '../ButtonTitle/Style';
import { LinkModal } from '../Links/Style';
import { ModalImage } from '../UserPicture/Style';
import moment from 'moment';
import { useEffect } from 'react';

export const AppointmentModal = ({
	navigation,
	appointmentData = null,
	visible,
	setShowModalAppointment,
	...rest
}) => {
	const dataNascimento = appointmentData ? moment(appointmentData.paciente.dataNascimento) : null;

	const idade = appointmentData ? moment().diff(dataNascimento, 'years') : null;

	const onPressHandler = () => {

		console.log('navegando para ViewRecord');
		navigation.navigate('ViewRecord', {
			nome: appointmentData.paciente.idNavigation.nome,
			email: appointmentData.paciente.idNavigation.email,
			foto: appointmentData.paciente.idNavigation.foto,
			descricao: appointmentData.descricao,
			diagnostico: appointmentData.diagnostico,
			receita: appointmentData.receita.medicamento,
			id: appointmentData.id
		});
		setShowModalAppointment(false);

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
						source={{
							uri: appointmentData
								.paciente
								.idNavigation
								.foto
						}}
					/>

					<Title>
						{
							appointmentData.paciente
								.idNavigation
								.nome
						}
					</Title>

					<TextModal>
						{idade} anos
					</TextModal>
					<TextModal>
						{
							appointmentData.paciente
								.idNavigation
								.email
						}
					</TextModal>

					<Button
						onPress={() => { onPressHandler() }}
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
