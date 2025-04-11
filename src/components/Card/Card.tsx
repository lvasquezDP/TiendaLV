import {
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface PropsText extends ViewProps {
  left?: number;
  right?: number;
  bottom?: number;
}
export const Card: FC<PropsText> = p => {
  const expandedHeight = 200;
  const collapsedHeight = 40;
  const height = useSharedValue(expandedHeight);
  const translateY = useSharedValue(0);

  const [isExpanded, setIsExpanded] = useState(true);
  const toggleCard = () => {
    setIsExpanded(prev => !prev);
    height.value = withTiming(isExpanded ? collapsedHeight : expandedHeight, {
      duration: 300,
    });
  };
  useEffect(() => {
    const keyboardShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        translateY.value = withTiming(-e.endCoordinates.height + 50, {
          duration: 300,
        });
      },
    );

    const keyboardHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        translateY.value = withTiming(0, {duration: 300});
      },
    );

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);
  const animatedCardStyle = useAnimatedStyle(() => ({
    height: height.value,
    transform: [{translateY: translateY.value}],
  }));
  return (
    <Cardd style={animatedCardStyle}>
      <TouchableOpacity onPress={toggleCard} style={{alignSelf: 'flex-end'}}>
        <Text>No. de Productos</Text>
      </TouchableOpacity>
      {isExpanded && p.children}
    </Cardd>
  );
};
const Cardd = styled(Animated.View)<{
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
}>`
  position: absolute;
  ${({top}) => top && `top: ${top}px;`}
  left: ${({left = 10}) => left}px;
  right: ${({right = 10}) => right}px;
  bottom: ${({bottom = 10}) => bottom}px;
  border-radius: 10px;
  font-size: 10px;
  padding: 10px;
  background: ${({theme}) => theme.secondary};
  color: ${({theme}) => theme.primary};
`;
