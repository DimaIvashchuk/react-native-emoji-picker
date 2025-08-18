import { ViewStyle } from "react-native";

export interface Theme {
  toolbar: {
    icon: {
      defaultColor: string;
      activeColor: string;
    };
    container: ViewStyle;
  };
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
  },
};
