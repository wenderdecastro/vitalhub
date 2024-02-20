import styled from 'styled-components/native';
import { Colors } from '../../utils/Colors';

export const RawText = styled.Text`
	font-family: 'Quicksand_500Medium';
	font-size: ${(props) => (props.fontSize ? props.fontSize : 20)}px;
	color: ${(props) => (props.textColor ? props.textColor : Colors.gray)};
	text-decoration: none;
	margin-top: 15px;
	text-align: center;
`;

export const MediumText = styled(RawText)``;

export const AltText = styled(RawText)`
	font-family: 'MontserratAlternates_600SemiBold';
	font-size: 18px;
	margin-top: none;
`;

export const Label = styled(AltText)`
	font-family: 'Quicksand_600SemiBold';
	font-size: 18px;
	margin-top: none;
	align-self: flex-start;
`;
