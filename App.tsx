import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AuthRutes from './src/routers/Auth';
import {AuthContext} from './src/context/authContext';

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AuthContext>
          <AuthRutes />
        </AuthContext>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default App;
