import styled from "styled-components"

export const ContainerCardDoctor = styled.TouchableOpacity`
width: 300px;
height: 90px;
background-color: #fff;
margin: 0 auto;
margin-bottom: 20px;
border-width: 2px;
border-color: ${props => props.clicked ? '#496BBA' : '#fff'};
box-shadow: 4px 4px 15px rgba(0,0,0,0.08);
`

export const ImageCardDoctor = styled.Image`
height: 76px;
width: 75px;
border-radius: 5px;
margin-top: 5px;
margin-left: 20px;
font-size: 16px;

`
export const DoctorInfo = styled.View`
flex-direction: column;
`

export const ContentDoctor = styled.View`

flex-direction: row;
gap: 20px;
justify-content: flex-start;
align-items: center;
`
