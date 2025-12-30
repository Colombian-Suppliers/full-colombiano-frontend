import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import Button from '@/components/ui/Button/Button';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Modals/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Danger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Eliminar Producto</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('¡Producto eliminado!');
            setIsOpen(false);
          }}
          title="¿Eliminar producto?"
          message="Esta acción no se puede deshacer. El producto será eliminado permanentemente."
          confirmText="Sí, eliminar"
          cancelText="Cancelar"
          variant="danger"
        />
      </>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Cancelar Pedido</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('Pedido cancelado');
            setIsOpen(false);
          }}
          title="¿Cancelar pedido?"
          message="El cliente será notificado y el pedido será cancelado."
          confirmText="Sí, cancelar"
          variant="warning"
        />
      </>
    );
  },
};

export const Info: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Más Información</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('Información confirmada');
            setIsOpen(false);
          }}
          title="Información importante"
          message="Tus cambios han sido guardados exitosamente."
          confirmText="Entendido"
          variant="info"
        />
      </>
    );
  },
};

export const Success: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Publicar Producto</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert('¡Producto publicado!');
            setIsOpen(false);
          }}
          title="¡Listo para publicar!"
          message="Tu producto será visible para todos los compradores."
          confirmText="Publicar"
          variant="success"
        />
      </>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Procesar Acción</Button>
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => !loading && setIsOpen(false)}
          onConfirm={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setIsOpen(false);
              alert('¡Completado!');
            }, 2000);
          }}
          title="Procesando solicitud"
          message="Esta operación puede tardar unos segundos."
          confirmText="Procesar"
          loading={loading}
          variant="info"
        />
      </>
    );
  },
};

