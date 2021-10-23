import jwtdecode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const api_url = "http://128.61.67.40:3000";

const getToken = async () => {
    let token = await AsyncStorage.getItem('token');
    return token;
}

export const getUser = async () => {
    let token = await getToken();
    if (token) {
        const response: any = await axios.get(`${api_url}/api/user`, {
            headers: {
                'Authorization': `bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        return response.data;
    }
    return null;
}

export const addUser = async () => {
    let token = await getToken();
    if (token) {
        const response = await axios.post(`${api_url}/api/user`, {
            headers: {
                'Authorization': `bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });

    }
    return null;
}