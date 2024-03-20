import { Image } from "react-native"
import { BoxImage } from "../../components/BoxImage/BoxImage"
import { BoxInput } from "../../components/BoxInput"
import { InputText } from "../../components/BoxInput/style"
import { Button } from "../../components/Button/Style"
import { Container, ContainerScroll } from "../../components/Container/Style"
import { CancelAppointment } from "../../components/Links/Style"
import { SubTitle, TitleC } from "../../components/Title/Style"
import { UserPicture } from "../../components/UserPicture/Style"
import { BoxPrescription, ButtonCancel, ButtonUpload, ContainerPrescription, ContainerSubTitle, ContentUpload, Line, PrescriptionImage, TextBox, TextBox2, TextCancel, TitleBox } from "./Style"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react"

export const ViewPrescription = ({ navigation, route }) => {
    const { photoUri } = route.params || {};
    const[isPhoto,setIsPhoto] = useState(true)

    function onPressPhoto() {
        navigation.navigate("CameraScreen");
        setIsPhoto(true)
    }

    function onPressCancel() {
        setIsPhoto(false);
        route.params = null
    }
    return (
        <ContainerScroll>
            <Container>
                <UserPicture source={require("../../assets/medico1.jpg")} />
                <TitleC>Dr Claudio</TitleC>

                <ContainerSubTitle>
                    <SubTitle>Cliníco geral</SubTitle>
                    <SubTitle>CRM-15286</SubTitle>
                </ContainerSubTitle>

                <BoxInput
                    fieldWidht={80}
                    textLabel={'Descrição da consulta'}
                    placeholder='O paciente possuí uma infecção no
                ouvido. Necessário repouse de 2 dias
                e acompanhamento médico constante'
                    multiline={true}
                    fieldHeight={120}

                />
                <BoxInput
                    fieldWidht={80}
                    textLabel={'Diagnóstico do paciente'}
                    placeholder={'Infecção no ouvido'}
                    multiline={true}
                />
                <BoxInput
                    fieldWidht={80}
                    textLabel={'Prescrição médica'}
                    placeholder='Medicamento: Advil
                Dosagem: 50 mg
                Frequência: 3 vezes ao dia
                Duração: 3 dias'
                    multiline={true}
                    fieldHeight={120}
                />

                <TitleBox>Exames médicos</TitleBox>

                {
                    photoUri && isPhoto ?
                        <PrescriptionImage
                            source={{ uri: photoUri }}
                            style={{transform: [{ rotate: '180deg' }]}}
                        />
                        :
                        <BoxPrescription>
                            <AntDesign name="upload" size={20} color="#4E4B59" />
                            <TextBox>Nenhuma foto informada</TextBox>
                        </BoxPrescription>
                }



                <ContentUpload>
                    <ButtonUpload onPress={() => {onPressPhoto()}}>
                        <MaterialCommunityIcons name="camera-plus-outline" size={22} color="white" />
                        <TextBox2>Enviar</TextBox2>
                    </ButtonUpload>
                    <ButtonCancel onPress={() => {onPressCancel()}}>
                        <TextCancel>Cancelar</TextCancel>
                    </ButtonCancel>
                </ContentUpload>


                <Line />

                <InputText
                    fieldWidht={80}
                    fieldHeight={80}
                    placeholder='Resultado do exame de sangue : tudo normal'
                    multiline={true}
                />

                <CancelAppointment onPress={() => navigation.replace("Main")}>
                    Voltar
                </CancelAppointment>

            </Container>
        </ContainerScroll>
    )
}