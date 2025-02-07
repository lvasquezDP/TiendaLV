import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Animated,
  TextInputProps,
} from 'react-native';
import {IconEye} from '../../../asset/icons/icons';
import {Colors} from '../../colors';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {Text} from '../Text/text.component';

interface PropsInput extends TextInputProps {
  label: string;
  password?: boolean;
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  errors?: Record<string, any>;
  name?: string;
  leftComponent?: React.ReactElement;
  control?: Control<FieldValues, any>;
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export const Input: FC<PropsInput> = ({
  label,
  password = false,
  styleContainer,
  errors = {},
  name = '',
  leftComponent,
  control,
  rules,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(
    (control?._getWatch(name) ?? '') !== '',
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(password);

  const hasError = name in errors;

  return (
    <>
      <View
        style={[
          styles.container,
          styleContainer,
          isFocused && styles.focused,
          hasError && styles.error,
        ]}>
        {leftComponent && (
          <View style={styles.leftComponent}>{leftComponent}</View>
        )}

        <View style={{flex: 1}}>
          <View style={styles.labelContainer}>
            {label.split('').map((char, index) => (
              <LabelChar
                key={index}
                char={char}
                isFocused={isFocused}
                hasError={hasError}
                delay={index * 50}
              />
            ))}
          </View>

          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                {...props}
                style={styles.input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  onBlur();
                  !value && setIsFocused(false);
                }}
                value={value}
                onChangeText={onChange}
                secureTextEntry={isPasswordVisible}
              />
            )}
          />
        </View>

        {password && (
          <IconEye
            style={styles.eyeIcon}
            color={isFocused ? Colors.focus : Colors.input}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        )}
      </View>
      <Text style={styles.textError}>
        {errors[name] && errors[name].message}
      </Text>
    </>
  );
};

const LabelChar = ({
  char,
  isFocused,
  delay,
  hasError,
}: {
  char: string;
  isFocused: boolean;
  delay: number;
  hasError: boolean;
}) => {
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(translateYAnim, {
      toValue: isFocused ? -25 : 0,
      duration: 200,
      delay,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop(); // Limpieza de la animación
  }, [isFocused, delay]);

  return (
    <Animated.Text
      style={[
        styles.labelChar,
        {transform: [{translateY: translateYAnim}]},
        isFocused && styles.labelCharFocused,
        hasError && styles.labelCharError,
      ]}>
      {char}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.input,
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  focused: {
    borderBottomColor: Colors.focus,
  },
  error: {
    borderBottomColor: Colors.error,
  },
  leftComponent: {
    paddingHorizontal: 5,
  },
  labelContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
  },
  labelChar: {
    color: Colors.input,
    fontWeight: 'bold',
  },
  labelCharFocused: {
    color: Colors.focus,
  },
  labelCharError: {
    color: Colors.error,
  },
  textError: {
    color: Colors.error,
    marginHorizontal: 10,
    marginTop: 1,
    marginBottom: 15,
  },
  input: {
    fontSize: 18,
    color: Colors.text,
    padding: 0,
    paddingHorizontal: 5,
    margin: 0,
  },
  eyeIcon: {
    marginLeft: 5,
  },
});
