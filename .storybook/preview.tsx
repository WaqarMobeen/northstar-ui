import type { Decorator, Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import type { Accent, ThemeMode } from '../src/theme/themeContext';
import '../src/styles/global.css';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as ThemeMode) ?? 'light';
  const accent = (context.globals.accent as Accent) ?? 'blue';

  return (
    <ThemeProvider theme={theme} accent={accent}>
      <div style={{ padding: '2rem', background: 'var(--ns-color-bg-canvas)', minHeight: '100vh' }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Typography', 'Layout', 'Components', '*'],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      description: 'Accent palette',
      defaultValue: 'blue',
      toolbar: {
        title: 'Accent',
        icon: 'paintbrush',
        items: [
          { value: 'blue', title: 'Blue' },
          { value: 'violet', title: 'Violet' },
          { value: 'emerald', title: 'Emerald' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
