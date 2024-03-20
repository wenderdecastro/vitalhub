import styled from "styled-components"

export const BoxUser = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
`;

export const ImageUser = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;

export const DataUser = styled.View`

`;

export const TextDefaulte = styled.Text`
  font-size: 14px;
  font-family: "Quicksand_500Medium";
`;

export const NameUser = styled.Text`
  color: #fbfbfb;
  font-size: 16px;
  margin-top: 5px;
  font-family: "MontserratAlternates_600SemiBold";
`;