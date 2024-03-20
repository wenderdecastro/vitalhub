import styled from "styled-components";

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#34899f'
})`
width: 90%;
height: 53px;
padding: 16px;
margin-top: 15px;

border: 2px solid #49b3ba;
border-radius: 5px;
font-size: 14px;
font-family: 'MontserratAlternates_600SemiBold';
`

export const InputVerify = styled.TextInput`
width: 65px;
height: 62;
border: 2px solid #49b3ba;
border-radius: 5px;
font-size: 40x;
align-items: center;
color:#34898F ;
`
export const InputLabel = styled.Text`
text-align: left;
font-size: 16px;
font-family: Quicksand_600SemiBold;
color: #33303E;
margin-top: 20px;
`
