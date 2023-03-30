import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Initial from './src/pages/Initial/Initial';
import Login from './src/pages/Login/Login';
import Registration from './src/pages/Registration/Registration';
import Address from './src/pages/Address/Address';
import Terms from './src/pages/Terms/Terms';
import PaymentDay from './src/pages/PaymentDay/PaymentDay';
import Account from './src/pages/Account/Account';
import Scanner from './src/pages/Scanner/Scanner';
import Invoices from './src/pages/Invoices/Invoices';
import PayDetails from './src/pages/PayDetails/PayDetails';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


function HomeNavigator() {
  return (
    <Tab.Navigator initialRouteName='Account'>
      <Tab.Screen name='Scanner' component={Scanner} options={
        {
          headerShown: false
        }
      } />
      <Tab.Screen name='Invoices' component={Invoices} options={
        {
          headerShown: false
        }
      } />
      <Tab.Screen name='Account' component={Account} options={
        {
          headerShown: false
        }
      } />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Initial'>
        <Stack.Screen name="Home" component={HomeNavigator}
          options={
            {
              headerShown: false
            }
          }
        />
        <Stack.Screen
          name="Initial"
          component={Initial}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="PayDetails"
          component={PayDetails}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Address"
          component={Address}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="PaymentDay"
          component={PaymentDay}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>


  );
}

