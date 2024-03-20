import styled from "styled-components";

export const Button = styled.TouchableOpacity`
width: 90%;
height: 53px;
padding: 16px;

border-radius: 5px;
background-color: #496BBA;
border: 2px solid #496BBA;
align-items: center;
margin-top: 50;
`

export const Button2 = styled(Button)`
margin-bottom: 40px;
`

export const ButtonGoogle = styled(Button)`
border-radius: 5px;
background-color: #FAFAFA;

gap: 30;
justify-content: center ;
align-items: center;
flex-direction: row;

margin-top: 15px;
`

export const ButtonIcon = styled.TouchableOpacity`
height: 40px;
width: 40px;
position: absolute;
margin-top: 90px;
align-self: flex-start;
margin-left: 15px;
background-color: #A1D9DC;
justify-content: center;
align-items: center;
border-radius: 50px;
`

export const IconReturn = styled.Image`
width: 100%;
height: 100%;
`

export const IconClose = styled.Image`
width: 100%;
height: 100%;
`

export const ButtonSecondary = styled(Button)`
background-color: transparent;
`

export const MakeAppointment = styled.TouchableOpacity`
height: 80px;
width: 80px;
margin-bottom: 20px;
align-self: flex-end;
margin-right: 30px;
background-color: #49B3BA;
justify-content: center;
align-items: center;
border-radius: 10px;
`

