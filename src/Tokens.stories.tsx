import type { Meta, StoryObj } from '@storybook/react';
import { space, radius, shadow, fontSize } from './tokens/tokens';
import { Stack } from './components/Stack/Stack';
import { Inline } from './components/Inline/Inline';
import { Heading } from './components/Heading/Heading';
import { Text } from './components/Text/Text';

const meta: Meta = {
  title: 'Foundations/Design tokens',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const semanticColors = [
  '--ns-color-bg-canvas',
  '--ns-color-bg-surface',
  '--ns-color-bg-subtle',
  '--ns-color-bg-muted',
  '--ns-color-fg-default',
  '--ns-color-fg-muted',
  '--ns-color-fg-subtle',
  '--ns-color-border-default',
  '--ns-color-accent-solid',
  '--ns-color-accent-soft',
  '--ns-color-success-solid',
  '--ns-color-warning-solid',
  '--ns-color-danger-solid',
  '--ns-color-info-solid',
];

export const Colors: Story = {
  render: () => (
    <Stack gap={4}>
      <Heading level={3} size="md">Semantic colors</Heading>
      <Text size="sm" tone="muted">
        Toggle the Theme and Accent toolbars to see these values re-resolve.
      </Text>
      <Inline gap={4}>
        {semanticColors.map((token) => (
          <Stack key={token} gap={1} align="start" style={{ width: 150 }}>
            <span
              style={{
                width: '100%',
                height: 48,
                borderRadius: 'var(--ns-radius-md)',
                border: '1px solid var(--ns-color-border-default)',
                background: `var(${token})`,
              }}
            />
            <Text size="xs" tone="subtle" style={{ fontFamily: 'var(--ns-font-mono)' }}>
              {token.replace('--ns-color-', '')}
            </Text>
          </Stack>
        ))}
      </Inline>
    </Stack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Stack gap={2}>
      <Heading level={3} size="md">Spacing scale</Heading>
      {Object.entries(space).map(([key, value]) => (
        <Inline key={key} gap={3} align="center">
          <Text size="xs" tone="subtle" style={{ width: 40 }}>{key}</Text>
          <span style={{ height: 16, width: value, background: 'var(--ns-color-accent-solid)', borderRadius: 2 }} />
          <Text size="xs" tone="muted">{value}</Text>
        </Inline>
      ))}
    </Stack>
  ),
};

export const RadiusAndElevation: Story = {
  render: () => (
    <Stack gap={5}>
      <Stack gap={2}>
        <Heading level={3} size="md">Radius</Heading>
        <Inline gap={4}>
          {Object.entries(radius).map(([key, value]) => (
            <Stack key={key} gap={1} align="center">
              <span style={{ width: 64, height: 64, background: 'var(--ns-color-bg-muted)', borderRadius: value }} />
              <Text size="xs" tone="subtle">{key}</Text>
            </Stack>
          ))}
        </Inline>
      </Stack>
      <Stack gap={2}>
        <Heading level={3} size="md">Elevation</Heading>
        <Inline gap={5}>
          {Object.entries(shadow).map(([key, value]) => (
            <Stack key={key} gap={1} align="center">
              <span style={{ width: 96, height: 64, background: 'var(--ns-color-bg-surface)', borderRadius: 'var(--ns-radius-md)', boxShadow: value }} />
              <Text size="xs" tone="subtle">{key}</Text>
            </Stack>
          ))}
        </Inline>
      </Stack>
      <Stack gap={2}>
        <Heading level={3} size="md">Type scale</Heading>
        {Object.entries(fontSize).map(([key, value]) => (
          <Text key={key} style={{ fontSize: value }}>{key} — The quick brown fox</Text>
        ))}
      </Stack>
    </Stack>
  ),
};
