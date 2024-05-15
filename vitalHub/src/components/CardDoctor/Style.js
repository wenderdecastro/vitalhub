import styled from 'styled-components/native';

export const ContainerCardDoctor = styled.View`
flex-direction: row;
width: 320px;
height: 100px;
margin-top: 20px;
border-radius: 7px;
background-color:#fff ;
box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
border: ${props => props.isSelected ? '3px solid #496BBA' : 'none'};
`;

export const ImageCardDoctor = styled.Image`
	height: 76px;
	width: 75px;
	border-radius: 5px;
	margin-top: 5px;
	margin-left: 20px;
`;
export const DoctorInfo = styled.View`
	flex-direction: column;
`;

export const ContentDoctor = styled.View`
	flex-direction: row;
	gap: 20px;
	justify-content: flex-start;
	align-items: center;
`;
