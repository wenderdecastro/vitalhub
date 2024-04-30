import { Image } from 'react-native';
import { BoxImage } from '../../components/BoxImage/BoxImage';
import { BoxInput } from '../../components/BoxInput';
import { InputText } from '../../components/BoxInput/style';
import { Button } from '../../components/Button/Style';
import {
	Container,
	ContainerImage,
	ContainerProfile,
	ContainerRecord,
	ContainerScroll,
} from '../../components/Container/Style';
import { CancelAppointment } from '../../components/Links/Style';
import { SubTitle, TitleC } from '../../components/Title/Style';
import { UserPicture } from '../../components/UserPicture/Style';
import {
	BoxPhoto,
	BoxPrescription,
	ButtonCancel,
	ButtonUpload,
	ContainerPrescription,
	ContainerSubTitle,
	ContentUpload,
	Line,
	PrescriptionImage,
	TextBox,
	TextBox2,
	TextCancel,
	TitleBox,
} from './Style';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { userDecodeToken } from '../../utils/Auth';
import api from '../../service/Service';

export const ViewPrescription = ({ navigation, route }) => {
	const [photoUri, setPhotoUri] = useState();
	const [isPhoto, setIsPhoto] = useState(true);
	const [descricaoExame, setDescricaoExame] = useState();
	const [consultaId, setConsultaId] = useState()
	const [nome, setNome] = useState()
	const [crm, setCrm] = useState()
	const [especialidade, setEspecialidade] = useState()
	const [foto, setFoto] = useState()
	const [diagnostico, setDiagnostico] = useState()
	const [descricao, setDescricao] = useState()
	const [receita, setReceita] = useState()

	function onPressPhoto() {
		navigation.navigate('CameraScreen', {
			isProfile: false,
			foto: foto,
			consultaId: consultaId,
			nome: nome,
			crm: crm,
			especialidade: especialidade,
			diagnostico: diagnostico,
			descricao: descricao,
			receita: receita
		}
		);
	}

	function onPressCancel() {
		setIsPhoto(false);
		if (photoUri != '') {
			route.params.photoUri = '';
		}
	}

	async function InserirExame() {
		const formData = new FormData();
		console.log('id consulta:');
		console.log(consultaId);
		formData.append('ConsultaId', consultaId);
		formData.append('Imagem', {
			uri: photoUri,
			name: `image.${photoUri.split('.').pop()}`,
			type: `image/${photoUri.split('.').pop()}`,
		});

		await api
			.post('/Exame/Cadastrar', formData, {
				headers: {
					'Content-Type': 'mulipart/form-data',
				},
			})
			.then((response) => {
				setDescricaoExame(
					setDescricaoExame(descricaoExame + "\n" + response.data.descricao)
				);
			});
	}

	async function GetExame() {
		try {
			console.log('getExame');
			const response = await api.get(`/Exame/BuscarPorIdConsulta?idConsulta=${consultaId}`)
			setDescricaoExame(response.data[0].descricao)
			console.log('descricao:');
			console.log(descricaoExame);

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		setFoto(route.params.foto);
		setConsultaId(route.params.consultaId)
		setNome(route.params.nome)
		setCrm(route.params.crm)
		setEspecialidade(route.params.especialidade)
		setDiagnostico(route.params.diagnostico)
		setDescricao(route.params.descricao)
		setPhotoUri(route.params.photoUri)
	}, [route.params]);


	useEffect(() => {
		if (photoUri != null) {
			InserirExame();
		}
	}, [photoUri])

	useEffect(() => {
        if (consultaId) {
            GetExame()
        }
    }, [consultaId])

	return (
		<ContainerScroll>
			<Container>
				<ContainerImage>
					<UserPicture
						source={{ uri: foto }}
					/>
				</ContainerImage>

				<TitleC>{nome}</TitleC>

				<ContainerSubTitle>
					<SubTitle>{especialidade}</SubTitle>
					<SubTitle>{crm}</SubTitle>
				</ContainerSubTitle>

				<ContainerRecord>
					<BoxInput
						fieldWidth={80}
						textLabel={'Descrição da consulta'}
						placeholder={descricao}
						multiline={true}
						fieldHeight={120}
					/>
					<BoxInput
						fieldWidth={80}
						textLabel={'Diagnóstico do paciente'}
						placeholder={diagnostico}
						multiline={true}
					/>
					<BoxInput
						fieldWidth={80}
						textLabel={'Prescrição médica'}
						placeholder={receita}
						multiline={true}
						fieldHeight={120}
					/>

					<TitleBox>Exames médicos</TitleBox>

					{photoUri && isPhoto ? (
						<BoxPhoto>
							<PrescriptionImage
								source={{
									uri: photoUri,
								}}
							/>
						</BoxPhoto>
					) : (
						<BoxPrescription>
							<AntDesign
								name="upload"
								size={20}
								color="#4E4B59"
							/>
							<TextBox>
								Nenhuma foto
								informada
							</TextBox>
						</BoxPrescription>
					)}

					<ContentUpload>
						<ButtonUpload
							onPress={() => {
								onPressPhoto();
							}}
						>
							<MaterialCommunityIcons
								name="camera-plus-outline"
								size={22}
								color="white"
							/>
							<TextBox2>
								Enviar
							</TextBox2>
						</ButtonUpload>
						<ButtonCancel
							onPress={() => {
								onPressCancel();
							}}
						>
							<TextCancel>
								Cancelar
							</TextCancel>
						</ButtonCancel>
					</ContentUpload>

					<Line />

					<BoxInput
						fieldWidth={80}
						fieldHeight={80}
						textLabel={'descicao exame'}
						placeholder={descricaoExame}
						multiline={true}
					/>
				</ContainerRecord>

				<CancelAppointment
					onPress={() =>
						navigation.replace('Main')
					}
				>
					Voltar
				</CancelAppointment>
			</Container>
		</ContainerScroll>
	);
};
