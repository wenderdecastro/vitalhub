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

export const ViewRecord = ({ navigation, route }) => {
	const [RecordEdit, setRecordEdit] = useState(true);
	const [nome, setNome] = useState()
	const [email, setEmail] = useState()
	const [foto, setFoto] = useState()
	const [descricao, setDescricao] = useState()
	const [diagnostico, setDiagnostico] = useState()
	const [receita, setReceita] = useState()

	useEffect(() => {
		setNome(route.params.nome)
		setEmail(route.params.email)
		setFoto(route.params.foto)
		setDescricao(route.params.descricao)
		setDiagnostico(route.params.diagnostico)
		setReceita(route.params.receita)
		console.log(route.params);
	})

	return (
		<ContainerScroll>
			{RecordEdit ? (
				<>
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
								fieldWidth={80}
								textLabel={'Descrição da consulta'}
								placeholder={descricao}
								multiline={true}
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
							/>
						</ContainerRecord2>

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
				</>
			) : (
				<>
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
								fieldWidth={80}
								textLabel={'Descrição da consulta'}
								placeholder={descricao}
								multiline={true}
								editable={true}
							/>
							<BoxInput
								fieldWidth={80}
								textLabel={'Diagnóstico do paciente'}
								placeholder={diagnostico}
								multiline={true}
								editable={true}
							/>
							<BoxInput
								fieldWidth={80}
								textLabel={'Prescrição médica'}
								placeholder={receita}
								multiline={true}
								editable={true}
							/>
						</ContainerRecord2>

						<ButtonEdit
							onPress={() =>
								setRecordEdit(
									true,
								)
							}
						>
							<ButtonTitle>
								SALVAR
							</ButtonTitle>
						</ButtonEdit>

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
				</>
			)}
		</ContainerScroll>
	);
};
