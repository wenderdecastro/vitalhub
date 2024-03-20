import { Modal } from "react-native"
import { ContentModal, ViewModal } from "../CancelModal/style"
import { TextModal } from "../TextAdd/Style"
import { Button } from "../Button/Style"
import { ButtonTitle } from "../ButtonTitle/Style"
import { LinkModal } from "../Links/Style"
import { ModalImage } from "../UserPicture/Style"
import { Title } from "../Title/Style"

export const LocalModal = ({ navigation, appointmentData, visible, setShowModalLocal, ...rest }) => {

    const { nome, crm, imagem, especialidade } = appointmentData || {};

    onPressHandler = () => {
        navigation.navigate("HomeUser")
        setShowModalLocal(false)
    }

    onPressContinue = () => {
        navigation.navigate("LocalAppointment")
        setShowModalLocal(false)
    }

    return (
        <Modal  {...rest} visible={visible} transparent={true} animationType="fade">
            <ViewModal>
                <ContentModal>

                    <ModalImage
                        source={imagem}
                    />

                    <Title>{nome}</Title>

                    <TextModal>{especialidade}    {crm}</TextModal>

                    <Button onPress={() => {onPressContinue()}}>
                        <ButtonTitle>Ver local da consulta</ButtonTitle>
                    </Button>

                    <LinkModal onPress={() => { onPressHandler() }}>
                        Cancelar
                    </LinkModal>


                </ContentModal>
            </ViewModal>
        </Modal>
    )
}