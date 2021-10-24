import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
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
        let decoded: any = jwtDecode(token);
        console.log(decoded);
        console.log(token);
        let formData: FormData = new FormData();
        let data = {
            name: decoded.name,
            email: decoded.email,
            auth0AccessToken: decoded.sub,
            pictureUrl: decoded.picture,
        }
        formData.append('data', JSON.stringify(data));
        const response: any = await axios.post(`${api_url}/api/user`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        console.log(response);
        return response;
    }
    return null;
}

export const updateUser = async (data: any) => {
    let token = await getToken();
    if (token) {
        console.log(token);
        let formData: FormData = new FormData();
        formData.append('data', JSON.stringify(data));
        const response: any = await axios.put(`${api_url}/api/user`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        console.log(response);
        return response;
    }
    return null;
}

export const detectFood = async (data: any) => {
    let token = await getToken();
    if (token) {
        let formData: FormData = new FormData();
        formData.append('image', data);
        console.log(formData);
        const response: any = await axios.post(`${api_url}/api/detect/food`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        return response.data;
    }
    return null;
}

export const addFood = async (data: any) => {
    let token = await getToken();
    if (token) {
        let formData: FormData = new FormData();

        formData.append('data', JSON.stringify(data));
        console.log(formData);
        const response: any = await axios.post(`${api_url}/api/inventory`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        console.log(response);
        return response.data;
    }
    return null;
}

export const getFood = async (foodID: any) => {
    let token = await getToken();
    if (token) {
        const response: any = await axios.get(`${api_url}/api/food?id=${foodID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        return response.data.food;
    }
    return null;
}

export const getRecipes = async () => {
    let token = await getToken();
    if (token) {
        const response: any = await axios.get(`${api_url}/api/recipes`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        return response.data.recipes;
    }
    return null;
}

export const searchFood = async (name: string) => {
    let token = await getToken();
    if (token) {
        const response: any = await axios.get(`${api_url}/api/food/search?name=${name}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }).catch((e) => {
            console.error(e);
        });
        return response.data.food;
    }
    return null;
}