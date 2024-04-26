import { ContainerCard } from "../AppointmentCard/Style"
import { SubTitle, Title } from "../Title/Style"
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Assessment, ClinicOpen, ContainerCardClinic, Part1, Part2, TitleAssessment, TitleSchedule } from "./Style";
import { useState } from "react";


export const CardClinic = ({
    nome,
    endereco,
    avaliacao,
    funcionamento
}) => {

    const [clicked, setClicked] = useState(false); // Estado para controlar o clique

    const handleClick = () => {
        setClicked(!clicked); // Alterna o estado quando o componente é clicado
    };

    return (

        <ContainerCardClinic onPress={handleClick} clicked={clicked}>

            <Part1>
                <Title>{nome}</Title>
                <Assessment>
                    <AntDesign name="star" size={22} color="#F9A620" />
                    <TitleAssessment> {avaliacao}</TitleAssessment>
                </Assessment>
            </Part1>

            <Part2>
                <SubTitle>{endereco}</SubTitle>

                <ClinicOpen>
                    <Entypo name="calendar" size={16} color="#49B3BA" />
                    <TitleSchedule> {funcionamento}</TitleSchedule>
                </ClinicOpen>
            </Part2>

        </ContainerCardClinic>

    )
}