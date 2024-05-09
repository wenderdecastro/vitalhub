import { ActivityIndicator, Text } from 'react-native';
import { Logo } from '../../components/Logo/Style';
import { Title } from '../../components/Title/Style';
import { Container, ContentAccount } from '../../components/Container/Style';
import { Input } from '../../components/Input/Styled';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { LinKCancel } from '../../components/Links/Style';
import { TextAdd } from '../../components/TextAdd/Style';
import { useState } from 'react';
import api from '../../service/Service';
import Toast from 'react-native-toast-message';

export const Account = ({ navigation }) => {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');
	const [loading, setLoading] = useState(false);

	const [novoPerfil, setNovoPerfil] = useState();

	async function Login() {
		setLoading(true);

		if (
			!email.includes('@') ||
			!email.includes('.') ||
			senha.length < 8 ||
			senha === '' ||
			email.length < 3 ||
			email === '' ||
			nome == ''
		) {
			Toast.show({
				type: 'error',
				text1: 'Preencha todos os campos corretamente.',
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

			return;
		}

		if (senha != confirmarSenha) {
			Toast.show({
				type: 'error',
				text1: 'As senhas não coincidem..',
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

			return;
		}

		try {
			await api
				.post('Usuario', { nome, email, senha })
				.then((response) =>
					setNovoPerfil(response.data),
				);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);

		if (novoPerfil) navigation.replace('Login', novoPerfil);
	}
	return (
		<Container>
			<Logo source={require('../../assets/logo.png')} />

			<Title>Criar conta</Title>

			<TextAdd>
				Insira seu endereço de e-mail e senha para
				realizar seu cadastro.
			</TextAdd>

			<Input
				value={nome}
				onChangeText={(text) => setNome(text)}
				placeholder="Nome"
			/>
			<Input
				value={email}
				onChangeText={(text) => setEmail(text)}
				placeholder="E-mail"
			/>

			<Input
				value={senha}
				onChangeText={(text) => setSenha(text)}
				placeholder="Senha"
			/>

			<Input
				value={confirmarSenha}
				onChangeText={(text) => setConfirmarSenha(text)}
				placeholder="Confirmar senha"
			/>

			<Button onPress={() => Login()}>
				<ButtonTitle>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						'CADASTRAR'
					)}
				</ButtonTitle>
			</Button>

			<ContentAccount>
				<LinKCancel
					onPress={() =>
						navigation.replace('Login')
					}
				>
					Cancelar
				</LinKCancel>
			</ContentAccount>
		</Container>
	);
};
