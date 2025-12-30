'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { MdStore, MdLocationOn, MdPhone, MdEmail, MdImage } from 'react-icons/md';
import toast from 'react-hot-toast';

interface StoreProfile {
  name: string;
  description: string;
  logo: string;
  banner: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

/**
 * Store Profile Page
 * Complete store management with profile editing, images, and social media
 */
export default function StorePage() {
  const [storeProfile, setStoreProfile] = useState<StoreProfile>({
    name: 'Mi Tienda',
    description: 'Descripción de mi tienda',
    logo: '',
    banner: '',
    address: 'Calle 123 #45-67',
    city: 'Bogotá',
    phone: '+57 300 123 4567',
    email: 'tienda@example.com',
    website: 'https://mitienda.com',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoreProfile();
  }, []);

  const loadStoreProfile = async () => {
    try {
      setLoading(true);
      // TODO: const data = await storeApiService.getProfile();
      // setStoreProfile(data);
    } catch (error) {
      console.error('Error loading store profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // TODO: await storeApiService.updateProfile(storeProfile);
      toast.success('Perfil actualizado exitosamente');
      setEditing(false);
    } catch (error) {
      toast.error('Error al actualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('socialMedia.')) {
      const socialField = field.split('.')[1];
      setStoreProfile({
        ...storeProfile,
        socialMedia: {
          ...storeProfile.socialMedia,
          [socialField]: value,
        },
      });
    } else {
      setStoreProfile({
        ...storeProfile,
        [field]: value,
      });
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#0d141b] text-4xl font-black leading-tight tracking-[-0.033em]">
                Perfil de Tienda
              </p>
              <p className="text-gray-600 mt-1">
                Gestiona la información pública de tu tienda
              </p>
            </div>
            <div className="flex gap-3">
              {editing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(false);
                      loadStoreProfile();
                    }}
                    disabled={saving}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)}>Editar Perfil</Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MdStore className="text-primary" />
                Logo de Tienda
              </h3>
              <div className="flex flex-col items-center gap-4">
                {storeProfile.logo ? (
                  <img
                    src={storeProfile.logo}
                    alt="Store Logo"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                    <MdImage className="text-4xl text-gray-400" />
                  </div>
                )}
                {editing && (
                  <Button variant="outline" size="sm" disabled>
                    <MdImage className="mr-2" />
                    Cambiar Logo
                  </Button>
                )}
              </div>
            </div>

            {/* Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Banner de Tienda</h3>
              <div className="flex flex-col gap-4">
                {storeProfile.banner ? (
                  <img
                    src={storeProfile.banner}
                    alt="Store Banner"
                    className="w-full h-32 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-32 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                    <MdImage className="text-4xl text-gray-400" />
                  </div>
                )}
                {editing && (
                  <Button variant="outline" size="sm" disabled>
                    <MdImage className="mr-2" />
                    Cambiar Banner
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Información Básica</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Tienda
                  </label>
                  {editing ? (
                    <Input
                      value={storeProfile.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{storeProfile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  {editing ? (
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                      value={storeProfile.description}
                      onChange={(e) =>
                        handleChange('description', e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-900">{storeProfile.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <MdLocationOn className="text-primary" />
                    Dirección
                  </label>
                  {editing ? (
                    <Input
                      value={storeProfile.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{storeProfile.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  {editing ? (
                    <Input
                      value={storeProfile.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{storeProfile.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <MdPhone className="text-primary" />
                    Teléfono
                  </label>
                  {editing ? (
                    <Input
                      value={storeProfile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{storeProfile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <MdEmail className="text-primary" />
                    Email
                  </label>
                  {editing ? (
                    <Input
                      type="email"
                      value={storeProfile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{storeProfile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sitio Web
                  </label>
                  {editing ? (
                    <Input
                      type="url"
                      value={storeProfile.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">
                      {storeProfile.website || 'No especificado'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook
                  </label>
                  {editing ? (
                    <Input
                      type="url"
                      placeholder="https://facebook.com/mitienda"
                      value={storeProfile.socialMedia.facebook}
                      onChange={(e) =>
                        handleChange('socialMedia.facebook', e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-900">
                      {storeProfile.socialMedia.facebook || 'No especificado'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  {editing ? (
                    <Input
                      type="url"
                      placeholder="https://instagram.com/mitienda"
                      value={storeProfile.socialMedia.instagram}
                      onChange={(e) =>
                        handleChange('socialMedia.instagram', e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-900">
                      {storeProfile.socialMedia.instagram || 'No especificado'}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  {editing ? (
                    <Input
                      type="url"
                      placeholder="https://twitter.com/mitienda"
                      value={storeProfile.socialMedia.twitter}
                      onChange={(e) =>
                        handleChange('socialMedia.twitter', e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-900">
                      {storeProfile.socialMedia.twitter || 'No especificado'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
