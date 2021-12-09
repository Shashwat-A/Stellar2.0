import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./screens/Home";
import StartMapScreen from "./screens/StarMap";
import DailyPicScreen from "./screens/DailyPic";
import SpaceCraftScreen from "./screens/SpaceCraft";
import IssTracker from './screens/IssTracker';
import MeteorScreen from './screens/MeteorScreen';
import ConstalationScreen from './screens/Constalation';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StarMap" component={StartMapScreen} />
        <Stack.Screen name="DailyPic" component={DailyPicScreen} />
        <Stack.Screen name="SpaceCraft" component={SpaceCraftScreen} />
        <Stack.Screen name="IssTracker" component={IssTracker} />
        <Stack.Screen name="MeteorScreen" component={MeteorScreen} />
        <Stack.Screen name="Constellation" component={ConstalationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;