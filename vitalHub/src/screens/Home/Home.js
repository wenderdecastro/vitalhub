import { StatusBar } from "expo-status-bar"
import { Container } from "../../components/Container/Style"
import { Header } from "../../components/Header/Header"
import { CalendarHome } from "../../components/CalendarHome/CalendarHome"
import { useState } from "react"
import { ButtonTabs } from "../../components/ButtonTabs/ButtonTabs"
import { ContainerAppointment } from "./Style"
import { AppointmentCard, QueryCard } from "../../components/AppointmentCard/QueryCard"
import { ListComponent } from "../../components/List/List"
import { CancelModal } from "../../components/CancelModal/CancelModal"
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal"
import { MakeAppointment } from "../../components/Button/Style"
import { FontAwesome } from '@expo/vector-icons';
import { ScheduleModal } from "../../components/ScheduleModal/SchedyleModal"
import { LocalModal } from "../../components/LocalModal/LocalModal"

const Consultas = [
    { id: 1, nome: "gustavo", age: 18, hour: '14:00', reason: 'Rotina', situacao: "pendente", imagem: { uri: ('https://github.com/GustavoPasqualetti.png') }, email: "gustavopasqualetti@gmail.com" },
    { id: 2, nome: "Joao Vitor", age: 20, hour: '15:00', reason: 'Rotina', situacao: "realizada", imagem: { uri: ("https://github.com/zAlves31.png") }, email: "joaovitoralves@gmail.com" },
    { id: 3, nome: "eduardo", age: 18, hour: '16:00', reason: 'Rotina', situacao: "cancelada", imagem: { uri: ('https://github.com/EduardoPasqualetti.png') }, email: "eduardopasqualetti@gmail.com" },
]

const ConsultasUser = [
    { id: 1, nome: "DrClaudio", crm: "13456", especialidade: "Clinico Geral", age: 52, hour: '10:00', reason: 'Rotina', situacao: "pendente", imagem: require("../../assets/medico1.jpg") },
    { id: 2, nome: "DrCesar", crm: "12690", especialidade: "Ortopedista", age: 35, hour: '14:00', reason: 'Rotina', situacao: "realizada", imagem: require("../../assets/medico2.jpg") },
    { id: 3, nome: "DrMarcio", crm: "26647", especialidade: "Cardiologista", age: 43, hour: '17:00', reason: 'Rotina', situacao: "cancelada", imagem: require("../../assets/medico3.webp") },
    { id: 4, nome: "DrAndre", crm: "21589", especialidade: "Clinico Geral", age: 52, hour: '10:00', reason: 'Rotina', situacao: "pendente", imagem: require("../../assets/medico4.jpg") }
]


