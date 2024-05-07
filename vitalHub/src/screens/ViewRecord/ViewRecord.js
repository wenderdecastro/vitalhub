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
		setNome(route.params.nome)
		setEmail(route.params.email)
		setFoto(route.params.foto)
		setDescricao(route.params.descricao)
		setDiagnostico(route.params.diagnostico)
		setReceita(route.params.receita)
		setIdConsulta(route.params.id)
	}, [])

	async function onPressSave() {
		updateRecord()
		setRecordEdit(true)
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
			console.log('a');
			console.log(idConsulta);
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

				{RecordEdit ? (
					<ContainerRecord2>
						<BoxInput
							placeholderTextColor={'#49B3BA'}
							fieldWidth={80}
							textLabel={'Descrição da consulta'}
							placeholder={descricao}
							multiline={true}
							RecordEdit={RecordEdit}
							fieldValue={descricao}
						/>
						<BoxInput
							fieldWidth={80}
							textLabel={'Diagnóstico do paciente'}
							placeholder={diagnostico}
							multiline={true}
							RecordEdit={RecordEdit}
							fieldValue={diagnostico}
						/>
						<BoxInput
							fieldWidth={80}
							textLabel={'Prescrição médica'}
							placeholder={receita}
							multiline={true}
							RecordEdit={RecordEdit}
							fieldValue={receita}
						/>
					</ContainerRecord2>
				) : (
					<ContainerRecord2>
						<BoxInput
							borderWidth={'2px'}
							borderColor={'transparent'}
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

				)}

				{RecordEdit ? (
					<Button2
						onPress={() =>
							setRecordEdit(
								false,
							)
						}
					>
						<ButtonTitle>
							EDITAR
						</ButtonTitle>
					</Button2>
				) : (
					<Button2
						onPress={() =>
							onPressSave()
						}
					>
						<ButtonTitle>
							SALVAR
						</ButtonTitle>
					</Button2>
				)}



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
