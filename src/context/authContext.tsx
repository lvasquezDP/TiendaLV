import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, FC, useEffect, useMemo, useState} from 'react';
import api from '../lib/api';
import {useMutation} from '@tanstack/react-query';
import {IconLoading} from '../asset/icons/icons';
import {View} from 'react-native';
import {UserLogin} from '../types/user';
import { useTheme } from 'styled-components/native';

const InitContex: contex = {
  user: {} as UserLogin,
  dataForm: {},
  setUser: () => {},
};
interface contex {
  user: UserLogin;
  dataForm: {[key: string]: any};
  setUser: React.Dispatch<React.SetStateAction<UserLogin>>;
}
export const AuthContex = createContext<contex>(InitContex);

export const AuthContext: FC<{children: React.ReactElement}> = ({children}) => {
  const [user, setUser] = useState({} as UserLogin);
  const [dataForm, setDataForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme(); 

  const {mutate} = useMutation({
    mutationFn: (token: string) => api.get(`/auth/refresh/${token}`),
    onSuccess: async data => {
      setUser(data.data.user);
      await AsyncStorage.setItem('token', data.data.token);
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const set = async () => {
      const token = await AsyncStorage.getItem('token');
      const login = await AsyncStorage.getItem('login');
      if (login) setDataForm(JSON.parse(login));
      if (token) mutate(token);
      else setIsLoading(false);
    };
    set();
  }, []);

  const AuthValue = useMemo(
    () => ({user, dataForm, setUser}),
    [user, dataForm],
  );

  if (isLoading)
    return (
      <View
        style={{
          backgroundColor: theme.background,
          flex: 1,
          justifyContent: 'center',
        }}>
        <IconLoading />
      </View>
    );
  return (
    <AuthContex.Provider value={AuthValue}>{children}</AuthContex.Provider>
  );
};
