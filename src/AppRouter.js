import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/Login';
import Splash from './components/Splash';
import HomeRoot from './components/HomeRoot';
import Scanner from './components/Scanner';
import Settings from './components/Settings';
import ExportAsPdf from './components/ExportAsPdf';

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
         <Scene key='settings' hideNavBar={true} component={Settings}/>
         <Scene key='exportaspdf' hideNavBar={true} component={ExportAsPdf}/>
      </Scene>
   </Router>
)
export default AppRouter;