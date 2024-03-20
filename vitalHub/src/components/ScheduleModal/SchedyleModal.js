import { Modal } from "react-native"
import { Button } from "../Button/Style"
import { ButtonTitle } from "../ButtonTitle/Style"
import { ContentModal, ViewModal } from "../CancelModal/style"
import { LinkModal } from "../Links/Style"
import { Title } from "../Title/Style"
import { BlueTitle, ContainerButtonsSchedule, LabelSchedule, SmallButton, TypeAppointment, TypeButton } from "./Style"


export const ScheduleModal = ({ navigation, visible, setShowModalSchedule, ...rest }) => {

    async function onPressHandler() {
        await setShowModalSchedule(false)
        navigation.replace("SelectClinic");
        
    };

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade" animationOutTiming={0}>
            <ViewModal>
                <ContentModal>
                    <Title>Agendar consulta</Title>

                    <TypeAppointment>

                        <LabelSchedule>Qual o nível da consulta</LabelSchedule>

                        <ContainerButtonsSchedule>
                            <SmallButton><BlueTitle>Rotina</BlueTitle></SmallButton>
                            <SmallButton><BlueTitle>Exame</BlueTitle></SmallButton>
                            <SmallButton><BlueTitle>Urgência</BlueTitle></SmallButton>
                        </ContainerButtonsSchedule>

                        <LabelSchedule>Informe a localização desejada</LabelSchedule>
                        <TypeButton>
                            <BlueTitle>Informe a localização</BlueTitle>
                        </TypeButton>
                        

                    </TypeAppointment>

                    <Button onPress={() => {onPressHandler()}}>
                        <ButtonTitle>
                            CONTINUAR
                        </ButtonTitle>
                    </Button>

                    <LinkModal onPress={() => setShowModalSchedule(false)}>
                        Cancelar
                    </LinkModal>
                </ContentModal>
            </ViewModal>
        </Modal>
    )
}