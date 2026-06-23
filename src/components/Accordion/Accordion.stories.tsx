import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from './Accordion';

const meta = {
  title: 'Disclosure/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
  { value: 'plans', q: 'How does billing work?', a: 'You are billed monthly or annually per active seat. Changes are prorated.' },
  { value: 'sso', q: 'Do you support SSO?', a: 'SAML and OIDC single sign-on are available on the Enterprise plan.' },
  { value: 'data', q: 'Where is my data stored?', a: 'Data is stored in your selected region and encrypted at rest.' },
];

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue={['plans']}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionPanel>{item.a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={['plans', 'sso']}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionPanel>{item.a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
