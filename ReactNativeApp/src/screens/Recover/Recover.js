import { Button, ButtonIcon, IconReturn } from "../../components/Button/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Styled"
import { Logo } from "../../components/Logo/Style"
import { TextAdd } from "../../components/TextAdd/Style"
import { Title } from "../../components/Title/Style"
import { AntDesign } from '@expo/vector-icons';

export const Recover = ({navigation}) => {
    return(
        <Container>
            <ButtonIcon onPress={() => navigation.replace("Login")}>
            <AntDesign name="arrowleft" size={32} color="#34898F" />
            </ButtonIcon>
            <Logo source={require('../../assets/logo.png')}/>

            <Title>Recuperar senha</Title>

            <TextAdd>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</TextAdd>

            <Input placeholder="Usuário ou E-mail"/>

            <Button onPress={() => navigation.navigate("EmailCode")}>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </Button>
        </Container>
    )
}