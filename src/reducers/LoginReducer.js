import { DO_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, IN_PROGRESS, NO_LOGIN } from '../utils/Constants'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    login_status: NO_LOGIN,
    userInfo: ''
}

const storeValue = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value)
      console.log('storing value');
    } catch (e) {
      // saving error
    }
  }

const storeObject = async (key, obj) => {
    try {
        console.log('storing user');
        const jsonValue = JSON.stringify(obj)
        await AsyncStorage.setItem(key, jsonValue)
        Actions.reset("home_root");
    } catch (e) {
        console.log('saving error ', e);
    }
}

export default LoginReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case IN_PROGRESS:
            console.log(action.payload);
            return { ...state, login_status: IN_PROGRESS };
        case LOGIN_SUCCESS:
            storeValue('login_status', LOGIN_SUCCESS);
            storeObject('user', action.payload.user);
            
            // console.log('Reducer: User Info --> ', action.payload);

            
            return { ...state, login_status: LOGIN_SUCCESS, userInfo: action.payload };
        case LOGIN_FAILURE:
            console.log(action.payload);
            return { ...state, login_status: LOGIN_FAILURE };
    }

    return state;
}