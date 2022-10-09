import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { Theme } from '@mui/system';
import { ColorMode, LocalStorageKeys } from '../types';

type ContextProps = {
  mode: ColorMode;
  toggleColorMode: () => void;
  theme: Theme;
};

interface Props {
  children: JSX.Element;
}

export const ThemeStoreContext = React.createContext<Partial<ContextProps>>({});

export function useThemeStore(): Partial<ContextProps> {
  return useContext(ThemeStoreContext);
}

export const ThemeStoreProvider = ({ children }: Props): JSX.Element => {
  const [mode, setMode] = useState<ColorMode>(ColorMode.Light);

  useEffect(() => {
    const storedTheme = localStorage.getItem(LocalStorageKeys.Theme);

    if (storedTheme) {
      setMode(storedTheme as ColorMode);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: 16,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
        },
        palette: {
          mode,
          background: {
            default: mode === ColorMode.Dark ? '#212738' : '#FDFFFC',
          },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );

  const toggleColorMode = (): void => {
    setMode((prev: ColorMode) => {
      const newMode =
        prev === ColorMode.Light ? ColorMode.Dark : ColorMode.Light;

      localStorage.setItem(LocalStorageKeys.Theme, newMode);

      return newMode;
    });
  };

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode,
      theme,
    }),
    [mode, theme],
  );

  return (
    <ThemeStoreContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeStoreContext.Provider>
  );
};
