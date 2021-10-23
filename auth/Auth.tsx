import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from './API';

const auth0Domain = 'dev-ajdj9ych.us.auth0.com';
const auth0ClientId = 'fjcKa6mU6vZym8CPDCGJzMYAeYwsYfPq';
function objectToQueryString(obj: any) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

const storeToken = async (value: string) => {
    try {
        await AsyncStorage.setItem('token', value);
    } catch (e) {
        // saving error
        console.error(e);
    }
}

let _loginWithAuth0 = async (navigation: any) => {
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
    let authUrl = `https://${auth0Domain}/authorize?` + objectToQueryString({
        client_id: auth0ClientId,
        response_type: 'id_token',
        scope: 'openid profile email',
        redirect_uri: redirectUrl,
        nonce: 'nonce'
    });
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const result = await AuthSession.startAsync({
        authUrl: authUrl
    });

    if (result.type === 'success') {
        console.log(result);
        let token = result.params.id_token;
        await storeToken(token);
        let user = (await getUser()).user;
        if (!user) {
            navigation.navigate("Preferences");
        } else {
            navigation.navigate("Root");
        }
    }
};

export default _loginWithAuth0;
