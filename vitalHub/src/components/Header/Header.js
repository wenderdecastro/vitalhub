import { decodeJwtToken } from '../../utils/Auth';
import { ContainerHeader } from '../Container/Style';
import { NotiIcon } from '../Logo/Style';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefaulte } from './style';
import { Ionicons } from '@expo/vector-icons';
import { userDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";

<<<<<<< HEAD
export const Header = ({ name, ProfileImage, navigation }) => {
	async function profileLoad() {
		const token = await decodeJwtToken();
		console.log(token);
	}

	useEffect(() => {
		profileLoad();
	}, []);
=======
export const Header = ({name,ProfileImage, navigation }) => {
    const [nome,setNome] = useState()

    async function profileLoad(){
        const token = await userDecodeToken()

        console.log(token);
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
>>>>>>> 9abfd2ebd3b276f6128dd060c3f83c3ea23fad31

	return (
		<ContainerHeader>
			<BoxUser onPress={() => navigation.replace('Profile')}>
				<ImageUser source={ProfileImage} />
				<DataUser>
					<TextDefaulte>Bem vindo</TextDefaulte>
					<NameUser>{name}</NameUser>
				</DataUser>
			</BoxUser>

			<NotiIcon>
				<Ionicons
					name="notifications"
					size={26}
					color="white"
				/>
			</NotiIcon>
		</ContainerHeader>
	);
};
