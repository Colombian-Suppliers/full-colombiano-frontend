// @ts-nocheck
import React from 'react';import { Card } from "@/components/ui/Card";
import { MdVerified } from 'react-icons/md';
import {
  getVerificationStatusStyles,
  getVerificationStatusText,
  getVerificationStatusDescription,
} from "@/utils/storeUtils";

/**
 * Componente para mostrar el estado de verificación de la tienda
 * Principio: Single Responsibility - solo muestra estado de verificación
 */
const VerificationStatusCard = ({ verificationStatus }) => {
  const styles = getVerificationStatusStyles(verificationStatus);
  const statusText = getVerificationStatusText(verificationStatus);
  const description = getVerificationStatusDescription(verificationStatus);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <MdVerified className="text-primary-600 text-xl" />
        <h2 className="text-lg font-semibold">Verificación</h2>
      </div>
      <div className={`p-4 rounded-lg border ${styles.container}`}>
        <div className="flex items-center gap-2 mb-2">
          <MdVerified className="text-lg" />
          <span className="font-medium">{statusText}</span>
        </div>
        <p className="text-sm">{description}</p>
      </div>
    </Card>
  );
};

export default VerificationStatusCard;
