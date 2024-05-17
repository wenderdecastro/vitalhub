import { ContainerHeader } from '../Container/Style';
import { NotiIcon } from '../Logo/Style';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefaulte } from './style';
import { Ionicons } from '@expo/vector-icons';
import { userDecodeToken } from '../../utils/Auth';
import { useEffect, useState } from 'react';
import api from '../../service/Service';

export const Header = ({ ProfileImage, navigation }) => {
	const [nome, setNome] = useState();
	const [photo, setPhoto] = useState()

	async function profileLoad() {
		const token = await userDecodeToken();

		setNome(token.name);

		if (photo == null) {
			await GetUser(token.jti)
		}
	}

	useEffect(() => {
		profileLoad();
	}, []);

	async function GetUser(id) {
		try {
			const response = await api.get(`/Usuario/BuscarPorId?id=${id}`)
			setPhoto(response.data.foto)
		} catch (error) {
			console.log(error + 'erro buscar usuario');
		}
	}

	return (
		<ContainerHeader>
			<BoxUser onPress={() => navigation.replace('Profile')}>
				<ImageUser source={{ uri: photo }} />
				<DataUser>
					<TextDefaulte>Bem vindo</TextDefaulte>
					<NameUser>{nome}</NameUser>
				</DataUser>
			</BoxUser>

			<NotiIcon>
				<Ionicons
					name="notifications"
					size={26}
					color="white"
				/>
			</NotiIcon>
		</ContainerHeader>
	);
};
