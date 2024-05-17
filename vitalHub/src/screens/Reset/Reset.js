import { useState } from 'react';
import { Button, ButtonIcon, IconClose } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { Container } from '../../components/Container/Style';
import { Input } from '../../components/Input/Styled';
import { Logo } from '../../components/Logo/Style';
import { TextAdd } from '../../components/TextAdd/Style';
import { Title } from '../../components/Title/Style';
import { AntDesign } from '@expo/vector-icons';
import api from '../../service/Service';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';

export const Reset = ({ navigation, route }) => {
	const [senha, setSenha] = useState();
	const [loading, setLoading] = useState(false);

	const [confirmar, setConfirmar] = useState();

	async function AtualizarSenha() {
		setLoading(true);
		if (senha.length < 8) {
			Toast.show({
				type: 'error',
				text1: 'A senha deve conter no mínimo 8 caracteres.',
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
		if (senha === confirmar) {
			await api
				.put(
					`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`,
					{
						senhaNova: senha,
					},
				)
				.then(() => {
					navigation.replace('Login');
				})
				.catch((error) => {
					console.log(error);
					Toast.show({
						type: 'error',
						text1: 'Não foi possível redefinir a senha, tente novamente mais tarde.',
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
				});
		}
		setLoading(false);
	}

	return (
		<Container>
			<ButtonIcon onPress={() => navigation.replace('Login')}>
				<AntDesign
					name="close"
					size={32}
					color="#34898F"
				/>
			</ButtonIcon>

			<Logo source={require('../../assets/logo.png')} />

			<Title>Redefinir senha</Title>

			<TextAdd>Insira e confirme a sua nova senha</TextAdd>

			<Input
				placeholder="Nova senha"
				value={senha}
				onChangeText={(txt) => setSenha(txt)}
			/>

			<Input
				placeholder="Confirmar nova senha"
				value={confirmar}
				onChangeText={(txt) => setConfirmar(txt)}
			/>

			<Button onPress={() => AtualizarSenha()}>
				<ButtonTitle>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						'ENTRAR'
					)}
				</ButtonTitle>
			</Button>
		</Container>
	);
};
