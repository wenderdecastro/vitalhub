import { Text } from "react-native"
import { Logo } from "../../components/Logo/Style"
import { Title } from "../../components/Title/Style"
import { Container, ContentAccount } from "../../components/Container/Style"
import { Input } from "../../components/Input/Styled"
import { Button } from "../../components/Button/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { LinKCancel } from "../../components/Links/Style"
import { TextAdd } from "../../components/TextAdd/Style"


export const Account = ({navigation}) => {
    return (
        <Container>
            <Logo source={require('../../assets/logo.png')}/>

            <Title>Criar conta</Title>

            <TextAdd>Insira seu endereço de e-mail e senha para realizar seu cadastro.</TextAdd>


            <Input placeholder="Usuário ou E-mail"/>

            <Input placeholder="Senha" secureTextEntry='true'
            />

            <Input placeholder="Confirmar senha" secureTextEntry='true'
            />

            <Button onPress={() => navigation.replace("Login")}>
                <ButtonTitle>CADASTRAR</ButtonTitle>
            </Button>

            <ContentAccount>
                <LinKCancel 
            onPress={() => navigation.replace("Login")} >Cancelar</LinKCancel>
            </ContentAccount>

        </Container>
    )
}