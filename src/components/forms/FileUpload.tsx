import { useState, useRef, ChangeEvent } from 'react';
import { MdCloudUpload, MdClose, MdInsertDriveFile } from 'react-icons/md';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in bytes
  multiple?: boolean;
  value?: File[];
  onChange?: (files: File[]) => void;
  preview?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * FileUpload Component
 * Drag-and-drop file upload with preview
 * Fully testable file input component
 */
export default function FileUpload({
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = false,
  value = [],
  onChange,
  preview = true,
  disabled = false,
  className = '',
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    const filesArray = Array.from(newFiles);
    const validFiles = filesArray.filter((file) => {
      if (file.size > maxSize) {
        alert(`${file.name} es demasiado grande. Máximo ${maxSize / 1024 / 1024}MB`);
        return false;
      }
      return true;
    });

    if (onChange) {
      onChange(multiple ? [...value, ...validFiles] : validFiles);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    if (onChange) {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles);
    }
  };

  return (
    <div className={className}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200
          ${dragActive ? 'border-primary bg-primary-50' : 'border-gray-300 hover:border-primary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <MdCloudUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-sm text-gray-600 mb-1">
          Arrastra archivos aquí o{' '}
          <span className="text-primary font-medium">haz clic para seleccionar</span>
        </p>
        <p className="text-xs text-gray-500">
          Máximo {maxSize / 1024 / 1024}MB por archivo
        </p>
      </div>

      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />

      {/* Preview */}
      {preview && value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {value.map((file, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-lg p-2 group"
            >
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-24 object-cover rounded"
                />
              ) : (
                <div className="w-full h-24 flex items-center justify-center bg-gray-100 rounded">
                  <MdInsertDriveFile className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <p className="text-xs text-gray-600 mt-1 truncate">
                {file.name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MdClose className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

