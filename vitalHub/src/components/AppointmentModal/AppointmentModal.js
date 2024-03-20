import { Modal } from "react-native"
import { ContentModal, ViewModal } from "../CancelModal/style"
import { Title } from "../Title/Style"
import {  TextModal } from "../TextAdd/Style"
import { Button } from "../Button/Style"
import { ButtonTitle } from "../ButtonTitle/Style"
import { LinkModal } from "../Links/Style"
import { ModalImage } from "../UserPicture/Style"

export const AppointmentModal = ({ navigation, appointmentData, visible, setShowModalAppointment, ...rest }) => {

    onPressHandler = () => {
        navigation.navigate("InsertRecord")
        setShowModalAppointment(false)
    }

    const { nome, age, imagem, email } = appointmentData || {};

    return(
        <Modal  {...rest} visible={visible} transparent={true} animationType="fade">
            <ViewModal>
                <ContentModal>

                    <ModalImage
                    source={imagem}
                    />

                    <Title>{nome}</Title>

                    <TextModal>{age} anos</TextModal>
                    <TextModal>{email}</TextModal>

                    <Button onPress={() => {onPressHandler()}}>
                        <ButtonTitle>INSERIR PRONTUÁRIO</ButtonTitle>
                    </Button>

                    <LinkModal onPress={() => setShowModalAppointment(false)}>
                    Cancelar
                    </LinkModal>


                </ContentModal>
            </ViewModal>
        </Modal>
    )
}