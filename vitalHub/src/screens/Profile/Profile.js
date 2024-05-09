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
import {
	Button,
	Button2,
	ButtonCamera,
	CloseButton,
} from '../../components/Button/Style';
import { useEffect, useState } from 'react';
import { CancelAppointment } from '../../components/Links/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDecodeToken } from '../../utils/Auth';
import api from '../../service/Service';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Profile = ({ navigation, route }) => {
	const [ProfileEdit, setProfileEdit] = useState(true);

	async function logout() {
		try {
			await AsyncStorage.removeItem('token');
			navigation.replace('Login');
		} catch (error) {
			console.error('Erro ao fazer logout:', error);
		}
	}

	const [token, setToken] = useState();

	const [nome, setNome] = useState();
	const [email, setEmail] = useState();
	const [idUser, setIdUser] = useState();
	const [userData, setUserData] = useState();
	const [cep, setCep] = useState();
	const [logradouro, setLogradouro] = useState();
	const [cidade, setCidade] = useState();
	const [numero, setNumero] = useState();
	const [role, setRole] = useState();
	const [cpf, setCpf] = useState();
	const [crm, setCrm] = useState();
	const [rg, setRg] = useState()
	const [dtNasc, setDtNasc] = useState();
	const [especialidade, setEspecialidade] = useState();
	const [foto, setFoto] = useState();

	async function profileLoad() {
		const token = await userDecodeToken();

		setNome(token.name);
		setEmail(token.email);
		setRole(token.role);
		setIdUser(token.jti);

		await getUser(token);
	}

	async function AlterarFotoDePerfil() {
		const formData = new FormData();
		formData.append('Arquivo', {
			uri: route.params.photoUri,
			name: `image.jpg`,
			type: `image/jpg`,
		});
		console.log(idUser);

		await api
			.put(
				`/Usuario/AlterarFotoPerfil?id=${idUser}`,
				formData,
				{
					headers: {
						'Content-Type':
							'multipart/form-data',
					},
				},
			)
			.then(() => {
				setFoto(route.params.photoUri);
				console.log(route.params.photoUri);
			})
			.catch((error) => {
				console.log('erro no atualizarFotoPerfil()');
				console.log(error);
			});
	}

	async function getUser(tok) {
		const response = await api.get(
			tok.role == 'Paciente'
				? `/Pacientes/BuscarPorId/${tok.jti}`
				: `/Medicos/BuscarPorId/${tok.jti}`,
		);
		setUserData(response.data);

		setLogradouro(response.data.endereco.logradouro);
		setCep(response.data.endereco.cep);
		setCidade(response.data.endereco.cidade);
		setNumero(response.data.endereco.numero);
		setCpf(response.data.cpf);
		setCrm(response.data.crm);
		setRg(response.data.rg)
		setDtNasc(response.data.dataNascimento);
		setFoto(response.data.idNavigation.foto);
		tok.role == 'Paciente'
			? null
			: setEspecialidade(
				response.data.especialidade
					.especialidade1,
			);
	}

	async function updatePatient() {
		const token = JSON.parse(
			await AsyncStorage.getItem('token'),
		).token;

		try {
			{
				role == 'Paciente'
					? await api.put(
						'Pacientes',
						{
							Cpf: cpf,
							DataNascimento:
								dtNasc,
							Cep: cep,
							Logradouro: logradouro,
							Cidade: cidade,
							Numero: numero,
							Foto: foto,
							Rg: rg
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					: await api.put(
						'Medicos',
						{
							Crm: crm,
							Especialidade:
								especialidade,
							Cep: cep,
							Logradouro: logradouro,
							Cidade: cidade,
							Numero: numero,
							Foto: foto,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					);
			}

			setProfileEdit(true);
		} catch (error) {
			console.log(error + ' erro para atualizar paciente');
		}
	}

	useEffect(() => {
		profileLoad();
	}, []);

	useEffect(() => {
		if (route.params != null && idUser != null) {
			AlterarFotoDePerfil();
		}
	}, [idUser, route.params]);

	function formatarData(data) {
		if (!data) return '';
		const dataFormatada = new Date(data);
		return dataFormatada.toLocaleDateString('pt-BR');
	}

	return (
		<ContainerScroll>
			<ContainerImage>
				{/* <UserPicture source={{ uri: photoUri }} /> */}
				<UserPicture source={{ uri: foto }} />
				<ButtonCamera
					onPress={() =>
						navigation.navigate(
							'CameraScreen',
							{ isProfile: true },
						)
					}
				>
					<MaterialCommunityIcons
						name="camera-plus"
						size={30}
						color="white"
					/>
				</ButtonCamera>
			</ContainerImage>

			<ContainerProfile>
				<TitleC>{nome}</TitleC>
				<TextAdd>{email}</TextAdd>

				{ProfileEdit ? (
					<>
						{role == 'Paciente' ? (
							<BoxInput
								fieldWidht={80}
								textLabel="Data de nascimento:"
								placeholder={formatarData(
									dtNasc,
								)}
								fieldHeight={60}
							/>
						) : (
							<BoxInput
								fieldWidht={80}
								textLabel="Especialidade:"
								placeholder={
									especialidade
								}
								fieldHeight={60}
							/>
						)}

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidht={80}
								textLabel="RG:"
								placeholder={rg}
								fieldHeight={60}
							/>
						)
							:
							null
						}

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidht={80}
								textLabel="CPF:"
								placeholder={
									cpf
								}
								fieldHeight={60}
							/>
						) : (
							<BoxInput
								fieldWidht={80}
								textLabel="CRM:"
								placeholder={
									crm
								}
								fieldHeight={60}
							/>
						)}

						<ContainerUF>
							<BoxInput
								fieldWidht={64}
								textLabel="Endereço"
								placeholder={
									logradouro
								}
								fieldHeight={60}
							/>

							<BoxInput
								fieldWidht={28}
								textLabel="Numero"
								placeholder={numero}
								fieldHeight={60}
							/>
						</ContainerUF>

						<ContainerUF>
							<BoxInput
								fieldWidht={46}
								textLabel="CEP"
								placeholder={
									cep
								}
								fieldHeight={60}
							/>

							<BoxInput
								fieldWidht={46}
								textLabel="Cidade"
								placeholder={
									cidade
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
					</>
				) : (
					<>

						<BoxInput 
						fieldWidht={80}
						textLabel="Nome:"
						fieldHeight={60}
						editable={true}
						onChangeText={setNome}
						/>

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidht={80}
								textLabel="Data de nascimento:"
								fieldHeight={60}
								editable={true}
								onChangeText={
									setDtNasc
								}
							/>
						) : (
							<BoxInput
								fieldWidht={80}
								textLabel="Especialidade:"
								placeholder={
									especialidade
								}
								fieldHeight={60}
							/>
						)}

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidht={80}
								textLabel="RG:"
								fieldHeight={60}
								editable={true}
								onChangeText={setRg}
							/>
						)
							:
							null
						}

						{role == 'Paciente' ? (
							<BoxInput
								fieldWidht={80}
								textLabel="CPF:"
								editable={true}
								fieldHeight={60}
								onChangeText={
									setCpf
								}
							/>
						) : (
							<BoxInput
								fieldWidht={80}
								textLabel="CRM:"
								editable={true}
								fieldHeight={60}
								onChangeText={
									setCrm
								}
							/>
						)}

						<ContainerUF>
							<BoxInput
								fieldWidht={64}
								textLabel="Endereço"
								fieldHeight={60}
								editable={true}
								onChangeText={
									setLogradouro
								}
							/>

							<BoxInput
								fieldWidht={28}
								textLabel="Numero"
								fieldHeight={60}
								editable={true}
								onChangeText={
									setNumero
								}
							/>
						</ContainerUF>

						<ContainerUF>
							<BoxInput
								fieldWidht={46}
								textLabel="CEP"
								editable={true}
								fieldHeight={60}
								onChangeText={
									setCep
								}
							/>

							<BoxInput
								fieldWidht={46}
								textLabel="Cidade"
								editable={true}
								fieldHeight={60}
								onChangeText={
									setCidade
								}
							/>
						</ContainerUF>

						<Button
							onPress={() =>
								updatePatient()
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
					</>
				)}
			</ContainerProfile>
		</ContainerScroll>
	);
};
