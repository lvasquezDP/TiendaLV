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
import {IconDorw} from '../../asset/icons/icons';

interface PropsText extends ViewProps {
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
  title?: string;
}
export const Card: FC<PropsText> = p => {
  const expandedHeight = 220;
  const collapsedHeight = 45;
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
    <Cardd style={animatedCardStyle} {...p}>
      <TouchableOpacity
        onPress={toggleCard}
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>{p.title}</Text>
        <IconDorw style={{marginBottom: 10}} />
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
  z-index: 1;
  ${({top}) => top && `top: ${top}px;`}
  ${({left}) => left && `left: ${left}px;`}
  ${({right}) => right && `right: ${right}px;`}
  ${({bottom}) => bottom && `bottom: ${bottom}px;`}
  border-radius: 10px;
  font-size: 10px;
  padding: 10px;
  background: ${({theme}) => theme.secondary};
  color: ${({theme}) => theme.primary};
`;
