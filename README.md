# React Native Emoji Chooser

A customizable and lightweight Emoji Picker component for React Native applications, built to provide a seamless emoji selection experience with support for multiple languages, themes, and layouts.

<div style="display: flex; justify-content: center; column-gap: 40px;">
  <img src="https://github.com/DimaIvashchuk/react-native-emoji-picker/blob/master/assets/screenshot1.png" alt="Demo static white" height="400px"/>
  <img src="https://github.com/DimaIvashchuk/react-native-emoji-picker/blob/master/assets/screenshot2.png" alt="Demo static search" height="400px"/>
  <img src="https://github.com/DimaIvashchuk/react-native-emoji-picker/blob/master/assets/screenshot3.png" alt="Demo static dark" height="400px"/>
</div>

<div style="display: flex; justify-content: center; column-gap: 40px;">
  <img src="https://github.com/DimaIvashchuk/react-native-emoji-picker/blob/master/assets/dark.gif" alt="Demo dark" height="400px"/>
  <img src="https://github.com/DimaIvashchuk/react-native-emoji-picker/blob/master/assets/white.gif" alt="Demo white" height="400px"/>
  <img src="https://github.com/DimaIvashchuk/react-native-emoji-picker/blob/master/assets/gifted-chat.gif" alt="Demo Gifted Chat" height="400px"/>
</div>

## Features
- **Render**: Render within bottom sheet or as a standalone view
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSelect = (emoji: string) => {
    console.log('Selected emoji:', emoji);
  };

  return (
    <GestureHandlerRootView>
      <StatusBar style={theme === 'light' ? 'light' : 'dark'} />
      <BottomSheetModalProvider>
         <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#000' }]}>
          <Button
            title="Open Emoji Picker"
            onPress={handlePresentModalPress}
          />
           <Button
            title="Change Language"
            onPress={() => setLanguage(language === 'en' ? 'uk' : 'en')}
          />
          <Button
            title="Change Theme"
            onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          handleIndicatorStyle={{ backgroundColor: theme === 'light' ? '#000' : '#fff' }}
          backgroundStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#111827' }}
          enableDynamicSizing
          enablePanDownToClose={true}
        >
          {/* Fixed haight is required so its work with bottom sheet */}
          <BottomSheetView style={{ height: 700 }}>
            <EmojiPicker
              onSelect={onSelect}
              mode={theme}
              lang={language}
              columnCount={6}
              theme={{
                light: {
                  toolbar: {
                    container: {
                      paddingBottom: 24,
                    }
                  }
                },
                dark: {
                  toolbar: {
                    container: {
                      paddingBottom: 24,
                    }
                  }
                }
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
    textInput: StyleProp<TextStyle>;
    placeholderColor: string;
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