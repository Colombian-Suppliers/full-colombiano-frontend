import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ModalBase from './ModalBase';
import Button from '@/components/ui/Button/Button';

const meta: Meta<typeof ModalBase> = {
  title: 'Modals/ModalBase',
  component: ModalBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalBase>;

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <ModalBase
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Pequeño"
          size="sm"
        >
          <p>Este es un modal pequeño con contenido simple.</p>
        </ModalBase>
      </>
    );
  },
};

export const Medium: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Medium Modal</Button>
        <ModalBase
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Mediano"
          size="md"
        >
          <div className="space-y-4">
            <p>Este es un modal mediano con más contenido.</p>
            <p>Puede contener formularios, información detallada, etc.</p>
          </div>
        </ModalBase>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <ModalBase
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Grande"
          size="lg"
        >
          <div className="space-y-4">
            <p>Este es un modal grande para contenido extenso.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 rounded">Columna 1</div>
              <div className="p-4 bg-gray-100 rounded">Columna 2</div>
            </div>
          </div>
        </ModalBase>
      </>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal Without Title</Button>
        <ModalBase isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Contenido Personalizado</h2>
            <p>Modal sin título predefinido.</p>
          </div>
        </ModalBase>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal (No Close Button)</Button>
        <ModalBase
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Sin botón de cerrar"
          showCloseButton={false}
          closeOnBackdrop={false}
        >
          <div className="space-y-4">
            <p>Este modal no se puede cerrar haciendo clic fuera.</p>
            <Button onClick={() => setIsOpen(false)}>Cerrar Manualmente</Button>
          </div>
        </ModalBase>
      </>
    );
  },
};

