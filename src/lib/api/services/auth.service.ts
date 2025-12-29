/**
 * Auth API Service
 * Handles all authentication API requests
 * Principle: Single Responsibility - only handles auth API calls
 */

import httpClient from '../httpClient';
import { API_CONFIG } from '../config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  };
}

export interface RegisterCustomerData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface RegisterVendorNaturalData extends RegisterCustomerData {
  storeName: string;
  storeCategoryIds: string[];
  storePhone: string;
  storeDept: string;
  storeCity: string;
  storeAddress: string;
  storeAddressLine2?: string;
  personalPhone: string;
  personalDept: string;
  personalCity: string;
  personalAddress: string;
  personalAddressLine2?: string;
  personalEmail: string;
  idType: string;
  idNumber: string;
  issuesElectronicInvoice?: boolean;
}

export interface RegisterVendorLegalData extends RegisterVendorNaturalData {
  companyName: string;
  companyNIT: string;
  companyPhone: string;
  companyDept: string;
  companyCity: string;
  companyAddress: string;
  companyAddressLine2?: string;
  companyEmail: string;
  repFirstName: string;
  repLastName: string;
  repIdType: string;
  repIdNumber: string;
  repPhone: string;
  repEmail: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user_id: string;
  role: string;
  token?: string;
  user_display_name?: string;
  user_email?: string;
}

/**
 * Auth API Service
 */
