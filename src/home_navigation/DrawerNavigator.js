import { createDrawerNavigator } from 'react-navigation-drawer';
import Folders from '../components/Folders';
import Scanner from '../components/Scanner';
// import ImageCropView from '../components/ImageCropView';
import CustomSidebarMenu from './CustomSidebarMenu';
import { Dimensions } from 'react-native';

const DrawerNavigator = createDrawerNavigator(
    {
    One: Folders,
    Two: Scanner,
    // Three: ImageCropView
 },
    {
        contentComponent: CustomSidebarMenu,
        //Sidebar width
        drawerWidth: Dimensions.get('window').width - 130,
    }
    );

export default DrawerNavigator;