import { decodeJwtToken } from '../../utils/Auth';
import { ContainerHeader } from '../Container/Style';
import { NotiIcon } from '../Logo/Style';
import { BoxUser, DataUser, ImageUser, NameUser, TextDefaulte } from './style';
import { Ionicons } from '@expo/vector-icons';

export const Header = ({ name, ProfileImage, navigation }) => {
	async function profileLoad() {
		const token = await decodeJwtToken();
		console.log(token);
	}

	useEffect(() => {
		profileLoad();
	}, []);

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
