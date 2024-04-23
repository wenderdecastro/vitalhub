import { BoxInput } from '../../components/BoxInput';
import {
	ContainerImage,
	ContainerProfile,
	ContainerScroll,
	ContainerUF,
} from '../../components/Container/Style';
import { TextAdd } from '../../components/TextAdd/Style';
import { Title, TitleC } from '../../components/Title/Style';
import { UserPicture } from '../../components/UserPicture/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { Button, Button2, CloseButton } from '../../components/Button/Style';
import { useEffect, useState } from 'react';
import { CancelAppointment } from '../../components/Links/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDecodeToken } from '../../utils/Auth';
import api from '../../service/Service';
import { Text } from 'react-native';

export const Profile = ({ navigation }) => {
	const [ProfileEdit, setProfileEdit] = useState(true);

	async function logout() {
		try {
			await AsyncStorage.removeItem('token');
			navigation.replace('Login');
		} catch (error) {
			console.error('Erro ao fazer logout:', error);
		}
	}

	const [nome, setNome] = useState();
	const [email, setEmail] = useState();
	const [idUser, setIdUser] = useState();
	const [userData, setUserData] = useState();
	const [cep, setCep] = useState();
	const [logradouro, setLogradouro] = useState();
	const [role, setRole] = useState();
	const [cpf, setCpf] = useState();
	const [crm, setCrm] = useState();
	const [dtNasc, setDtNasc] = useState();
	const [especialidade, setEspecialidade] = useState();

	async function profileLoad() {
		const token = await userDecodeToken();

		console.log(token);

		setNome(token.name);
		setEmail(token.email);
		setRole(token.role);
		setIdUser(token.jti);

		await getUser();
	}

	async function getUser() {
		const response = await api.get(
			role == 'Paciente'
				? `/Pacientes/BuscarPorId/${idUser}`
				: `/Medicos/BuscarPorId/${idUser}`,
		);
		setUserData(response.data);
		console.log(response.data);

		setLogradouro(response.data.endereco.logradouro);
		setCep(response.data.endereco.cep);
		setCpf(response.data.cpf);
		setCrm(response.data.crm);
		setDtNasc(response.data.dataNascimento);
		setEspecialidade(response.data.especialidade.especialidade1);
	}

	useEffect(() => {
		profileLoad();
	}, []);

	useEffect(() => {
		if (idUser) {
			getUser();
		}
	}, [idUser]);

	function formatarData(data) {
		if (!data) return '';
		const dataFormatada = new Date(data);
		return dataFormatada.toLocaleDateString('pt-BR');
	}

	return (
		<ContainerScroll>
			{ProfileEdit ? (
				<>
					<ContainerImage>
						<UserPicture
							source={require('../../assets/perfil.jpg')}
						/>
					</ContainerImage>

					<ContainerProfile>
						<TitleC>{nome}</TitleC>
						<TextAdd>{email}</TextAdd>

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidth={80}
								textLabel="Data de nascimento:"
								placeholder={formatarData(
									dtNasc,
								)}
								fieldHeight={60}
							/>
						) : (
							<BoxInput
								fieldWidth={80}
								textLabel="Especialidade:"
								placeholder={
									especialidade
								}
								fieldHeight={60}
							/>
						)}

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidth={80}
								textLabel="CPF:"
								placeholder={
									cpf
								}
								fieldHeight={60}
							/>
						) : (
							<BoxInput
								fieldWidth={80}
								textLabel="CRM:"
								placeholder={
									crm
								}
								fieldHeight={60}
							/>
						)}

						<BoxInput
							fieldWidth={80}
							textLabel="Endereço"
							placeholder={logradouro}
							fieldHeight={60}
						/>

						<ContainerUF>
							<BoxInput
								fieldWidth={100}
								textLabel="CEP"
								placeholder={
									cep
								}
								fieldHeight={60}
							/>
						</ContainerUF>

						<Button2
							onPress={() =>
								setProfileEdit(
									false,
								)
							}
						>
							<ButtonTitle>
								EDITAR
							</ButtonTitle>
						</Button2>

						<CloseButton
							onPress={() => logout()}
						>
							<ButtonTitle>
								SAIR DO APP
							</ButtonTitle>
						</CloseButton>

						<CancelAppointment
							onPress={() =>
								navigation.replace(
									'Main',
								)
							}
						>
							Voltar
						</CancelAppointment>
					</ContainerProfile>
				</>
			) : (
				<>
					<UserPicture
						source={require('../../assets/perfil.jpg')}
					/>
					<ContainerProfile>
						<TitleC>{nome}</TitleC>
						<TextAdd>{email}</TextAdd>

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidth={80}
								textLabel="Data de nascimento:"
								fieldHeight={60}
								editable={true}
							/>
						) : (
							<BoxInput
								fieldWidth={80}
								textLabel="Especialidade:"
								editable={true}
								fieldHeight={60}
							/>
						)}

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidth={80}
								textLabel="CPF:"
								editable={true}
								fieldHeight={60}
							/>
						) : (
							<BoxInput
								fieldWidth={80}
								textLabel="CRM:"
								editable={true}
								fieldHeight={60}
							/>
						)}

						<BoxInput
							fieldWidth={80}
							textLabel="Endereço"
							editable={true}
							fieldHeight={60}
						/>

						<ContainerUF>
							<BoxInput
								fieldWidth={100}
								textLabel="CEP"
								editable={true}
								fieldHeight={60}
							/>
						</ContainerUF>

						<Button
							onPress={() =>
								setProfileEdit(
									true,
								)
							}
						>
							<ButtonTitle>
								SALVAR
							</ButtonTitle>
						</Button>

						<CancelAppointment
							onPress={() =>
								setProfileEdit(
									true,
								)
							}
						>
							Voltar
						</CancelAppointment>
					</ContainerProfile>
				</>
			)}
		</ContainerScroll>
	);
};
