import { Button, StyleSheet, Text, View } from 'react-native';
import EmojiPicker from './dist/index'
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
          <BottomSheetView style={{ height: 700}}>
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
