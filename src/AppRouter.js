import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/Login';
import Splash from './components/Splash';
import HomeRoot from './components/HomeRoot';
import Scanner from './components/Scanner';
import ImageCropView from './components/ImageCropView';

const AppRouter = () => (
   <Router>
      <Scene key="root">
         <Scene key="splash" hideNavBar={true} component={Splash} title="Splash" initial={true} />
         <Scene key="login" hideNavBar={true} component={Login} title="Login" />
         <Scene
            key="home_root" hideNavBar={true} component={HomeRoot}
         />
         <Scene
            key="scanner" hideNavBar={true} component={Scanner}
         />
         <Scene
            key="image_crop_view" hideNavBar={true} component={ImageCropView}
         />

      </Scene>
   </Router>
)
export default AppRouter;