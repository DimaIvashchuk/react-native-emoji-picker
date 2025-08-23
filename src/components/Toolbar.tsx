import { memo, useCallback } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme } from "../theme";
import { Category } from "../types";
import { icons } from "../icons";
import { Categories } from "../constants";

export type ToolbarProps = {
  withRecent?: boolean;
  theme: Theme;
  selectedCategory: Category | null;
  iconWidth?: number;
  onSelectCategory: (category: Category, index: number) => void;
};

const Toolbar = ({ selectedCategory, onSelectCategory, theme, iconWidth, withRecent }: ToolbarProps) => {
  const calculatedIconWidth = iconWidth || Math.min(
    Math.floor(
      (Dimensions.get('window').width -
        styles.toolbarContainer.paddingHorizontal * 2 -
        styles.toolbarContainer.columnGap * (Object.keys(Categories).length - 1)) /
      Object.keys(Categories).length,
    ),
    24,
  );

  const getCategoryIcon = useCallback((category: Category) => {

    const Icon = icons[category];

    return <Icon width={calculatedIconWidth}
      color={
        selectedCategory === category
          ? theme.toolbar.icon.activeColor
          : theme.toolbar.icon.defaultColor
      } />;
  }, [calculatedIconWidth, selectedCategory, theme]);

  return (
    <View
      style={[styles.toolbarContainer, theme.toolbar.container]}>
      {Object.entries(Categories).map(([key, category], index) => (
        (key === 'recents' && !withRecent) ? null :
          <TouchableOpacity
            key={key}
            onPress={() => {
              onSelectCategory(key as Category, withRecent ? index : index-1);
            }}>
            {getCategoryIcon(key as Category)}
          </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(Toolbar);

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    columnGap: 8,
  },
})