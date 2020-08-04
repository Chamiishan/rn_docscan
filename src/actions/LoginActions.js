import axios from 'axios';
import { DO_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, IN_PROGRESS } from '../utils/Constants'

export const GSignIn = (GoogleSignin, statusCodes) => {
    //Prompts a modal to let the user sign in into your application.
    return async (dispatch) => {
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            // console.log('User Info --> ', userInfo);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: userInfo
            })
            // this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: 'User Cancelled the Login Flow'
                })
            } else if (error.code === statusCodes.IN_PROGRESS) {
                dispatch({
                    type: IN_PROGRESS,
                    payload: 'Signing In Progress'
                })
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: 'Play Services Not Available or Outdated'
                })
            } else {
                console.log('Some Other Error Happened');
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: 'Some Other Error Happened'
                })
            }
        }
    }
}

export const doLogin = () => {
    return (dispatch) => {
        dispatch({
            type: DO_LOGIN
        });

        axios.get('login url')
            .then(response => {
                console.log(response.data.data);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data.data
                });
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_FAILURE
                })
            });
    }
}