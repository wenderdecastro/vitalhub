import styled from 'styled-components';

export const Button = styled.TouchableOpacity`
	width: 90%;
	height: 53px;
	padding: 16px;

	border-radius: 5px;
	background-color: #496bba;
	border: 2px solid #496bba;
	align-items: center;
	margin-top: 50px;
`;

export const Button2 = styled(Button)`
	margin-bottom: 40px;
`;

export const ButtonGoogle = styled(Button)`
	border-radius: 5px;
	background-color: #fafafa;

	gap: 30px;
	justify-content: center;
	align-items: center;
	flex-direction: row;

	margin-top: 15px;
`;

export const ButtonIcon = styled.TouchableOpacity`
	height: 40px;
	width: 40px;
	position: absolute;
	margin-top: 90px;
	align-self: flex-start;
	margin-left: 15px;
	background-color: #a1d9dc;
	justify-content: center;
	align-items: center;
	border-radius: 50px;
`;

export const IconReturn = styled.Image`
	width: 100%;
	height: 100%;
`;

export const IconClose = styled.Image`
	width: 100%;
	height: 100%;
`;

export const ButtonSecondary = styled(Button)`
	background-color: transparent;
`;

export const MakeAppointment = styled.TouchableOpacity`
	height: 80px;
	width: 80px;
	margin-bottom: 20px;
	align-self: flex-end;
	margin-right: 30px;
	background-color: #49b3ba;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
`;

export const CloseButton = styled.TouchableOpacity`
	width: 50%;
	height: 53px;
	background-color: #acabb7;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
`;

export const ButtonCamera = styled.TouchableOpacity`
	padding: 12px;
	border-radius: 10px;
	background-color: #496bba;
	border: 1px solid #fbfbfb;

	bottom: -5px;
	right: 15px;
	position: absolute;
`
