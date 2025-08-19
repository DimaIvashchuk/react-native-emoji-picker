import { Appearance, Button, StyleSheet, Text, View } from 'react-native';
import EmojiPicker from './dist/index'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
