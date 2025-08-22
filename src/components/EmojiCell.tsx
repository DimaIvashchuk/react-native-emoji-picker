import { memo, useMemo } from 'react';
import { StyleProp, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Emoji } from '../types';
import { charFromEmojiString } from '../utils';

type EmojiCellProps = {
  unified: string;
  colSize: number;
  onPress?: () => void;
} & TouchableOpacityProps;

const EmojiCell = ({ unified, colSize, onPress, ...other }: EmojiCellProps) => {
  const touchableStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: colSize,
      height: colSize,
      alignItems: 'center',
      justifyContent: 'center',
    }),
    [colSize]
  );

  const textStyle = useMemo(
    () => ({
      color: '#FFFFFF',
      fontSize: Math.max(colSize - 12, 6),
    }),
    [colSize]
  );

  const emojiChar = useMemo(() => charFromEmojiString(unified), [unified]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={touchableStyle}
      onPress={onPress}
      {...other}
    >
      <Text style={textStyle}>{emojiChar}</Text>
    </TouchableOpacity>
  );
};

export default memo(EmojiCell, (prevProps, nextProps) => {
  return (
    prevProps.unified === nextProps.unified &&
    prevProps.colSize === nextProps.colSize &&
    prevProps.onPress === nextProps.onPress
  );
});