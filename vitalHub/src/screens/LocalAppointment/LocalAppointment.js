import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { BoxInput } from '../../components/BoxInput';
import {
	Container,
	ContentInfo,
	ContentLocal,
} from '../../components/Container/Style';
import { SubTitle, Title } from '../../components/Title/Style';
import { ContainerAddress, ContainerLocal, LocalImage } from './Style';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import api from "../../service/Service"

export const LocalAppointment = ({ route }) => {

	const [clinica, setClinica] = useState('')
	const [idClinica, setIdClinica] = useState('')
	const [logradouro, setLogradouro] = useState('')
	const [numero, setNumero] = useState('')
	const [cidade, setCidade] = useState('')
	const [nome, setNome] = useState('')
	const [latitude, setLatitude] = useState('')
	const [longitude, setLongitude] = useState('')

	useEffect(() => {
		setIdClinica(route.params)
		console.log(route.params);
		console.log("route");
			BuscarClinica(route.params)
		
	}, [route.params])

	// useEffect(() => {
		
	// }, [])

	async function BuscarClinica(clinica) {
		try {
			console.log("id da clinica:");
			console.log(idClinica);
			const response = await api.get(`/Clinica/BuscarPorId?id=${clinica}`)
			console.log(response.data);
			setClinica(response.data)
			setLatitude(response.data.endereco.longitude)
			setLongitude(response.data.endereco.latitude)
			console.log(latitude);
			console.log(longitude);

			setLogradouro(response.data.endereco.logradouro)
			setNumero(response.data.endereco.numero.toString())
			setCidade(response.data.endereco.cidade)
			setNome(response.data.nomeFantasia)
		} catch (error) {
			console.log(error);
		}
		
	}


	return (
		<Container>
			<ContentLocal>
				<MapView
					style={styles.map}
					customMapStyle={grayMapStyle}
					provider={PROVIDER_GOOGLE}
					initialRegion={{
						latitude: latitude,
						longitude: longitude,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
				>
					<Marker
						coordinate={{
							latitude: latitude,
							longitude: longitude,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}}
						title=""
						description=""
						pinColor={'red'}
					/>
				</MapView>
			</ContentLocal>
			<ContentInfo>
				<ContainerLocal>
					<Title>{nome}</Title>
					<SubTitle>{cidade}</SubTitle>
				</ContainerLocal>

				<BoxInput
					fieldWidht={80}
					textLabel="Endereco"
					placeholder={logradouro}
				/>
				<ContainerAddress>
					<BoxInput
						fieldWidht={35}
						textLabel="Número"
						placeholder={numero}
					/>

					<BoxInput
						fieldWidht={35}
						textLabel="Bairro"
						placeholder="Palmares"
					/>
				</ContainerAddress>
			</ContentInfo>
		</Container>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
		width: '100%',
		height: '60%',
	},
});

const grayMapStyle = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: '#E1E0E7',
			},
		],
	},
	{
		elementType: 'geometry.fill',
		stylers: [
			{
				saturation: -5,
			},
			{
				lightness: -5,
			},
		],
	},
	{
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#FBFBFB',
			},
		],
	},
	{
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: '#33303E',
			},
		],
	},
	{
		featureType: 'administrative',
		elementType: 'geometry',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'administrative.land_parcel',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'administrative.locality',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'poi.business',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: 'white',
			},
		],
	},
	{
		featureType: 'poi.park',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: 'white',
			},
		],
	},
	{
		featureType: 'road',
		stylers: [
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'geometry.fill',
		stylers: [
			{
				color: '#C6C5CE',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#FBFBFB',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [
			{
				color: '#ACABB7',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: '#8C8A97',
			},
		],
	},
	{
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [
			{
				color: '#8C8A97',
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: '#5DE3F5',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: '#fbfbfb',
			},
		],
	},
];
