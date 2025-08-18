import { memo } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Emoji } from "../types";
import { charFromEmojiObject } from "../utils";

type EmojiCellProps = {
  emoji: Emoji;
  colSize: number;
  onPress?: () => void;
} & TouchableOpacityProps;

const EmojiCell = ({ emoji, colSize, ...other }: EmojiCellProps) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={{
      width: colSize,
      height: colSize,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...other}>
    <Text style={{ color: '#FFFFFF', fontSize: Math.max(colSize - 12, 6) }}>
      {charFromEmojiObject(emoji)}
    </Text>
  </TouchableOpacity>
);

export default memo(EmojiCell);