import { useState } from 'react';
import { Button, ButtonIcon, IconReturn } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { Container } from '../../components/Container/Style';
import { Input } from '../../components/Input/Styled';
import { Logo } from '../../components/Logo/Style';
import { TextAdd } from '../../components/TextAdd/Style';
import { Title } from '../../components/Title/Style';
import { AntDesign } from '@expo/vector-icons';
import api from '../../service/Service';

export const Recover = ({ navigation }) => {
	const [email, setEmail] = useState("gustavopasqualettisni@gmail.com")

	async function EnviarEmail(){
		await api.post(`/RecuperarSenha?email=${email}`)
		
		.then( () => {
			navigation.replace("EmailCode", {emailRecuperacao : email})
		}).catch(error => {
			console.log(error);
		})
	}

	return (
		<Container>
			<ButtonIcon onPress={() => navigation.replace('Login')}>
				<AntDesign
					name="arrowleft"
					size={32}
					color="#34898F"
				/>
			</ButtonIcon>
			<Logo source={require('../../assets/logo.png')} />

			<Title>Recuperar senha</Title>

			<TextAdd>
				Digite abaixo seu email cadastrado que
				enviaremos um link para recuperação de senha
			</TextAdd>

			<Input 
			placeholder="Usuário ou E-mail" 
			value={email}
			onChangeText={(txt) => setEmail(txt)}
			/>

			<Button
				onPress={() => EnviarEmail()}
			>
				<ButtonTitle>CONTINUAR</ButtonTitle>
			</Button>
		</Container>
	);
};
