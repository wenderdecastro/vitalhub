import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { CancelAppointment } from '../../components/Links/Style';

export default function CameraScreen({ navigation, route }) {
	const cameraRef = useRef(null);
	const [photo, setPhoto] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [facing, setFacing] = useState('back');
	const [permission, requestPermission] = useCameraPermissions();
	const [flash, setFlash] = useState('off');

	async function CapturePhoto() {
		if (cameraRef) {
			const photo =
				await cameraRef.current.takePictureAsync();
			setPhoto(photo.uri);

			setOpenModal(true);

			console.log(photo);
		}
	}

	async function ClearPhoto() {
		setPhoto(null);
		setOpenModal(false);
	}

	async function SavePhoto() {
		if (photo) {
			route.params.isProfile ?
				navigation.navigate('Profile', {
					photoUri: photo
				})
				:
				navigation.navigate('ViewPrescription', {
					...route.params.prescription,
					photoUri: photo,
				});
		}
		setOpenModal(false)
	}
	useEffect(() => {
		(async () => {
			requestPermission();
			const { status: mediaStatus } =
				await MediaLibrary.requestPermissionsAsync();
		})();
	}, []);

	const openImagePicker = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			alert('A permissão para acessar a galeria foi negada.');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setPhoto(result.assets[0].uri);
			setOpenModal(true);
		}
	};

	function toggleCameraFlash() {
		setFlash((current) => (current === 'off' ? 'on' : 'off'));
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === 'back' ? 'front' : 'back'));
	}

	if (!permission) {
		// Caso não haja permissão para usar a câmera
		return <ActivityIndicator />;
	}

	return (
		<View style={styles.container}>
			<CameraView
				ref={cameraRef}
				facing={facing}
				flash={flash}
				style={styles.camera}
			>
				<TouchableOpacity
					style={styles.btnReturn}
					onPress={() =>
						route.params.isProfile ?
							navigation.replace('Profile')
							:
							navigation.replace(
								'ViewPrescription',{...route.params.prescription,}
							)
					}
				>
					<Ionicons
						name="arrow-back-circle-sharp"
						size={60}
						color="#49B3BA"
					/>
				</TouchableOpacity>

				<View style={styles.box}>
					<View style={styles.choice}>
						<TouchableOpacity
							style={
								styles.btnGallery
							}
							onPress={
								openImagePicker
							}
						>
							<Text
								style={
									styles.txtGallery
								}
							>
								GALERIA
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={
								styles.btnPicture
							}
						>
							<Text
								style={
									styles.txtPicture
								}
							>
								TIRAR FOTO
							</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.functionsBtn}>
						<TouchableOpacity
							style={styles.btnFlip}
							onPress={
								toggleCameraFacing
							}
						>
							<FontAwesome6
								name="camera-rotate"
								size={40}
								color="#49B3BA"
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={
								styles.btnCaptura
							}
							onPress={() =>
								CapturePhoto()
							}
						>
							<FontAwesome6
								name="circle-dot"
								size={70}
								color="white"
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.btnFlash}
							onPress={
								toggleCameraFlash
							}
						>
							<Ionicons
								name={
									flash ===
										'on'
										? 'flash'
										: 'flash-off'
								}
								size={38}
								color={
									flash ===
										'on'
										? 'yellow'
										: '#49B3BA'
								}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<Modal
					animationType="slide"
					transparent={false}
					visible={openModal}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent:
								'center',
							padding: 30,
						}}
					>
						<Image
							style={{
								width: '100%',
								height: 500,
								borderRadius: 10,

							}}
							source={{ uri: photo }}
						/>

						<View
							style={{
								margin: 15,
								justifyContent:
									'center',
								alignItems: 'center',
							}}
						>
							<Button
								onPress={() =>
									SavePhoto()
								}
							>
								<ButtonTitle>
									Confirmar
								</ButtonTitle>
							</Button>

							<CancelAppointment
								onPress={() =>
									ClearPhoto()
								}
							>
								Cancelar
							</CancelAppointment>
						</View>
					</View>
				</Modal>
			</CameraView>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
		height: '80%',
		width: '100%',
	},
	btnFlip: {
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnCaptura: {
		height: 75,
		width: 75,
		borderRadius: 80,
		backgroundColor: '#49B3BA',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	functionsBtn: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 70,

		marginTop: 20,
	},
	btnFlash: {
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	box: {
		height: 160,
		width: '100%',
		position: 'absolute',
		bottom: 0,
		backgroundColor: 'rgba(200, 200, 200, 0.1)',
		filter: 'blur(50px)',
		borderRadius: 10,
	},
	btnCancel: {
		padding: 20,
		borderRadius: 15,
		backgroundColor: 'transparent',

		alignItems: 'center',
		justifyContent: 'center',
	},

	btnUpload: {
		padding: 20,
		borderRadius: 15,
		backgroundColor: 'transparent',

		alignItems: 'center',
		justifyContent: 'center',
	},
	circle: {
		backgroundColor: 'white',
		borderColor: 'white',
	},
	btnReturn: {
		marginTop: 50,
		margin: 20,
	},
	btnGallery: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	txtGallery: {
		color: 'white',
		fontSize: 14,
		fontWeight: '500',
	},
	btnPicture: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	txtPicture: {
		color: 'white',
		fontSize: 14,
		fontWeight: '500',
		textDecorationLine: 'underline',
	},
	choice: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 30,
		marginTop: 8,
	},
});
