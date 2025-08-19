# React Native Emoji Chooser

A customizable and lightweight Emoji Picker component for React Native applications, built to provide a seamless emoji selection experience with support for multiple languages, themes, and layouts.

## Features
- **Customizable Themes**: Supports light and dark modes with deep partial theme customization.
- **Multi-language Support**: Configurable translations for category names and text input placeholders.
- **Flexible Layout**: Adjustable column count for emoji grid display.
- **Recent Emojis**: Automatically tracks and displays recently used emojis.
- **400+ Emojies**: Emojies sourced from [emoji-datasource](github.com/iamcal/emoji-data) 

## Installation

```bash
npm install react-native-emoji-picker
```

## Usage

Below is an example of how to integrate the Emoji Picker into your React Native application using a bottom sheet modal.

```tsx
import { Button, StyleSheet, Text, View } from 'react-native';
import EmojiPicker from 'react-native-emoji-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [language, setLanguage] = useState('en');

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSelect = (emoji: string) => {
    console.log('Selected emoji:', emoji);
  };

  return (
    <GestureHandlerRootView>
      <StatusBar style="auto" />
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Button
            title="Open Emoji Picker"
            onPress={handlePresentModalPress}
          />
          <Button
            title="Change Language"
            onPress={() => setLanguage(language === 'en' ? 'uk' : 'en')}
          />
        </View>
        <BottomSheetModal ref={bottomSheetModalRef} enableDynamicSizing enablePanDownToClose={true}>
          <BottomSheetView style={{ height: 700 }}>
            <EmojiPicker
              onSelect={onSelect}
              mode="light"
              lang={language}
              columnCount={6}
              theme={{
                light: {
                  toolbar: {
                    container: {
                      paddingBottom: 24,
                    },
                  },
                },
              }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## Props

### `EmojiPickerProps`

| Prop            | Type                                    | Description                                                                 | Default        |
|-----------------|-----------------------------------------|-----------------------------------------------------------------------------|----------------|
| `mode`          | `'light' \| 'dark'`                     | Theme mode for the emoji picker.                                             | `'light'`      |
| `theme`         | `DeepPartial<ModedTheme>`               | Custom theme configuration for light or dark mode.                           | `{}`           |
| `columnCount`   | `number`                                | Number of columns in the emoji grid.                                        | `6`            |
| `translation`   | `DeepPartial<Translation>`              | Custom translations for categories and text input placeholder.               | `{}`           |
| `lang`          | `string`                                | Language code for translations (e.g., `'en'`, `'uk'`).                      | `'en'`         |
| `onSelect`      | `(emoji: string) => void`               | Callback function triggered when an emoji is selected.                       | **Required**   |
| `toolbarProps`  | `Pick<ToolbarProps, 'iconWidth'>`       | Props for customizing the toolbar.                       | `{}`           |
| `searchBarProps`  | `Partial<TextInputProps>`       | Props for customizing the searchbar.                       | `{}`           |

## Types

### `Translation`

Structure for language-specific translations:

```typescript
export interface TranslationLangObject {
  categories: Record<Category, string>;
  textInput: {
    placeholder: string;
  };
}

export type Translation = Record<string, TranslationLangObject>;
```

### `Theme`

Structure for theme configuration:

```typescript
export interface Theme {
  toolbar: {
    icon: {
      defaultColor: string;
      activeColor: string;
    };
    container: StyleProp<ViewStyle>;
  };
  searchbar: {
    container?: StyleProp<ViewStyle>;
    textInput?: StyleProp<TextStyle>;
  };
  flatList: {
    container?: StyleProp<ViewStyle>;
    section: {
      header: StyleProp<TextStyle>;
    }
  }
}
```

### `ModedTheme`

Structure for light and dark mode themes:

```typescript
export interface ModedTheme {
  light: Theme;
  dark: Theme;
}
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on the [GitHub repository](https://github.com/DimaIvashchuk/react-native-emoji-picker) for bug reports, feature requests, or improvements.

## License

This project is licensed under the MIT License.