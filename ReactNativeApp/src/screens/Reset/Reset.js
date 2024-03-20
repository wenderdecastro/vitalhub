import { Button, ButtonIcon, IconClose } from "../../components/Button/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/Styled"
import { Logo } from "../../components/Logo/Style"
import { TextAdd } from "../../components/TextAdd/Style"
import { Title } from "../../components/Title/Style"
import { AntDesign } from '@expo/vector-icons';


export const Reset = ({navigation}) => {
    return (
        <Container>
            <ButtonIcon onPress={() => navigation.replace("Login")}>
            <AntDesign name="close" size={32} color="#34898F" />
            </ButtonIcon>

            <Logo source={require('../../assets/logo.png')} />

            <Title>Redefinir senha</Title>

            <TextAdd>Insira e confirme a sua nova senha</TextAdd>

            <Input placeholder="Nova senha" secureTextEntry='true' 
            />

            <Input placeholder="Confirmar nova senha" secureTextEntry='true'
            />

            <Button onPress={() => navigation.replace("Login")}>
                <ButtonTitle>
                    Confirmar nova senha
                </ButtonTitle>
            </Button>

        </Container>
    )
}
