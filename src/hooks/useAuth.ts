import Toast from 'react-native-toast-message';
import api from '../lib/api';
import {PropsStack} from '../routers/Auth';
import {useFormulario} from './useFormulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = (props: PropsStack<'Login'>) => {
  return useFormulario({
    mutationFn: data => api.post('/auth/login', data),
    onSuccess: async ({data}) => {
      Toast.show({text1: 'Bienvenido'});
      props.navigation.navigate('Home');
      await AsyncStorage.setItem('token', data.token);
    },
  });
};
