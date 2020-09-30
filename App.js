import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Home from './src/components/Home';
import Findme from './src/components/Findme';

const navigator =  createStackNavigator (
  {
  Home:{screen: Home},
  Findme:{screen: Findme},
});

export default createAppContainer(navigator);