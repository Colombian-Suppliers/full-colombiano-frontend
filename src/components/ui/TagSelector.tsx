// @ts-nocheck
import React from 'react';import { useState } from 'react';
import { MdChevronRight, MdClose } from 'react-icons/md';
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/**
 * TagSelector Component
 * Permite selección múltiple de tags con modal
 */
const TagSelector = ({
  availableTags,
  loading,
  value,
  onChange,
  placeholder = 'Selecciona etiquetas',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Parse current value to get selected tags
  const currentTags = value
    ? value
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t)
    : [];

  // Filter available tags based on search
  const filteredTags = availableTags.filter((tag) =>
    (tag.name || tag).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTagToggle = (tag) => {
    const tagName = tag.name || tag;
    const newSelected = selectedTags.includes(tagName)
      ? selectedTags.filter((t) => t !== tagName)
      : [...selectedTags, tagName];
    setSelectedTags(newSelected);
  };

  const handleConfirm = () => {
    const allTags = [...new Set([...currentTags, ...selectedTags])];
    onChange(allTags.join(', '));
    setSelectedTags([]);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setSelectedTags([]);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = currentTags.filter((tag) => tag !== tagToRemove);
    onChange(newTags.join(', '));
  };

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="input w-full cursor-not-allowed flex items-center">
          <span className="text-gray-500">Cargando etiquetas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Selector visual */}
      <div className="space-y-2">
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          className={`input w-full cursor-pointer flex items-center justify-between ${
            disabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => !disabled && setIsOpen(true)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
        >
          <span className="text-gray-500">{placeholder}</span>
          <MdChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </div>

        {/* Tags seleccionados */}
        {currentTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {currentTags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <MdClose className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de selección */}
      <Modal
        isOpen={isOpen}
        onClose={handleCancel}
        title="Seleccionar Etiquetas"
        size="md"
      >
        <div className="space-y-4">
          {/* Búsqueda */}
          <Input
            placeholder="Buscar etiquetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />

          {/* Lista de tags disponibles */}
          <div className="max-h-60 overflow-y-auto border rounded-lg">
            {filteredTags.length > 0 ? (
              <div className="p-2 space-y-1">
                {filteredTags.map((tag) => {
                  const tagName = tag.name || tag;
                  const isSelected = selectedTags.includes(tagName);
                  const isAlreadySelected = currentTags.includes(tagName);

                  return (
                    <button
                      key={tag.id || tagName}
                      type="button"
                      onClick={() => !isAlreadySelected && handleTagToggle(tag)}
                      disabled={isAlreadySelected}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        isAlreadySelected
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isSelected
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tagName}
                      {isAlreadySelected && ' (ya seleccionada)'}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No se encontraron etiquetas
              </div>
            )}
          </div>

          {/* Tags que se van a agregar */}
          {selectedTags.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">
                Etiquetas a agregar:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleTagToggle({ name: tag })}
                      className="hover:bg-green-200 rounded-full p-0.5"
                    >
                      <MdClose className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedTags.length === 0}
            >
              Agregar {selectedTags.length > 0 && `(${selectedTags.length})`}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TagSelector;
