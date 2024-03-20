import { Button, ButtonIcon, IconClose } from "../../components/Button/Style"
import { ButtonTitle } from "../../components/ButtonTitle/Style"
import { Container, ContentVerify } from "../../components/Container/Style"
import { InputVerify } from "../../components/Input/Styled"
import { LinkResend } from "../../components/Links/Style"
import { Logo } from "../../components/Logo/Style"
import { TextAdd, TextUser, TextUserBlue } from "../../components/TextAdd/Style"
import { Title } from "../../components/Title/Style"
import { AntDesign } from '@expo/vector-icons';

export const EmailCode = ({navigation}) => {
    return (
        <Container>
            <ButtonIcon onPress={() => navigation.replace("Login")}>
            <AntDesign name="close" size={32} color="#34898F" />
            </ButtonIcon>
            
            <Logo source={require('../../assets/logo.png')} />

            <Title>Verifique seu e-mail</Title>


            <TextUser>Digite o código de 4 dígitos enviado para </TextUser>
            <TextUserBlue>username@email.com</TextUserBlue>

            <ContentVerify>

                <InputVerify 
                placeholder="0"
                placeholderTextColor='#34898F'
                keyboardType="numeric"
                maxLength={1}
                textAlign='center'
                />
                <InputVerify 
                placeholder="0"
                placeholderTextColor='#34898F'
                keyboardType="numeric"
                maxLength={1}
                textAlign='center'
                />
                <InputVerify 
                placeholder="0"
                placeholderTextColor='#34898F'
                keyboardType="numeric"
                maxLength={1}
                textAlign='center'
                />
                <InputVerify 
                placeholder="0"
                placeholderTextColor='#34898F'
                keyboardType="numeric"
                maxLength={1}
                textAlign='center'
                />

            </ContentVerify>
            
            <Button onPress={() => navigation.navigate("Reset")}>
                <ButtonTitle>ENTRAR</ButtonTitle>
            </Button>

            <LinkResend>Reenviar código</LinkResend>


        </Container>
    )
}