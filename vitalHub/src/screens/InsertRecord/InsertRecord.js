import { BoxInput } from "../../components/BoxInput"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Container, ContainerScroll } from "../../components/Container/Style"
import { CancelAppointment } from "../../components/Links/Style"
import { UserPicture } from "../../components/UserPicture/Style"
import { ButtonEdit } from "../ViewRecord/Style"

export const InsertRecord = ({ navigation }) => {
    return (
        <ContainerScroll>
            <Container>

                <UserPicture source={{ uri: "https://github.com/zAlves31.png" }} />
                <BoxInput
                    fieldWidht={80}
                    textLabel='Descrição da consulta'
                    placeholder='O paciente possuí uma infecção no
                ouvido. Necessário repouse de 2 dias
                e acompanhamento médico constante'
                    fieldHeight={100}
                    multiline={true}
                    InsertRecord={true}
                />
                <BoxInput
                    fieldWidht={80}
                    textLabel='Diagnóstico do paciente'
                    placeholder='Infecção no ouvido'
                    fieldHeight={60}
                    multiline={true}
                    editable={true}
                    InsertRecord={true}
                />
                <BoxInput
                    fieldWidht={80}
                    textLabel='Prescrição médica'
                    placeholder='Medicamento: Advil
                Dosagem: 50 mg
                Frequência: 3 vezes ao dia
                Duração: 3 dias'
                    fieldHeight={100}
                    multiline={true}
                    editable={true}
                />

                <ButtonEdit onPress={() => navigation.replace("Home")}>
                    <ButtonTitle>
                        SALVAR
                    </ButtonTitle>
                </ButtonEdit>

                <CancelAppointment>Cancelar</CancelAppointment>

            </Container>
        </ContainerScroll>
    )
}