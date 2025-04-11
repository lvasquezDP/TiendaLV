import React, {FC} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import LottieView, {LottieViewProps} from 'lottie-react-native';
import {ViewProps} from 'react-native';
import {useTheme} from 'styled-components/native';

type CustomLottieProps = Omit<LottieViewProps, 'source'> & {
  containerProps?: ViewProps;
};

export const IconPerson: FC<SvgProps> = props => {
  const theme = useTheme();
  return (
    <Svg
      width="25"
      height="25"
      fill="currentColor"
      color={theme.textPrimary}
      viewBox="0 0 16 16"
      {...props}>
      <Path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
    </Svg>
  );
};
export const IconEye: FC<SvgProps> = props => {
  const theme = useTheme();
  return (
    <Svg
      width="25"
      height="25"
      fill="currentColor"
      color={theme.textPrimary}
      viewBox="0 0 16 16"
      {...props}>
      <Path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
      <Path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
    </Svg>
  );
};
export const IconCheck: FC<SvgProps> = props => {
  const theme = useTheme();
  return (
    <Svg
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
      color={props.color ?? theme.textPrimary}>
      <Path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
    </Svg>
  );
};
export const IconLock: FC<SvgProps> = props => {
  const theme = useTheme();
  return (
    <Svg
      width="25"
      height="25"
      fill="currentColor"
      color={theme.textPrimary}
      viewBox="0 0 16 16"
      {...props}>
      <Path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
      <Path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
    </Svg>
  );
};
export const IconAPP: FC<CustomLottieProps> = props => {
  const theme = useTheme();
  return (
    <LottieView {...props} source={require('./Animation.json')} autoPlay loop />
  );
};
export const IconLoading: FC<CustomLottieProps> = props => {
  const theme = useTheme();
  return (
    <LottieView
      {...props}
      source={require('./Loading.json')}
      autoPlay
      loop
      style={{flex: 0.5}}
    />
  );
};
export const IconSettings: FC<CustomLottieProps> = props => {
  const theme = useTheme();
  return (
    <LottieView
      {...props}
      source={require('./Settings.json')}
      autoPlay
      loop={false}
    />
  );
};
export const IconStore: FC<CustomLottieProps> = props => {
  const theme = useTheme();
  return (
    <LottieView
      {...props}
      source={require('./Store.json')}
      autoPlay
      loop
    />
  );
};
export const IconCart: FC<CustomLottieProps> = props => {
  const theme = useTheme();
  return (
    <LottieView
      {...props}
      source={require('./Cart.json')}
      autoPlay
      loop={false}
    />
  );
};
export const IconInventario: FC<CustomLottieProps> = props => {
  const theme = useTheme();
  return (
    <LottieView
      {...props}
      source={require('./Inventario.json')}
      autoPlay
      loop={false}
    />
  );
};
export const IconPesado: FC<CustomLottieProps> = props => {
  const theme = useTheme();
  return (
    <LottieView
      {...props}
      source={require('./Pesado.json')}
      autoPlay
      loop
    />
  );
};
