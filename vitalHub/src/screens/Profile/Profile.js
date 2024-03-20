import { BoxInput } from "../../components/BoxInput"
import { ContainerProfile, ContainerScroll, ContainerUF } from "../../components/Container/Style"
import { TextAdd } from "../../components/TextAdd/Style"
import { Title, TitleC } from "../../components/Title/Style"
import { UserPicture } from "../../components/UserPicture/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Button, Button2 } from "../../components/Button/Style"
import { useState } from "react"
import { CancelAppointment } from "../../components/Links/Style"

export const Profile = ({navigation}) => {

    const [ProfileEdit, setProfileEdit] = useState(true)

    return (
        <ContainerScroll>

            {ProfileEdit ? (
            <>
            <UserPicture source={{ uri: ('https://github.com/GustavoPasqualetti.png') }} />
            <ContainerProfile>
                <TitleC>Gustavo Pasqualetti</TitleC>
                <TextAdd>gustavopasqualetti@gmail.com</TextAdd>

                <BoxInput
                    fieldWidht={80}
                    textLabel='Data de nascimento:'
                    placeholder='04/05/1999'   
                    fieldHeight={60}
                    
                />
                <BoxInput
                    fieldWidht={80}
                    textLabel='CPF:'
                    placeholder='859********'
                    fieldHeight={60}  
                />
                <BoxInput
                    fieldWidht={80}
                    textLabel='Endereço'
                    placeholder='Rua Vicenso Silva, 987'
                    fieldHeight={60}  
                />
                <ContainerUF>
                    <BoxInput
                        fieldWidht={45}
                        textLabel='CEP'
                        placeholder='06548-909'
                        fieldHeight={60}  
                    />
                    <BoxInput
                        fieldWidht={45}
                        textLabel='Cidade'
                        placeholder='Moema-SP'
                        fieldHeight={60}  
                    />
                </ContainerUF>
            
                <Button2 onPress={() => setProfileEdit(false)}>
                    <ButtonTitle>EDITAR</ButtonTitle>
                </Button2>

                <CancelAppointment
                onPress={() => navigation.replace("Main")}
                >Voltar</CancelAppointment>

            </ContainerProfile>
            </>
            ) : (
            <>
             <UserPicture source={{ uri: ('https://github.com/GustavoPasqualetti.png') }} />
            <ContainerProfile>
                <TitleC>Gustavo Pasqualetti</TitleC>
                <TextAdd>gustavopasqualetti@gmail.com</TextAdd>

                <BoxInput
                    fieldWidht={80}
                    textLabel='Data de nascimento:'
                    placeholder='04/05/1999'   
                    fieldHeight={60}
                    editable={true}
                />
                <BoxInput
                    fieldWidht={80}
                    textLabel='CPF:'
                    placeholder='859********'
                    fieldHeight={60}
                    editable={true}
                />
                <BoxInput
                    fieldWidht={80}
                    textLabel='Endereço'
                    placeholder='Rua Vicenso Silva, 987'
                    fieldHeight={60}
                    editable={true}
                />
                <ContainerUF>
                    <BoxInput
                        fieldWidht={45}
                        textLabel='CEP'
                        placeholder='06548-909'
                        fieldHeight={60}  
                    />
                    <BoxInput
                        fieldWidht={45}
                        textLabel='Cidade'
                        placeholder='Moema-SP'
                        fieldHeight={60}
                        editable={true}  
                    />
                </ContainerUF>


                <Button onPress={() => setProfileEdit(true)}>
                    <ButtonTitle>SALVAR</ButtonTitle>
                </Button>

                <CancelAppointment
                onPress={() => navigation.replace("Main")}
                >Voltar</CancelAppointment>

            </ContainerProfile>
            </>
            )}

           
        </ContainerScroll>
    )
}