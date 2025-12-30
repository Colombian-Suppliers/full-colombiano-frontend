'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button/Button';
import {
  MdWarning,
  MdCheckCircle,
  MdError,
  MdMenuBook,
  MdDescription,
  MdBadge,
  MdUpload,
} from 'react-icons/md';
import toast from 'react-hot-toast';

interface Document {
  type: string;
  status: string;
  uploaded_date?: string;
  rejection_reason?: string;
  name?: string;
  url?: string;
}

interface VerificationStatus {
  storeName: string;
  vendorType: 'natural' | 'legal';
  overallStatus: string;
  message: string;
  lastUpdated: string;
  documents: Document[];
  personal?: {
    name: string;
    documentType: string;
    documentNumber: string;
    email: string;
    address: string;
    phone: string;
  };
  company?: {
    name: string;
    nit: string;
    email: string;
    address: string;
    phone: string;
  };
  legalRepresentative?: {
    name: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
  };
}

/**
 * Verification Page
 * Complete seller verification with document uploads and status tracking
 */
export default function VerificationPage() {
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({
    id_document: null,
    rut: null,
    legal_rep_id: null,
    matriculation: null,
  });

  useEffect(() => {
    loadVerificationStatus();
  }, []);

  const loadVerificationStatus = async () => {
    try {
      setLoading(true);
      // TODO: Load from API
      // const result = await verificationApiService.getStatus();
      // setStatus(result);
      setStatus(null);
    } catch (error) {
      console.error('Error loading verification status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (documentType: string, file: File | null) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Solo se permiten archivos PDF, JPG o PNG');
      return;
    }

    // Validate size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('El archivo no puede superar los 5MB');
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [documentType]: file,
    }));
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

      // TODO: await verificationApiService.uploadDocuments(formData);
      toast.success('Documentos subidos exitosamente');
      loadVerificationStatus();
      setFiles({
        id_document: null,
        rut: null,
        legal_rep_id: null,
        matriculation: null,
      });
    } catch (error) {
      toast.error('Error al subir documentos');
    } finally {
      setUploading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const isApproved = status === 'approved';
    const isRejected = status === 'rejected';

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
          isApproved
            ? 'bg-green-100 text-green-800'
            : isRejected
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {isApproved ? (
          <MdCheckCircle className="w-4 h-4" />
        ) : isRejected ? (
          <MdError className="w-4 h-4" />
        ) : (
          <MdWarning className="w-4 h-4" />
        )}
        <span>
          {isApproved ? 'Verificada' : isRejected ? 'Rechazada' : 'Pendiente'}
        </span>
      </span>
    );
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
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Verificación de la Cuenta</h1>
            <p className="text-sm text-gray-600">
              Verifica tus datos y mantenlos actualizados
            </p>
          </div>
          {status && (
            <div className="hidden sm:flex items-center gap-2">
              {getStatusBadge(status.overallStatus)}
            </div>
          )}
        </div>

        {/* Error state */}
        {!status && !loading && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
            <div className="text-center">
              <MdError className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                Error al cargar verificación
              </h2>
              <p className="text-red-700">
                No se pudo cargar la información de verificación. Inténtalo
                nuevamente más tarde.
              </p>
              <Button
                onClick={loadVerificationStatus}
                className="mt-4"
                variant="outline"
              >
                Reintentar
              </Button>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Verification Status */}
            {status && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="bg-green-50 p-4 rounded-t-lg border-b border-green-100">
                  <h2 className="text-lg font-semibold">Estado de Verificación</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Tienda:</span>
                    <span>{status.storeName}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Tipo de Vendedor:</span>
                    <span>
                      {status.vendorType === 'natural'
                        ? 'Persona Natural'
                        : 'Persona Jurídica'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Estado General:</span>
                    <span className="font-semibold">{status.overallStatus}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Mensaje:</span>
                    <span>{status.message}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Última Actualización:</span>
                    <span>{status.lastUpdated}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Documents Section */}
            {status && status.overallStatus !== 'approved' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4">Subir Documentos</h2>

                {status.documents &&
                  status.documents.some((doc) => doc.status === 'rejected') && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start">
                        <MdWarning className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Documentos Rechazados
                          </h3>
                          <p className="mt-2 text-sm text-yellow-700">
                            Algunos documentos fueron rechazados. Por favor, revisa
                            las razones y sube versiones corregidas.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                <div className="space-y-6">
                  {/* Document upload fields */}
                  {[
                    {
                      type: 'id_document',
                      label: 'Documento de Identidad',
                      icon: MdBadge,
                    },
                    { type: 'rut', label: 'RUT', icon: MdDescription },
                    {
                      type: 'legal_rep_id',
                      label: 'Cédula del Representante Legal',
                      icon: MdBadge,
                    },
                    {
                      type: 'matriculation',
                      label: 'Certificado de Matrícula',
                      icon: MdMenuBook,
                    },
                  ].map((doc) => (
                    <div key={doc.type} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <doc.icon className="text-primary" />
                        {doc.label}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileChange(
                            doc.type,
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                      {files[doc.type] && (
                        <p className="text-xs text-gray-600">
                          Seleccionado: {files[doc.type]?.name}
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <MdUpload />
                    {uploading ? 'Subiendo...' : 'Subir Documentos'}
                  </Button>
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-green-50 p-4 rounded-t-lg border-b border-green-100">
                <h2 className="text-lg font-semibold">Ayuda</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  ¿Necesitas ayuda con la verificación de tu tienda?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <h3 className="font-medium">Información de Contacto</h3>
                    <div className="text-gray-600">
                      <p>Email: soporte@fullcolombiano.com</p>
                      <p>Teléfono: +57 1 234 5678</p>
                      <p>Horario: Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <h3 className="font-medium">Preguntas Frecuentes</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>¿Cuánto tiempo tarda la verificación?</li>
                      <li>¿Qué documentos necesito?</li>
                      <li>¿Qué hacer si mi verificación es rechazada?</li>
                    </ul>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Contactar soporte
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Documents Status */}
          <aside className="sticky top-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="bg-green-50 p-4 rounded-t-lg border-b border-green-100">
                <h2 className="text-lg font-semibold">Documentos</h2>
              </div>
              <div className="p-6">
                {status?.documents && status.documents.length > 0 ? (
                  <div className="space-y-4">
                    {status.documents.map((doc) => (
                      <div
                        key={doc.type}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{doc.type}</h4>
                          {getStatusBadge(doc.status)}
                        </div>
                        {doc.uploaded_date && (
                          <p className="text-xs text-gray-500">
                            Subido: {doc.uploaded_date}
                          </p>
                        )}
                        {doc.rejection_reason && (
                          <p className="text-xs text-red-600 mt-2">
                            Razón: {doc.rejection_reason}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No hay documentos subidos aún
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