export const Home = ({ navigation }) => {

    const [statusList, setStatusList] = useState("pendente")

    const [showModalCancel, setShowModalCancel] = useState(false)

    const [showModalAppointment, setShowModalAppointment] = useState(false)

    const [selectedAppointment, setSelectedAppointment] = useState(null);


    const [showModalSchedule, setShowModalSchedule] = useState(false)

    const [showModalLocal, setShowModalLocal] = useState(false)

    const [userLogin, setUserLogin] = useState("paciente")

    return (
        userLogin == "medico" ? <Container>
            <StatusBar />

            <Header
                name={"Dr Claudio"}
                ProfileImage={require("../../assets/medico1.jpg")}
                navigation={navigation}
            />

            <CalendarHome />

            <ContainerAppointment>

                <ButtonTabs
                    textButton={'Pendentes'}
                    clickButton={statusList === 'pendente'}
                    onPress={() => setStatusList('pendente')}
                />

                <ButtonTabs
                    textButton={'Realizadas'}
                    clickButton={statusList === 'realizada'}
                    onPress={() => setStatusList('realizada')}
                />

                <ButtonTabs
                    textButton={'Canceladas'}
                    clickButton={statusList === 'cancelada'}
                    onPress={() => setStatusList('cancelada')}
                />

            </ContainerAppointment>

            
            <ListComponent
                data={Consultas}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => {
                    if (statusList === 'pendente' && item.situacao === 'pendente') {
                        return (
                            <AppointmentCard
                                situacao={item.situacao}
                                onPressCancel={() => setShowModalCancel(true)}
                                name={item.nome}
                                especialidade={item.especialidade}
                                imagem={item.imagem}
                                crm={item.crm}
                                age={item.age}
                                reason={item.reason}
                                hour={item.hour}
                            />
                        );
                    } if (statusList === 'realizada' && item.situacao === 'realizada') {
                        return (
                            <AppointmentCard
                                situacao={item.situacao}
                                onPressLocal={() => {
                                    setSelectedAppointment(item);
                                    setShowModalAppointment(true);
                                }}
                                onPressAppointment={() => navigation.navigate("ViewPrescription")}
                                name={item.nome}
                                especialidade={item.especialidade}
                                imagem={item.imagem}
                                crm={item.crm}
                                age={item.age}
                                reason={item.reason}
                                hour={item.hour}
                            />
                        );
                    } if (statusList === 'cancelada' && item.situacao === 'cancelada') {
                        return (
                            <AppointmentCard
                                situacao={item.situacao}
                                name={item.nome}
                                especialidade={item.especialidade}
                                imagem={item.imagem}
                                crm={item.crm}
                                age={item.age}
                                reason={item.reason}
                                hour={item.hour}
                            />
                        );
                    }
                }

                }
            />


            <CancelModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />
            <AppointmentModal
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
                appointmentData={selectedAppointment}
                navigation={navigation}
            />
        </Container> 
        
        : 

        <Container>
            <Header name={"Gustavo"}
                ProfileImage={{ uri: ('https://github.com/GustavoPasqualetti.png') }}
                navigation={navigation}
            />

            <CalendarHome />

            <ContainerAppointment>

                <ButtonTabs
                    textButton={'Pendentes'}
                    clickButton={statusList === 'pendente'}
                    onPress={() => setStatusList('pendente')}
                />

                <ButtonTabs
                    textButton={'Realizadas'}
                    clickButton={statusList === 'realizada'}
                    onPress={() => setStatusList('realizada')}
                />

                <ButtonTabs
                    textButton={'Canceladas'}
                    clickButton={statusList === 'cancelada'}
                    onPress={() => setStatusList('cancelada')}
                />

            </ContainerAppointment>

            <ListComponent
                data={ConsultasUser}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) => {
                    if (statusList === 'pendente' && item.situacao === 'pendente') {
                        return (
                            <AppointmentCard
                                situacao={item.situacao}
                                onPressAppointment={() => setShowModalAppointment(true)}
                                onPressCancel={() => setShowModalCancel(true)}
                                onPressLocal={() => {
                                    setShowModalLocal(true);
                                    setSelectedAppointment(item);
                                }}
                                name={item.nome}
                                especialidade={item.especialidade}
                                imagem={item.imagem}
                                crm={item.crm}
                                age={item.age}
                                reason={item.reason}
                                hour={item.hour}
                            />
                        );
                    } if (statusList === 'realizada' && item.situacao === 'realizada') {
                        return (
                            <AppointmentCard
                                situacao={item.situacao}
                                onPressLocal={() => navigation.navigate("ViewRecord")}
                                name={item.nome}
                                especialidade={item.especialidade}
                                imagem={item.imagem}
                                crm={item.crm}
                                age={item.age}
                                reason={item.reason}
                                hour={item.hour}
                            />
                        );
                    } if (statusList === 'cancelada' && item.situacao === 'cancelada') {
                        return (
                            <AppointmentCard
                                situacao={item.situacao}
                                name={item.nome}
                                especialidade={item.especialidade}
                                imagem={item.imagem}
                                crm={item.crm}
                                age={item.age}
                                reason={item.reason}
                                hour={item.hour}
                            />
                        );
                    }
                }

                }
            />

            <MakeAppointment
                onPress={() => setShowModalSchedule(true)}
            >
                <FontAwesome name="stethoscope" size={38} color="white" />
            </MakeAppointment>

            
            <CancelModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
            />
            <AppointmentModal
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
            />
            <ScheduleModal
                visible={showModalSchedule}
                navigation={navigation}
                setShowModalSchedule={setShowModalSchedule}
            />
            <LocalModal
                visible={showModalLocal}
                navigation={navigation}
                setShowModalLocal={setShowModalLocal}
                appointmentData={selectedAppointment}
            />

        </Container>

        
    )
}