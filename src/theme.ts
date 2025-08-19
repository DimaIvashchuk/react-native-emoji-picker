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
    textInput?: StyleProp<TextStyle>;
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
        backgroundColor: '#f0f0f0',
      },
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
        backgroundColor: '#f0f0f0',
      },
    },
    searchbar: {

      container: {
        backgroundColor: '#f0f0f0',
      },
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
