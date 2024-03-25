import { Text, View } from 'react-native';
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
<<<<<<< HEAD
import { useState } from 'react';
import { api } from '../../services/ApiService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import { useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

import api from "../../service/Service"
>>>>>>> 9abfd2ebd3b276f6128dd060c3f83c3ea23fad31

export const login = ({ navigation }) => {
	const [email, setEmail] = useState(
		'barbarareginaporto@locare-eventos.com.br',
	);
	const [senha, setSenha] = useState('12345');

<<<<<<< HEAD
	async function Login() {
		const response = await api.post('/Login', {
			email: email,
			senha: senha,
		});
		await AsyncStorage.setItem(
			'token',
			JSON.stringify(response.data),
		);
	}
=======
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function Login() {
        const response = await api.post('/Login', {
            email : email,
            senha : senha
        })

        await AsyncStorage.setItem('token', JSON.stringify(response.data))
        
       navigation.replace("Main")
        console.log(email);
        console.log(senha);
        
    }
>>>>>>> 9abfd2ebd3b276f6128dd060c3f83c3ea23fad31

	return (
		<Container>
			<Logo source={require('../../assets/logo.png')} />

			<Title>Entrar ou criar conta</Title>

<<<<<<< HEAD
			<Input
				placeholder="Usuário ou E-mail"
				value={email}
				onChangeText={(txt) => setEmail(txt)}
			/>

			<Input
				placeholder="Usuário ou E-mail"
				value={senha}
				onChangeText={(txt) => setSenha(txt)}
			/>
=======
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
>>>>>>> 9abfd2ebd3b276f6128dd060c3f83c3ea23fad31

			<LinkMedium
				onPress={() => navigation.navigate('Recover')}
			>
				Esqueceu sua senha?
			</LinkMedium>

			<Button onPress={() => Login()}>
				<ButtonTitle>ENTRAR</ButtonTitle>
			</Button>

<<<<<<< HEAD
			<ButtonGoogle
				onPress={() => navigation.navigate('Home')}
			>
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
=======
            <ButtonGoogle >
                <LogoGoogle>
                    <AntDesign name="google" size={20} color="#496BBA" />
                </LogoGoogle>
                <ButtonTitleGoogle>ENTRAR COM GOOGLE</ButtonTitleGoogle>
            </ButtonGoogle>
>>>>>>> 9abfd2ebd3b276f6128dd060c3f83c3ea23fad31

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
