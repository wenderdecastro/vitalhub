import styled from "styled-components";
import { Title } from "../Title/Style";

export const ContainerCard = styled.TouchableOpacity`
width: 90%;
height: 102px;

flex-direction: row;
margin-top: 10px;
align-items: center;
justify-content: center;
gap: 20px;
margin: 0 auto;
margin-bottom: 10px;
background-color: #fff;
box-shadow: 4px 4px 15px rgba(0,0,0,0.08);
`

export const ImageCard = styled.Image`
height: 80px;
width: 77px;
border-radius: 5px;
`

export const ContentCard = styled.View`
width: 70%;
`

export const DateProfileCard = styled.View`
justify-content: center;

`

export const  ProfileName = styled(Title)`
font-size: 16px;
`
export const ProfileData = styled.View`
flex-direction: row; 
gap: 10px;
align-items: center;
`

export const TextAge = styled.Text`
font-size: 14px;
color: #8c8a97;
font-family: Quicksand_400Regular;
`

export const TextBold = styled(TextAge)`
font-family: Quicksand_600SemiBold;
color: ${(props) => props.situacao == "pendente" ? "#49B3BA" : "#4E4B59"};
`

export const ViewRow = styled.View`
width: 100%;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 10px;

`

export const ClockCard = styled.View`
padding: 4px 2px;
width: 90px;
height: 28px;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 7px;
border-radius: 5px;
background-color: ${(props) => props.situacao == "pendente" ? "#e8fcfd" : "#f1f0f5"};
`

export const ButtonCard = styled.TouchableOpacity`
margin-right: 20px;
`

export const ButtonText = styled.Text`
font-family: MontserratAlternates_500Medium;
font-size: 14px;
color: ${(props) => props.situacao == "pendente" ? "#c81d25" : "#344f8f"}

`

