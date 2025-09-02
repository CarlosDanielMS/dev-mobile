// App.tsx
// Ponto de entrada principal do aplicativo. Configura a navegação.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import EventsListScreen from './src/screens/EventsListScreen';
import EventScreen from './src/screens/EventScreen';
import AttendeesScreen from './src/screens/AttendeesScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Define os tipos para os parâmetros de cada rota
export type RootStackParamList = {
  EventsList: undefined; // Sem parâmetros para a lista
  Event: { eventId: string };
  Attendees: { eventId: string; eventTitle: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="EventsList" // A nova tela inicial
            screenOptions={{
              headerStyle: { backgroundColor: '#f8f8f8' },
              headerTintColor: '#111',
              headerTitleStyle: { fontWeight: 'bold' },
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              name="EventsList"
              component={EventsListScreen}
              options={{ title: 'Eventos' }}
            />
            <Stack.Screen
              name="Event"
              component={EventScreen}
              options={{ title: 'Detalhes do Evento' }}
            />
            <Stack.Screen
              name="Attendees"
              component={AttendeesScreen}
              options={{ title: 'Participantes' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
