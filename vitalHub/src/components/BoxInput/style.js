import styled from "styled-components"

export const FieldContent = styled.View`

width: ${props => `${props.fieldWidht}%`};


gap: 10px;
`


export const InputText = styled.TextInput.attrs(props => ({
    placeholderTextColor: '#4E4B59'
 }) )`
width: ${props => `${props.fieldWidht}%`};
height: ${props => `${props.fieldHeight}px`};
background-color: #F5F3F3;
font-size: 14px;
font-family: MontserratAlternates_500Medium;
border-radius: 10px;
padding: 20px;

`

export const InputLabel = styled.Text`
text-align: left;
font-size: 16px;
font-family: Quicksand_600SemiBold;
color: #33303E;
margin-top: 20px;
`

export const InputTextModificate = styled.TextInput.attrs(props => ({
    placeholderTextColor: '#34898F'
}) )
`
width: 100%;
height: ${props => `${props.fieldHeight}px` };
border: #49B3BA;
border-width: 2px;
border-radius: 7px;
background-color: #FFF;
color: #34898F;
font-family: 'MontserratAlternates_600SemiBold';
font-size: 16px;
padding: 30px;
`

