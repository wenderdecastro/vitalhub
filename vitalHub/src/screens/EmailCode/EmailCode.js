import { useEffect, useRef, useState } from 'react';
import { Button, ButtonIcon, IconClose } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { Container, ContentVerify } from '../../components/Container/Style';
import { InputVerify } from '../../components/Input/Styled';
import { LinkResend } from '../../components/Links/Style';
import { Logo } from '../../components/Logo/Style';
import api from '../../service/Service';
import {
	TextAdd,
	TextUser,
	TextUserBlue,
} from '../../components/TextAdd/Style';
import { Title } from '../../components/Title/Style';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { ActivityIndicator } from 'react-native';

export const EmailCode = ({ navigation, route }) => {
	const [codigo, setCodigo] = useState('0000');
	const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
	const [email, setEmail] = useState();
	const [loading, setLoading] = useState(false);

	function focusNextInput(index) {
		if (index < inputs.length - 1) {
			inputs[index + 1].current.focus();
		}
	}

	function focusPrevInput(index) {
		if (index > 0) {
			inputs[index - 1].current.focus();
		}
	}

	async function ValidarCodigo() {
		setLoading(true);

		setEmail(route.params.emailRecuperacao);

		await api
			.post(
				`/RecuperarSenha/ValidarCodigoRecuperacao?email=${email}&codigo=${codigo}`,
			)
			.then(() => {
				navigation.replace('Reset', {
					emailRecuperacao: email,
				});
				console.log(codigo);
			})
			.catch((error) => {
				console.log(error);
				console.log(codigo);
				Toast.show({
					type: 'error',
					text1: 'Código inválido.',
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

			<Title>Verifique seu e-mail</Title>

			<TextUser>
				Digite o código de 4 dígitos enviado para{' '}
			</TextUser>
			<TextUserBlue>
				{route.params.emailRecuperacao}
			</TextUserBlue>

			<ContentVerify>
				{[0, 1, 2, 3].map((index) => (
					<InputVerify
						key={index}
						ref={inputs[index]}
						placeholder="0"
						placeholderTextColor="#34898F"
						keyboardType="numeric"
						maxLength={1}
						textAlign="center"
						caretHidden={true}
						onChangeText={(text) => {
							if (text === '') {
								focusPrevInput(
									index,
								);
							} else {
								const novoCodigo =
									[
										...codigo,
									];
								novoCodigo[
									index
								] = text;
								setCodigo(
									novoCodigo.join(
										'',
									),
								);

								focusNextInput(
									index,
								);
							}
						}}
					/>
				))}
			</ContentVerify>

			<Button onPress={() => ValidarCodigo()}>
				<ButtonTitle>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						'ENVIAR'
					)}
				</ButtonTitle>
			</Button>

			<LinkResend>Reenviar código</LinkResend>
		</Container>
	);
};
