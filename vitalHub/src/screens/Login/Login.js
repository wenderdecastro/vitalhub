import { Container, ContentAccount } from '../../components/Container/Style';
import { Logo, LogoGoogle } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Input } from '../../components/Input/Styled';
import { LinkAccount, LinkMedium } from '../../components/Links/Style';
import { Button, ButtonGoogle } from '../../components/Button/Style';
import {
	ButtonTitle,
	ButtonTitleGoogle,
} from '../../components/ButtonTitle/Style';
import { TextAccount } from '../../components/TextAdd/Style';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../service/Service';
import { ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState('marcos@gmail.com');
	const [senha, setSenha] = useState('marcos');
	const [loading, setLoading] = useState(false);

	async function LoginFunc() {
		if (email === '' || senha === '') {
			Toast.show({
				type: 'error',
				text1: 'Preencha todos os campos.',
				text2: 'Erro',
				text1Style: {
					fontSize: 16,
					fontWeight: 600,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
				text2Style: {
					fontSize: 16,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
			});
			return;
		}
		try {
			const response = await api.post('/Login', {
				email: email,
				senha: senha,
			});
			console.log(response);

			setLoading(true);

			await AsyncStorage.setItem(
				'token',
				JSON.stringify(response.data),
			);

			setTimeout(() => {
				setLoading(false);
				navigation.replace('Main');
			}, 2000);
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Email ou senha inválidos.',
				text2: 'Erro',
				text1Style: {
					fontSize: 16,
					fontWeight: 600,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
				text2Style: {
					fontSize: 16,
					fontFamily: 'MontserratAlternates_600SemiBold',
				},
			});
			setLoading(false);
			console.error('Erro ao buscar dados de Login', error);
			return;
		}
	}

	return (
		<Container>
			<Logo source={require('../../assets/logo.png')} />

			<Title>Entrar ou criar conta</Title>

			<Input
				placeholder="Usuário ou E-mail"
				value={email}
				onChangeText={(email) => setEmail(email)}
			/>

			<Input
				placeholder="Senha"
				secureTextEntry={true}
				value={senha}
				onChangeText={(senha) => setSenha(senha)}
			/>

			<LinkMedium
				onPress={() => navigation.navigate('Recover')}
			>
				Esqueceu sua senha?
			</LinkMedium>

			<Button onPress={() => LoginFunc()} disabled={loading}>
				<ButtonTitle>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						'ENTRAR'
					)}
				</ButtonTitle>
			</Button>

			<ButtonGoogle>
				<LogoGoogle>
					<AntDesign
						name="google"
						size={20}
						color="#496BBA"
					/>
				</LogoGoogle>
				<ButtonTitleGoogle>
					ENTRAR COM GOOGLE
				</ButtonTitleGoogle>
			</ButtonGoogle>

			<ContentAccount>
				<TextAccount>Não tem conta? </TextAccount>
				<LinkAccount
					onPress={() =>
						navigation.navigate('Account')
					}
				>
					Crie uma conta agora!
				</LinkAccount>
			</ContentAccount>
		</Container>
	);
};
