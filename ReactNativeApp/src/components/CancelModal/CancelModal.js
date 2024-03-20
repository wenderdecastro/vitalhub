import { Modal } from "react-native"
import { Button, ButtonSecondary } from "../Button/Style"
import { ButtonTitle } from "../ButtonTitle/Style"
import { ContentModal, ViewModal } from "./style"
import { Title } from "../Title/Style"
import { TextAdd, TextModal } from "../TextAdd/Style"
import { LinkModal } from "../Links/Style"
import * as Notifications from "expo-notifications"

Notifications.requestPermissionsAsync(
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,

            shouldPlaySound: true,

            shouldSetBadge: true
        })
    })
)

export const CancelModal = ({ visible, setShowModalCancel, ...rest }) => {

    const handleCallNotification = async () => {
        const { status } = await Notifications.getPermissionsAsync()

        if (status !== "granted") {
            alert("Voce nao deixou as notificacoes ativas")
            return
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta",
                body: "Sua consulta foi cancelada",
                sound: 'default',
            },
            trigger: null
        })

    }

    onPressHandler = () => {
        setShowModalCancel(false)
        handleCallNotification()
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <ViewModal>
                <ContentModal>
                    <Title>Cancelar consulta</Title>
                    <TextModal>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</TextModal>

                    <Button onPress={() => { onPressHandler() }}>
                        <ButtonTitle>CONFIRMAR</ButtonTitle>
                    </Button>

                    <LinkModal onPress={() => setShowModalCancel(false)}>
                        Cancelar
                    </LinkModal>

                </ContentModal>
            </ViewModal>
        </Modal>
    )
}