import { StatusBar } from 'expo-status-bar';
import { Container, ContainerImage, ContainerRecord, ContainerScroll } from '../../components/Container/Style';
import { UserPicture } from '../../components/UserPicture/Style';
import { BoxInput } from '../../components/BoxInput';
import { Button, Button2 } from '../../components/Button/Style';
import { ButtonTitle } from '../../components/ButtonTitle/Style';
import { useEffect, useState } from 'react';
import { ButtonEdit, ContainerRecord2 } from './Style';
import { TitleC } from '../../components/Title/Style';
import { TextAdd } from '../../components/TextAdd/Style';
import { CancelAppointment, LinkResend } from '../../components/Links/Style';
import api from '../../service/Service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ViewRecord = ({ navigation, route }) => {
	const [RecordEdit, setRecordEdit] = useState(true);
	const [nome, setNome] = useState()
	const [email, setEmail] = useState()
	const [foto, setFoto] = useState()
	const [descricao, setDescricao] = useState()
	const [diagnostico, setDiagnostico] = useState()
	const [receita, setReceita] = useState()
	const [idConsulta, setIdConsulta] = useState()

	useEffect(() => {
		console.log(route.params);
		console.log(route.params.appointmentData);
		setNome(route.params.nome)
		setEmail(route.params.email)
		setFoto(route.params.foto)
		setDescricao(route.params.descricao)
		setDiagnostico(route.params.diagnostico)
		setReceita(route.params.receita)
		setIdConsulta(route.params.id)
	}, [])

	async function ConsultaRealizada(){
		try {
			console.log(idConsulta);
			await api.put(`/Consultas/Status?idConsulta=${idConsulta}&status=Realizada`)
		} catch (error) {
			console.log(error);
		}
	}

	async function onPressSave() {
		updateRecord()
		ConsultaRealizada()
		navigation.replace('Main')
	}

	async function updateRecord() {
		try {
			await api.put('/Consultas/Prontuario',
				{
					consultaId: idConsulta,
					medicamento: receita,
					descricao: descricao,
					diagnostico: diagnostico
				})
		} catch (error) {
			console.log(error + 'erro ao atualizar prontuario');
		}
	}

	return (
		<ContainerScroll>

			<Container>
				<ContainerImage>
					<UserPicture
						source={{
							uri: foto
						}}
					/>
				</ContainerImage>

				<TitleC>{nome}</TitleC>
				<TextAdd>
					{email}
				</TextAdd>

				<ContainerRecord2>
					<BoxInput
						RecordEdit={RecordEdit}
						borderWidth={'2px'}
						fieldWidth={80}
						textLabel={'Descrição da consulta'}
						placeholder={descricao}
						multiline={true}
						editable={true}
						onChangeText={
							setDescricao
						}
					/>
					<BoxInput
						RecordEdit={RecordEdit}
						borderWidth={'2px'}
						borderColor={'transparent'}
						fieldWidth={80}
						textLabel={'Diagnóstico do paciente'}
						placeholder={diagnostico}
						multiline={true}
						editable={true}
						onChangeText={
							setDiagnostico
						}
					/>
					<BoxInput
						RecordEdit={RecordEdit}
						borderWidth={'2px'}
						borderColor={'transparent'}
						fieldWidth={80}
						textLabel={'Prescrição médica'}
						placeholder={receita}
						multiline={true}
						editable={true}
						onChangeText={
							setReceita
						}
					/>
				</ContainerRecord2>

				<Button2
					onPress={() =>
						onPressSave()
					}
				>
					<ButtonTitle>
						SALVAR
					</ButtonTitle>
				</Button2>



				<CancelAppointment
					onPress={() =>
						navigation.replace(
							'Main',
						)
					}
				>
					Voltar
				</CancelAppointment>
			</Container>
		</ContainerScroll>
	);
};
