import { StyleProp, TextStyle, ViewStyle } from "react-native";

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

export interface ModedTheme {
  light: Theme;
  dark: Theme;
}

export const theme: ModedTheme = {
  light: {
    toolbar: {
      icon: {
        defaultColor: '#707174',
        activeColor: '#216BFC',
      },
      container: {
        backgroundColor: '#f0f0f0',
      },
    },
    searchbar: {
      container: {
        backgroundColor: '#fff',
      },
      textInput: {
        color: '#111827',
        backgroundColor: '#F7F8FA',
      },
      placeholderColor: '#808999',
    },
    flatList: {
      section: {
        header: {
          color: '#000',
        }
      }
    }
  },
  dark: {
    toolbar: {
      icon: {
        defaultColor: '#707174',
        activeColor: '#216BFC',
      },
      container: {
        backgroundColor: '#12151F',
      },
    },
    searchbar: {
      container: {
        backgroundColor: '#111827',
      },
      textInput: {
        color: '#fff',
        backgroundColor: '#1F2937'
      },
      placeholderColor: '#9CA3AF',
    },
    flatList: {
      section: {
        header: {
          color: '#fff',
        }
      }
    }
  },
};