export const authApiService = {
  /**
   * User login
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const payload = {
        username: credentials.email,
        password: credentials.password,
      };

      const response = await httpClient.post<LoginResponse>(
        API_CONFIG.AUTH.LOGIN,
        payload
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const { data } = error.response;
        const rawMessage =
          error.sanitizedMessage ||
          data?.message ||
          data?.error ||
          (typeof data === 'string' ? data : JSON.stringify(data));
        throw new Error(rawMessage);
      }
      const sanitized =
        error?.sanitizedMessage || error?.message || 'Network error';
      throw new Error(sanitized);
    }
  },

  /**
   * Register customer
   */
  async registerCustomer(
    data: RegisterCustomerData
  ): Promise<RegisterResponse> {
    if (!data.acceptTerms || !data.acceptPrivacy) {
      throw new Error(
        'You must accept the terms and conditions and privacy policies'
      );
    }

    const payload = {
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      role: 'customer',
      first_name: data.firstName,
      last_name: data.lastName,
      document_type: data.documentType || 'national_id',
      document_number: data.documentNumber || '',
      accept_terms: true,
      accept_privacy: true,
    };

    const response = await httpClient.post<RegisterResponse>(
      API_CONFIG.AUTH.REGISTER,
      payload
    );
    return response.data;
  },

  /**
   * Register natural vendor
   */
  async registerVendorNatural(
    data: RegisterVendorNaturalData
  ): Promise<RegisterResponse> {
    if (!data.acceptTerms || !data.acceptPrivacy) {
      throw new Error(
        'You must accept the terms and conditions and privacy policies'
      );
    }

    const payload = {
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      role: 'vendor',
      vendor_type: 'natural',
      issues_electronic_invoice: data.issuesElectronicInvoice ?? true,
      accept_terms: true,
      accept_privacy: true,
      store_name: data.storeName,
      store_category_ids: data.storeCategoryIds || [],
      store_phone: data.storePhone,
      store_address: {
        department: data.storeDept,
        city: data.storeCity,
        line_1: data.storeAddress,
        line_2: data.storeAddressLine2 || '',
      },
      first_name: data.firstName,
      last_name: data.lastName,
      document_type: data.idType,
      document_number: data.idNumber,
      personal_phone: data.personalPhone,
      personal_address: {
        department: data.personalDept,
        city: data.personalCity,
        line_1: data.personalAddress,
        line_2: data.personalAddressLine2 || '',
      },
      personal_email: data.personalEmail,
    };

    const response = await httpClient.post<RegisterResponse>(
      API_CONFIG.AUTH.REGISTER,
      payload
    );
    return response.data;
  },

  /**
   * Register legal vendor
   */
  async registerVendorLegal(
    data: RegisterVendorLegalData
  ): Promise<RegisterResponse> {
    if (!data.acceptTerms || !data.acceptPrivacy) {
      throw new Error(
        'You must accept the terms and conditions and privacy policies'
      );
    }

    const payload = {
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      role: 'vendor',
      vendor_type: 'legal',
      issues_electronic_invoice: data.issuesElectronicInvoice ?? true,
      accept_terms: true,
      accept_privacy: true,
      store_name: data.storeName,
      store_category_ids: data.storeCategoryIds || [],
      store_phone: data.storePhone,
      store_address: {
        department: data.storeDept,
        city: data.storeCity,
        line_1: data.storeAddress,
        line_2: data.storeAddressLine2 || '',
      },
      company_name: data.companyName,
      company_document_type: 'nit',
      company_document_number: data.companyNIT,
      company_phone: data.companyPhone,
      company_address: {
        department: data.companyDept,
        city: data.companyCity,
        line_1: data.companyAddress,
        line_2: data.companyAddressLine2 || '',
      },
      company_email: data.companyEmail,
      legal_rep_first_name: data.repFirstName,
      legal_rep_last_name: data.repLastName,
      legal_rep_document_type: data.repIdType,
      legal_rep_document_number: data.repIdNumber,
      legal_rep_phone: data.repPhone,
      legal_rep_email: data.repEmail,
    };

    const response = await httpClient.post<RegisterResponse>(
      API_CONFIG.AUTH.REGISTER,
      payload
    );
    return response.data;
  },

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<{
    success: boolean;
    message: string;
    userId: string;
  }> {
    if (!token) {
      throw new Error('Verification token is required');
    }

    try {
      const response = await httpClient.post(API_CONFIG.AUTH.VERIFY_EMAIL, {
        token,
      });

      if (response.data?.success) {
        return {
          success: true,
          message: response.data.message || 'Email verified successfully',
          userId: response.data.user_id,
        };
      }

      throw new Error(response.data?.message || 'Error verifying email');
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = data?.message || 'Unknown error';

        if (status === 400) {
          errorMessage = data?.message || 'Invalid or expired token';
        }

        throw new Error(errorMessage);
      }

      throw new Error(error?.message || 'Connection error verifying email');
    }
  },

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<{
    success: boolean;
    message: string;
  }> {
    if (!email) {
      throw new Error('Email is required');
    }

    try {
      const response = await httpClient.post(API_CONFIG.AUTH.FORGOT_PASSWORD, {
        email,
      });

      if (response.data?.success) {
        return {
          success: true,
          message: response.data.message || 'Reset email sent successfully',
        };
      }

      throw new Error(response.data?.message || 'Error sending reset email');
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = data?.message || 'Unknown error';

        if (status === 400) {
          errorMessage = 'Invalid email';
        } else if (status === 404) {
          errorMessage = 'User not found';
        }

        throw new Error(errorMessage);
      }

      throw new Error(
        error?.message || 'Connection error requesting password reset'
      );
    }
  },

  /**
   * Reset password
   */
  async resetPassword(data: {
    token: string;
    new_password: string;
    confirm_password: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> {
    const { token, new_password, confirm_password } = data;

    if (!token || !new_password || !confirm_password) {
      throw new Error('Token, new password and confirmation are required');
    }

    if (new_password !== confirm_password) {
      throw new Error('Passwords do not match');
    }

    try {
      const response = await httpClient.post(API_CONFIG.AUTH.RESET_PASSWORD, {
        token,
        new_password,
        confirm_password,
      });

      if (response.data?.success) {
        return {
          success: true,
          message: response.data.message || 'Password updated successfully',
        };
      }

      throw new Error(response.data?.message || 'Error resetting password');
    } catch (error: any) {
      if (error.response) {
        const { status, data: errorData } = error.response;
        let errorMessage = errorData?.message || 'Unknown error';

        if (status === 400) {
          errorMessage =
            errorData?.message || 'Invalid data for password reset';
        }

        throw new Error(errorMessage);
      }

      throw new Error(error?.message || 'Connection error resetting password');
    }
  },

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<{
    success: boolean;
    message: string;
  }> {
    if (!email) {
      throw new Error('Email is required');
    }

    try {
      const response = await httpClient.post(
        API_CONFIG.AUTH.RESEND_VERIFICATION,
        { email }
      );

      if (response.data?.success) {
        return {
          success: true,
          message:
            response.data.message ||
            'Verification email resent successfully',
        };
      }

      throw new Error(
        response.data?.message || 'Error resending verification'
      );
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = data?.message || 'Unknown error';

        if (status === 400) {
          errorMessage = data?.message || 'Invalid or already verified email';
        } else if (status === 404) {
          errorMessage = 'User not found';
        }

        throw new Error(errorMessage);
      }

      throw new Error(
        error?.message || 'Connection error resending verification'
      );
    }
  },

  /**
   * Resend password reset
   */
  async resendPasswordReset(email: string): Promise<{
    success: boolean;
    message: string;
    userId: string;
  }> {
    if (!email) {
      throw new Error('Email is required');
    }

    try {
      const response = await httpClient.post(
        API_CONFIG.AUTH.RESEND_PASSWORD_RESET,
        { email }
      );

      if (response.data?.success) {
        return {
          success: true,
          message:
            response.data.message || 'Reset email resent successfully',
          userId: response.data.user_id,
        };
      }

      throw new Error(
        response.data?.message || 'Error resending password reset'
      );
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = data?.message || 'Unknown error';

        if (status === 400) {
          errorMessage = data?.message || 'Invalid or unverified email';
        } else if (status === 404) {
          errorMessage = 'User not found';
        }

        throw new Error(errorMessage);
      }

      throw new Error(
        error?.message || 'Connection error resending password reset'
      );
    }
  },
};

export default authApiService;

