import { ContainerHeader } from "../Container/Style"
import { NotiIcon } from "../Logo/Style"
import { BoxUser, DataUser, ImageUser, NameUser, TextDefaulte} from "./style"
import { Ionicons } from '@expo/vector-icons';
import { userDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";

export const Header = ({name,ProfileImage, navigation }) => {
    const [nome,setNome] = useState()

    async function profileLoad(){
        const token = await userDecodeToken()

        setNome(token.name)
    }

    useEffect(() => {
        profileLoad();
    }, [])
    
    return(

        <ContainerHeader>
            <BoxUser onPress={() => navigation.replace("Profile")}>
                
                <ImageUser source={ProfileImage}/>
                <DataUser>
                    <TextDefaulte>Bem vindo</TextDefaulte>
                    <NameUser>{nome}</NameUser>
                </DataUser>
            </BoxUser>

            <NotiIcon>
                <Ionicons name="notifications" size={26} color="white" />
            </NotiIcon>
            
        </ContainerHeader>
    )
}