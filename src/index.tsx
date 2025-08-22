import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TextInputProps,
  ViewToken,
} from 'react-native';
import { charFromEmojiObject, deepMerge, throttle } from './utils';
import { Category, DeepPartial, Emoji, Translation } from './types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Categories, emojiesData, STORAGE_KEY, translation } from './constants';
import { TextInput } from 'react-native';
import { Platform } from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { ModedTheme, theme } from './theme';
import EmojiCell from './components/EmojiCell';
import Toolbar, { ToolbarProps } from './components/Toolbar';


type EmojiPickerProps = {
  mode: 'light' | 'dark';
  theme?: DeepPartial<ModedTheme>;
  columnCount?: number;
  translation?: DeepPartial<Translation>;
  lang?: string;
  onSelect: (emoji: string) => void;
  toolbarProps?: Pick<ToolbarProps, 'iconWidth'>;
  searchBarProps?: Partial<TextInputProps>;
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ mode = 'light', columnCount = 6, lang = 'en', onSelect, theme: customTheme, translation: customTranslation, toolbarProps, searchBarProps }) => {
  const [isReady, setIsReady] = useState(false);
  const [colSize, setColSize] = useState(0);
  const [recentEmojis, setRecentEmojis] = useState<Emoji[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const themeMode = useMemo(() => {
    if (customTheme) {
      return deepMerge(theme, customTheme)[mode];
    }
    return theme[mode];
  }, [mode]);

  const sectionListRef = useRef<SectionList>(null);

const onLayout = useCallback(
  (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    const newColSize = Math.floor((width - 5 * 8 - 8 * 2) / columnCount);
    if (newColSize !== colSize) {
      setColSize(newColSize);
      setIsReady(true);
    }
  },
  [colSize, columnCount]
);

  const setRecentEmojiAsync = useCallback(async (emoji: Emoji) => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      const recentEmojis = data ? JSON.parse(data) : [];
      if (!recentEmojis.some((e: Emoji) => e.unified === emoji.unified)) {
        recentEmojis.unshift(emoji);
        if (recentEmojis.length > 20) {
          recentEmojis.pop(); // Limit to 20 recent emojis
        }
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recentEmojis));
      }
    } catch (error) {
      console.error('Error saving recent emoji:', error);
    }
  }, []);

  const onEmojiPress = useCallback((emoji: Emoji) => {
    onSelect(charFromEmojiObject(emoji));
    setRecentEmojiAsync(emoji);
  }, [onSelect, setRecentEmojiAsync]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const filterEmojiesBySearch = useCallback((text: string) => {
    if (!text.trim()) return emojiesData;
    return emojiesData.filter(
      (emoji) =>
        emoji.name.toLowerCase().includes(text.toLowerCase()) ||
        emoji.short_name.toLowerCase().includes(text.toLowerCase()) ||
        emoji.short_names.some((shortName) => shortName.toLowerCase().includes(text.toLowerCase())),
    );
  }, []);

  const translationObject = useMemo(() => {
    if (customTranslation && customTranslation[lang]) {
      return deepMerge(translation[lang], customTranslation[lang]);
    }
    return translation[lang];
  }, [lang, customTranslation]);

  const filteredEmojies = useMemo(() => filterEmojiesBySearch(searchQuery), [searchQuery]);

  const sections = useMemo(() => {
    return Object.entries(Categories).map(([key, value]) => {
      if (key === 'recents') {
        return {
          title: translationObject.categories[key as Category],
          data: [recentEmojis],
          dataName: value.dataName,
        };
      }

      return {
        title: translationObject.categories[key as Category] || key,
        dataName: value.dataName,
        data: [
          filteredEmojies
            .filter((emoji) => emoji.category === value.dataName)
            .sort((a, b) => a.sort_order - b.sort_order),
        ],
      };
    });
  }, [filteredEmojies, recentEmojis, translationObject]);

  const _getItemLayout = useCallback(
    sectionListGetItemLayout({
      // The height of the row with rowData at the given sectionIndex and rowIndex
      getItemHeight: (rowData, sectionIndex, rowIndex) => {
        if (rowIndex !== 0) {
          return 0;
        }

        const numberOfRows = Math.ceil(rowData.length / columnCount);
        const itemHeight = numberOfRows * colSize;

        return itemHeight;
      },

      // These three properties are optional
      getSeparatorHeight: () => 0,
      getSectionHeaderHeight: () => 18 + 16,
      getSectionFooterHeight: () => 0,
    }),
    [colSize],
  );

  const onSelectCategory = useCallback(
    (category: Category, index: number) => {
      sectionListRef.current?.scrollToLocation({
        sectionIndex: index,
        itemIndex: 0,
        animated: true,
      });
    },
    [setSelectedCategory, sectionListRef.current],
  );

  const renderToolbar = useCallback(() => {
    return (
      <Toolbar
        selectedCategory={selectedCategory || 'recents'}
        onSelectCategory={onSelectCategory}
        theme={themeMode}
        {...toolbarProps}
      />
    );
  }, [onSelectCategory, selectedCategory, themeMode, toolbarProps]);

  const renderSectionItem = useCallback(({ item }: { item: Emoji[] }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          // columnGap: 8,
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
      >
        {item.map((emoji) => (
          <EmojiCell
            key={emoji.unified}
            unified={emoji.unified}
            colSize={colSize}
            onPress={() => onEmojiPress(emoji)}
          />
        ))}
      </View>
    );
  }, [colSize, onEmojiPress]);

  const onViewableItemsChanged = useCallback(
    throttle(
      ({ viewableItems }: { viewableItems: ViewToken<Emoji[]>[]; changed: ViewToken<Emoji[]>[] }) => {
        const firstVisibleSection = viewableItems.find((item) => item.isViewable && item.section);
        if (firstVisibleSection) {
          const visibleSectionDataTitle = firstVisibleSection.section.dataName;
          const category = Object.entries(Categories).find(
            ([, value]) => visibleSectionDataTitle === value.dataName
          );
          if (category) {
            setSelectedCategory(category[0] as Category);
          }
        }
      },
      300
    ),
  [translationObject]
);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        const recentEmojis = JSON.parse(data);
        setRecentEmojis(recentEmojis);
        setSelectedCategory('recents');
      }
    });
  }, []);

  return (
    <View style={[styles.container]} onLayout={onLayout}>
      <View style={[styles.searchBarContainerStyle, themeMode.searchbar.container]}>
        <TextInput
          style={[styles.searchBarTextInputStyle, themeMode.searchbar.textInput]}
          placeholder={translationObject.textInput.placeholder}
          placeholderTextColor={themeMode.searchbar.placeholderColor}
          clearButtonMode="always"
          returnKeyType="done"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={handleSearch}
          {...searchBarProps}
        />
      </View>
      {isReady && (
        <SectionList
          getItemLayout={
            _getItemLayout as unknown as (
              data: any[] | null,
              index: number,
            ) => { length: number; offset: number; index: number }
          }
          onViewableItemsChanged={onViewableItemsChanged}
          horizontal={false}
          initialNumToRender={10}
          windowSize={21}
          contentContainerStyle={[styles.sectionListContentContainerStyle, themeMode.flatList.container]}
          ref={sectionListRef}
          sections={sections}
          renderItem={renderSectionItem}
          keyExtractor={(item, index) => sections[index].dataName || sections[index].title}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }) => {
            if (section.data[0].length === 0) {
              return null;
            }
            return <Text style={[styles.sectionHeaderStyle, themeMode.flatList.section.header]}>{section.title}</Text>;
          }}
        />
      )}
      {renderToolbar()}
    </View>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionListContentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingBottom: 86,
  },
  sectionHeaderStyle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 18,
    marginVertical: 8,
    marginLeft: 8,
  },
  searchBarContainerStyle: {
    width: '100%',
    zIndex: 1,
  },
  searchBarTextInputStyle: {
    ...Platform.select({
      ios: {
        height: 36,
        backgroundColor: '#E5E8E9',
      },
    }),
    paddingLeft: 8,
    borderRadius: 10,
    margin: 8,
  },
});
