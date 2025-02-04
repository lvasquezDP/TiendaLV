import {
  Image as Imagen,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  StyleProp,
  ImageResizeMode,
} from 'react-native';
import React from 'react';

interface IProps {
  uri?: string;
  contentContainerStyle?: ViewStyle;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
  resizeMode?: ImageResizeMode;
}

export function Image({
  uri,
  style,
  onPress,
  contentContainerStyle,
  resizeMode,
}: IProps) {
  return (
    <TouchableOpacity
      style={[styles.button, contentContainerStyle]}
      onPress={onPress}>
      <Imagen
        style={[styles.image, style]}
        source={{
          uri:
            uri ??
            'https://res.cloudinary.com/dxarbtyux/image/upload/v1703315333/color-contrast-inspector/sample-5-avatar.webp',
        }}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    borderRadius: 5,
    margin: 2,
    minWidth: 100,
    minHeight: 100,
  },
  image: {
    flex: 1,
  },
});
