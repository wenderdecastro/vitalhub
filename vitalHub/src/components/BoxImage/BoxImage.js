import { Image } from "react-native";
import { BoxInput } from "../BoxInput"
import { Container } from "../Container/Style"
import { BoxPrescription, ButtonCancel, ButtonUpload, ContentUpload, TextBox, TextBox2, TextCancel, TitleBox } from "./Style"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserPicture } from "../UserPicture/Style";

export const BoxImage = ({ navigation, photoUri }) => {
    return (
        <Container>
            


            

            

            <ContentUpload>
                <ButtonUpload onPress={() => navigation.navigate("CameraScreen")}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={22} color="white" />
                    <TextBox2>Enviar</TextBox2>
                </ButtonUpload>
                <ButtonCancel>
                    <TextCancel>Cancelar</TextCancel>
                </ButtonCancel>
            </ContentUpload>

        </Container>
    )
}