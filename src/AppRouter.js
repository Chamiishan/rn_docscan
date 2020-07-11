import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/Login';
import Splash from './components/Splash';
import Home from './components/Home';

const AppRouter = () => (
   <Router>
      <Scene key="root">
         <Scene key="splash" hideNavBar={true} component={Splash} title="Splash" initial={true} />
         <Scene key="login" hideNavBar={true} component={Login} title="Login" />
         <Scene key="home" hideNavBar={false} component={Home} navigationBarStyle={{ backgroundColor: 'green' }}>

         </Scene>
      </Scene>
   </Router>
)
export default AppRouter;