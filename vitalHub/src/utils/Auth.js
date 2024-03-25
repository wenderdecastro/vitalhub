<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { decode, encode } from 'base-64';

if (!global.atob) {
	global.atob = decode;
}
if (!global.btoa) {
	global.btoa = encode;
}

export const decodeJwtToken = async () => {
	const token = AsyncStorage.getItem('token');

	if (token === null) {
		return null;
	}
	const decoded = jwtDecode(token);
	return { role: decoded.role, name: decoded.name };
};
=======
import AsyncStorage from "@react-native-async-storage/async-storage"
import { decode, encode } from 'base-64'
import { jwtDecode } from "jwt-decode"


if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}


export const userDecodeToken = async () => {
    //capturarando o token
    const token = await AsyncStorage.getItem('token')

    if (token === null) {
        return null;
    }


    //descriptografando o token
    const decoded = jwtDecode(token)

    return {
        role: decoded.role,
        name: decoded.name
    }
}
>>>>>>> 9abfd2ebd3b276f6128dd060c3f83c3ea23fad31
