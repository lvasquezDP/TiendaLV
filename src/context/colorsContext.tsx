import React, {createContext, FC, useMemo, useState} from 'react';

import {ThemeProvider} from 'styled-components/native';

const InitContex = {
  primary: '#233B6E',
  secondary: '#03dac6',
  background: '#EFF0F4',
  textPrimary: '#000000',
  textSecondary: '#D9D9D9',
  textTertiary: '#FFFFFF',
  success: '#28a745',
  error: '#cf6679',
  warning: '#ffc107',
  info: '#17a2b8',
  border: '#333333',
  shadow: '#00000060',
};

export type DefaultThemeColors = typeof InitContex;

export const ColorsContex = createContext<
  React.Dispatch<React.SetStateAction<DefaultThemeColors>>
>(() => {});

export const ColorsContext: FC<{children: React.ReactElement}> = ({
  children,
}) => {
  const [theme, setTheme] = useState(InitContex);
  const Colors = useMemo(() => theme, [theme]);
  return (
    <ThemeProvider theme={Colors}>
      <ColorsContex.Provider value={setTheme}>{children}</ColorsContex.Provider>
    </ThemeProvider>
  );
};
