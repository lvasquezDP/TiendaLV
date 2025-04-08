import Toast from 'react-native-toast-message';
import api from '../lib/api';
import {PropsStack} from '../routers/Auth';
import {useFormulario} from './useFormulario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {AuthContex} from '../context/authContext';

export const useAuth = (props: PropsStack<'Login'>) => {
  const {setUser, dataForm} = useContext(AuthContex);
  return useFormulario(
    {
      mutationFn: data => api.post('/auth/login', data),
      onSuccess: async ({data}, formData) => {
        if (formData.save) await AsyncStorage.setItem('login', JSON.stringify(formData));
        else await AsyncStorage.removeItem('login')
        setUser(data.user);
        Toast.show({text1: 'Bienvenido'});
        props.navigation.replace('TabRutes');
        await AsyncStorage.setItem('token', data.token);
      },
    },
    {defaultValues: dataForm},
  );
};
