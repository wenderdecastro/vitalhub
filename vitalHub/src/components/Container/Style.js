
import { LinearGradient } from "expo-linear-gradient"
import { FlatList } from "react-native"
import styled from "styled-components"

export const Container = styled.View`
flex: 1;
align-items: center;
background-color: #ffffff;
height: 100%;
`

export const ContentAccount = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
margin-top: 80;
`

export const ContentVerify = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 88%;
margin-top: 10px;
`

export const ContainerScroll = styled.ScrollView`
height: 100%;

`

export const ContainerProfile = styled(Container)`
height: 100%;
width: 100%;
`

export const ContainerUF = styled.View`
width: 80%;
justify-content: space-between;
flex-direction: row;
align-items:center ;
`


export const ContainerHeader = styled(LinearGradient).attrs({
  colors: ["#60BFC5", "#496BBA"],
  start: { x: -0.05, y: 1.08 },
  end: { x: 1, y: 0 },

})`
    width: 100%;
    padding: 20px;
    padding-bottom: 22px;
  
    height: 22%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  
    border-radius: 0px 0px 15px 15px;
    box-shadow: 0px 4px 15px #00000014;
  `;

export const ContentLocal = styled.View`
width: 100%;
height: 430px;

`

export const ContentInfo = styled.View`
width: 100%;
height: 400px;
align-items: center;
justify-content: center;
position: absolute;
margin-top: 400px;
border-radius: 20px;
background-color: white;
`