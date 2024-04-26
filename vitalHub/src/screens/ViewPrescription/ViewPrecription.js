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

export const ViewPrescription = ({ navigation, route }) => {
	// const { photoUri } = route.params || {};
	const [isPhoto, setIsPhoto] = useState(true);
	const [photoUri, setPhotoUri] = useState(route.params);
	const [descricaoExame, setDescricaoExame] = useState('');

	function onPressPhoto() {
		navigation.navigate('CameraScreen', { isProfile: false });
		setIsPhoto(true);
	}
	async function InserirExame() {
		const formData = new FormData();
		console.log(consulta);
		formData.append('ConsultaId', route.params.consultaid);
		formData.append('Imagem', {
			uri: route.params.photoUri,
			name: `image.${route.params.photoUri.split('.').pop()}`,
			type: `image/${route.params.photoUri.split('.').pop()}`,
		});

		await api
			.post('/Exame/Cadastrar', formData, {
				headers: {
					'Content-Type': 'mulipart/form-data',
				},
			})
			.then((response) => {
				setDescricaoExame(
					descricaoExame +
						'\n' +
						response.data.descricao,
				);
			});
	}

	useEffect(() => {
		if (route.params && route.params.photoUri) {
			setPhotoUri(route.params.photoUri);

			InserirExame();
		}
	}, [route.params]);

	function onPressCancel() {
		setIsPhoto(false);
		route.params = null;
	}
	return (
		<ContainerScroll>
			<Container>
				<ContainerImage>
					<UserPicture
						source={require('../../assets/medico1.jpg')}
					/>
				</ContainerImage>

				<TitleC>Dr Claudio</TitleC>

				<ContainerSubTitle>
					<SubTitle>Cliníco geral</SubTitle>
					<SubTitle>CRM-15286</SubTitle>
				</ContainerSubTitle>

				<ContainerRecord>
					<BoxInput
						fieldWidth={80}
						textLabel={
							'Descrição da consulta'
						}
						placeholder="O paciente possuí uma infecção no
                ouvido. Necessário repouse de 2 dias
                e acompanhamento médico constante"
						multiline={true}
						fieldHeight={120}
					/>
					<BoxInput
						fieldWidth={80}
						textLabel={
							'Diagnóstico do paciente'
						}
						placeholder={
							'Infecção no ouvido'
						}
						multiline={true}
					/>
					<BoxInput
						fieldWidth={80}
						textLabel={'Prescrição médica'}
						placeholder="Medicamento: Advil
                Dosagem: 50 mg
                Frequência: 3 vezes ao dia
                Duração: 3 dias"
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
								style={{}}
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

					<InputText
						fieldWidth={80}
						fieldHeight={80}
						placeholder="Resultado do exame de sangue : tudo normal"
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
