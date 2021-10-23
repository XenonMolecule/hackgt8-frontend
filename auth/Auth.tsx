import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        response_type: 'token',
        scope: 'openid profile email',
        redirect_uri: redirectUrl,
    });
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    console.log(`AuthURL is:  ${authUrl}`);
    const result = await AuthSession.startAsync({
        authUrl: authUrl
    });

    if (result.type === 'success') {
        console.log(result);
        let token = result.params.access_token;
        storeToken(token);
        navigation.navigate("Preferences");
    }
};

export default _loginWithAuth0;