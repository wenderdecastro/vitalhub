import { BoxInput } from "../../components/BoxInput"
import { ContainerProfile, ContainerScroll, ContainerUF } from "../../components/Container/Style"
import { TextAdd } from "../../components/TextAdd/Style"
import { Title, TitleC } from "../../components/Title/Style"
import { UserPicture } from "../../components/UserPicture/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Button, Button2, CloseButton } from "../../components/Button/Style"
import { useEffect, useState } from "react"
import { CancelAppointment } from "../../components/Links/Style"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userDecodeToken } from "../../utils/Auth"
import api from "../../service/Service"
import { Text } from "react-native"

export const Profile = ({ navigation }) => {

    const [ProfileEdit, setProfileEdit] = useState(true)

    async function logout() {
        try {
            await AsyncStorage.removeItem('token');
            navigation.replace("Login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [idUser, setIdUser] = useState()
    const [userData, setUserData] = useState()
    const [cep, setCep] = useState()
    const [logradouro, setLogradouro] = useState()
    const [role, setRole] = useState()
    const [cpf, setCpf] = useState()
    const [crm, setCrm] = useState()

    async function profileLoad() {
        const token = await userDecodeToken()
       
        console.log(token);

        setNome(token.name)
        setEmail(token.email)
        setRole(token.role)
        setIdUser(token.jti)
       
        await getUser()

    } 

    async function getUser() {
        
        const response = await api.get(`/Medicos/BuscarPorId/${idUser}`);
        setUserData(response.data);
        console.log(response.data);

        setLogradouro(response.data.endereco.logradouro)
        setCep(response.data.endereco.cep)
        setCpf(response.data.cpf)
        setCrm(response.data.crm)
       
        
    }

    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        
        if (idUser) {
            getUser(); 
        }
    }, [idUser]);


    return (
        <ContainerScroll>

            {ProfileEdit ? (
                <>
                    <UserPicture source={require("../../assets/perfil.jpg")} />
                    <ContainerProfile>
                        <TitleC>{nome}</TitleC>
                        <TextAdd>{email}</TextAdd>

                        <BoxInput
                            fieldWidht={80}
                            textLabel='Data de nascimento:'
                            placeholder='04/05/1999'
                            fieldHeight={60}

                        />
                        {
                            role == "Paciente" ?
                                <BoxInput
                                    fieldWidht={80}
                                    textLabel='CPF:'
                                    fieldValue={cpf}
                                    fieldHeight={60}
                                />
                                :
                                <BoxInput
                                    fieldWidht={80}
                                    textLabel='CRM:'
                                    placeholder={crm}
                                    fieldHeight={60}
                                />
                        }

                        <BoxInput
                            fieldWidht={80}
                            textLabel='Endereço'
                            placeholder={logradouro}
                            
                            fieldHeight={60}
                        />

                      
                        
                        <ContainerUF>
                            <BoxInput
                                fieldWidht={45}
                                textLabel='CEP'
                                placeholder={cep}
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

                        <CloseButton onPress={() => logout()}>
                            <ButtonTitle>SAIR DO APP</ButtonTitle>
                        </CloseButton>

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
                            fieldHeight={60}
                            editable={true}
                        />
                        <BoxInput
                            fieldWidht={80}
                            textLabel='CPF:'
                            fieldHeight={60}
                            editable={true}
                        />
                        <BoxInput
                            fieldWidht={80}
                            textLabel='Endereço'
                            fieldHeight={60}
                            editable={true}
                        />

                        <ContainerUF>
                            <BoxInput
                                fieldWidht={45}
                                textLabel='CEP'
                                fieldHeight={60}
                            />
                            <BoxInput
                                fieldWidht={45}
                                textLabel='Cidade'
                                fieldHeight={60}
                            />
                        </ContainerUF>

                        <Button onPress={() => setProfileEdit(true)}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </Button>

                        <CancelAppointment
                            onPress={() => setProfileEdit(true)}
                        >Voltar</CancelAppointment>

                    </ContainerProfile>
                </>
            )}


        </ContainerScroll>
    )
}