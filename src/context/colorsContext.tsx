import React, {createContext, FC, useMemo, useState} from 'react';

import {ThemeProvider} from 'styled-components/native';

const InitContex: {[key: string]: string} = {
  primary: ' #233B6E',
  secondary: ' #FFFFFF',
  tertiary: ' #35B3F1',
  background: ' #EFF0F4',
  textPrimary: ' #000000',
  textSecondary: ' #79747E',
  textTertiary: ' #FFFFFF',
  success: ' #28a745',
  error: ' #cf6679',
  warning: ' #ffc107',
  info: ' #17a2b8',
  border: ' #333333',
  shadow: ' #00000060',
  focus: ' #03dac6',
};

export type DefaultThemeColors = typeof InitContex;

export const ColorsContex = createContext<
  React.Dispatch<React.SetStateAction<DefaultThemeColors>>
>(() => {});

export const ColorsContext: FC<{children: React.ReactElement}> = ({
  children,
}) => {
  const [theme, setTheme] = useState(InitContex);
  const Colors = useMemo(() => {
    Object.keys(theme).forEach(x => (theme[x] = theme[x].trim()));
    return theme;
  }, [theme]);
  return (
    <ThemeProvider theme={Colors}>
      <ColorsContex.Provider value={setTheme}>{children}</ColorsContex.Provider>
    </ThemeProvider>
  );
};
