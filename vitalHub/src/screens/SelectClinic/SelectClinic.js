import { ScrollView } from "react-native"
import { Button } from "../../components/Button/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { CardClinic } from "../../components/CardClinic/CardClinic"
import { Container } from "../../components/Container/Style"
import { CancelAppointment, LinkModal } from "../../components/Links/Style"
import { TitleB } from "../../components/Title/Style"
import { useState } from "react"
import { ScheduleModal } from "../../components/ScheduleModal/SchedyleModal"


const Clinicas = [
    { id: 1, nome: "Clínica Natureh", endereco: "São Paulo, SP", avaliacao: "4.5", funcionamento: "Seg-Sex" },
    { id: 2, nome: "Clinica GuVets", endereco: "Santo Andre, SP", avaliacao: "4.9", funcionamento: "Seg-Sex" },
    { id: 3, nome: "Clinica Salutis", endereco: "São Paulo, SP", avaliacao: "4.3", funcionamento: "Seg-Sex" }

]



export const SelectClinic = ({ navigation }) => {

    const [showModalSchedule, setShowModalSchedule] = useState(false)

    const onPressCancel = () => {
        navigation.navigate("Main")
        setShowModalSchedule(true)
        
    }

    return (
        <Container>
            <TitleB>Selecionar clínica</TitleB>

            <ScrollView>
                {Clinicas.map(clinica => (
                    <CardClinic
                        nome={clinica.nome}
                        endereco={clinica.endereco}
                        avaliacao={clinica.avaliacao}
                        funcionamento={clinica.funcionamento}
                    />
                ))}
            </ScrollView>


            <Button onPress={() => navigation.replace("SelectDoctor")}>
                <ButtonTitle>
                    CONTINUAR
                </ButtonTitle>
            </Button>

            <CancelAppointment onPress={() => onPressCancel()}>Cancelar</CancelAppointment>

            <ScheduleModal
                visible={showModalSchedule}
                setShowModalSchedule={setShowModalSchedule}
            />
        </Container>
    )
}