// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/nextjs';
import PasswordRequirementsTooltip from './PasswordRequirementsTooltip';

const meta = {
  title: 'Ui/PasswordRequirementsTooltip',
  component: PasswordRequirementsTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordRequirementsTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
