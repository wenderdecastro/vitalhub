import styled from 'styled-components';

export const FieldContent = styled.View`
	width: ${(props) => `${props.fieldWidht}%`};

	gap: 10px;
`;

export const InputText = styled.TextInput.attrs((props) => ({
	placeholderTextColor: '#4E4B59',
}))`
	width: 100%;
	height: ${(props) => `${props.fieldHeight}px`};
	background-color: #f5f3f3;
	font-size: 14px;
	font-family: MontserratAlternates_500Medium;
	border-radius: 10px;
	padding: 20px;
`;

export const InputLabel = styled.Text`
	text-align: left;
	font-size: 16px;
	font-family: Quicksand_600SemiBold;
	color: #33303e;
	margin-top: 20px;
`;

export const InputTextModificate = styled.TextInput.attrs((props) => ({
	placeholderTextColor: '#34898F',
}))`
	width: 100%;
	height: ${(props) => `${props.fieldHeight}px`};
	border: #49b3ba;
	border-width: 2px;
	border-radius: 7px;
	background-color: #fff;
	color: #34898f;
	font-family: 'MontserratAlternates_600SemiBold';
	font-size: 16px;
	padding: 30px;
`;
