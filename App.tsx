import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AuthRutes from './src/routers/Auth';
import {AuthContext} from './src/context/authContext';
import {ColorsContext} from './src/context/colorsContext';
import ImagePicker from './src/utils/imagePicker';

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { retry: 2 } },
// })

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  new ImagePicker();//<-- inicia image picker
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ColorsContext>
          <AuthContext>
            <AuthRutes />
          </AuthContext>
        </ColorsContext>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
export default App;
