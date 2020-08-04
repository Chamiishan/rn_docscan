import React from 'react';
// import AppNavigator from '../home_navigation/AppNavigator';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
// import DrawerNavigator from '../home_navigation/DrawerNavigator';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Folders from './Folders';
import CustomSidebarMenu from '../home_navigation/CustomSidebarMenu';
import { Dimensions } from 'react-native';

class HomeRoot extends React.Component {

    constructor(props) {
        super(props)
        console.log('login_status ', this.props.login_status);
    }

    render() {
        return (
            <AppNavigator />
        );
    }


}

const AppNavigator = createAppContainer(
    createSwitchNavigator({
        // Additional routes such as a login route could
        // be added here:
        // Login: LoginNavigator,
        Main: createDrawerNavigator(
            {
                One: Folders,
                // Two: Scanner,
                // Three: ImageCropView
            },
            {
                contentComponent: CustomSidebarMenu,
                //Sidebar width
                drawerWidth: Dimensions.get('window').width - 130,
            }
        )
    })
);

const DrawerNavigator = createDrawerNavigator(
    {
        One: Folders,
        // Two: Scanner,
        // Three: ImageCropView
    },
    {
        contentComponent: (props) => <CustomSidebarMenu login_status= {"true"}  />,
        //Sidebar width
        drawerWidth: Dimensions.get('window').width - 130,
    }
);

export default HomeRoot;