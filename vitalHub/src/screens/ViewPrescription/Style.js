import styled from 'styled-components';

export const ContainerSubTitle = styled.View`
	flex-direction: row;
	gap: 20px;
	margin-bottom: 15px;
`;

export const Line = styled.View`
	width: 80%;
	height: 1px;
	border: 1px solid #8c8a97;
	border-radius: 2px;
	margin-top: 25px;
	margin-bottom: 25px;
`;

export const TitleBox = styled.Text`
	text-align: left;
	font-size: 16px;
	font-family: Quicksand_600SemiBold;
	color: #33303e;
	margin-top: 25px;
	margin-bottom: 10px;
	margin-right: 180px;
`;

export const BoxPrescription = styled.View`
	width: 100%;
	height: 120px;
	background-color: #f5f3f3;
	font-size: 14px;
	font-family: MontserratAlternates_500Medium;
	border-radius: 10px;
	padding: 20px;
	align-items: center;
	justify-content: center;
	gap: 10px;
	flex-direction: row;
`;
export const TextBox = styled.Text`
	color: #4e4b59;
`;

export const TextBox2 = styled.Text`
	color: white;
	font-family: MontserratAlternates_700Bold;
`;

export const ButtonUpload = styled.TouchableOpacity`
	width: 50%;
	height: 50px;
	background-color: #49b3ba;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	gap: 10px;
	border-radius: 5px;
`;
export const ButtonCancel = styled.TouchableOpacity`
	width: 50%;
	height: 50px;
	border-radius: 5px;
	justify-content: center;
	align-items: center;
`;

export const TextCancel = styled.Text`
	color: #c81d25;
`;

export const ContentUpload = styled.View`
	flex-direction: row;
	margin-top: 10px;
`;

export const PrescriptionImage = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 10px;
`;

export const BoxPhoto = styled.View`
	height: 320px;
	width: 100%;
	border: 2px solid red;
`;
