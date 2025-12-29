# Authentication Components

This directory contains all authentication-related components organized by user flow.

## Directory Structure

```
auth/
├── buyer/              # Buyer registration flow (4 steps)
│   ├── Step1PersonalInfo.tsx
│   ├── Step2PersonalInfo.tsx
│   ├── Step3Credentials.tsx
│   ├── *.stories.tsx
│   └── index.ts
├── seller/             # Seller registration flows
│   ├── Step1PersonType.tsx          # Shared: Person type selection
│   ├── Step2StoreInfo.tsx           # Shared: Store information
│   ├── natural/                     # Natural person flow (4 steps)
│   │   ├── Step2PersonalInfo.tsx
│   │   ├── Step3Credentials.tsx
│   │   ├── *.stories.tsx
│   │   ├── NaturalSellerFlow.stories.tsx
│   │   └── index.ts
│   ├── juridica/                    # Juridica person flow (5 steps)
│   │   ├── Step2CompanyInfo.tsx
│   │   ├── Step3Representative.tsx
│   │   ├── Step4Credentials.tsx
│   │   ├── *.stories.tsx
│   │   ├── JuridicaSellerFlow.stories.tsx
│   │   └── index.ts
│   └── index.ts
├── shared/             # Shared authentication components
│   ├── AccountTypeSelector.tsx
│   ├── *.stories.tsx
│   └── index.ts
├── RegisterFlow.stories.tsx  # Complete registration flow demo
└── index.ts            # Main export file
```

## User Flows

### Buyer Registration Flow (4 steps)

1. **Account Type Selection** (`shared/AccountTypeSelector`)
   - User selects "Buyer" account type

2. **Step 1: Personal Information** (`buyer/Step1PersonalInfo`)
   - First name, last name, email, phone

3. **Step 2: Additional Personal Info** (`buyer/Step2PersonalInfo`)
   - Document type, document number

4. **Step 3: Credentials** (`buyer/Step3Credentials`)
   - Password, confirm password, terms & conditions

### Seller Registration Flow

#### Natural Person (4 steps)

1. **Step 1: Person Type** (`seller/Step1PersonType`)
   - User selects "Natural Person"

2. **Step 2: Store Information** (`seller/Step2StoreInfo`)
   - Store name, categories, location, contact info

3. **Step 3: Personal Information** (`seller/natural/Step2PersonalInfo`)
   - First name, last name, document type, document number

4. **Step 4: Credentials** (`seller/natural/Step3Credentials`)
   - Password, confirm password, terms & conditions

#### Juridica Person (5 steps)

1. **Step 1: Person Type** (`seller/Step1PersonType`)
   - User selects "Juridica Person"

2. **Step 2: Store Information** (`seller/Step2StoreInfo`)
   - Store name, categories, location, contact info

3. **Step 3: Company Information** (`seller/juridica/Step2CompanyInfo`)
   - Company name, document type, document number

4. **Step 4: Legal Representative** (`seller/juridica/Step3Representative`)
   - Representative's personal information

5. **Step 5: Credentials** (`seller/juridica/Step4Credentials`)
   - Password, confirm password, terms & conditions

## Usage

### Importing Components

```tsx
// Import from main auth index (recommended)
import { 
  BuyerStep1PersonalInfo, 
  SellerStep2StoreInfo,
  NaturalStep2PersonalInfo,
  JuridicaStep2CompanyInfo,
  AccountTypeSelector 
} from '@/components/auth';

// Or import from specific folders
import { BuyerStep1PersonalInfo } from '@/components/auth/buyer';
import { SellerStep2StoreInfo } from '@/components/auth/seller';
import { NaturalStep2PersonalInfo } from '@/components/auth/seller/natural';
import { JuridicaStep2CompanyInfo } from '@/components/auth/seller/juridica';
import { AccountTypeSelector } from '@/components/auth/shared';
```

### Component Props

All step components follow a consistent prop pattern:

```tsx
interface StepProps {
  register: UseFormRegister<any>;  // react-hook-form register function
  watch: UseFormWatch<any>;         // react-hook-form watch function
  errors: FieldErrors;              // Form validation errors
  next?: () => void;                // Navigate to next step
  prev?: () => void;                // Navigate to previous step
  setValue?: UseFormSetValue<any>;  // Set form values
  isLoading?: boolean;              // Loading state for final step
}
```

## Design Principles

1. **Separation of Concerns**: Each user type (buyer/seller) has its own folder
2. **Clear Naming**: Step numbers indicate the order in the flow
3. **Shared Components**: Common components are in the `shared/` folder
4. **Consistent Interface**: All step components follow the same prop pattern
5. **Self-Documenting**: Component names clearly indicate their purpose

## Testing

Each component has a corresponding `.stories.tsx` file for Storybook:
- View individual steps in isolation
- Test different states and error conditions
- See the complete flow in `RegisterFlow.stories.tsx`

## Related Files

- `/src/app/(auth)/register/page.tsx` - Main registration page
- `/src/app/(auth)/login/page.tsx` - Login page
- `/src/lib/hooks/useAuth.ts` - Authentication hook
- `/src/lib/hooks/useFormValidation.ts` - Form validation hook

