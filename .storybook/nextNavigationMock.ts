// Mock implementation of next/navigation for Storybook

export function useRouter() {
  return {
    push: (url: string) => {
      console.log('[Mock Router] Navigate to:', url);
      return Promise.resolve(true);
    },
    replace: (url: string) => {
      console.log('[Mock Router] Replace with:', url);
      return Promise.resolve(true);
    },
    back: () => console.log('[Mock Router] Go back'),
    forward: () => console.log('[Mock Router] Go forward'),
    refresh: () => console.log('[Mock Router] Refresh'),
    prefetch: () => Promise.resolve(),
  };
}

export function useSearchParams() {
  // Get query params from window location if available
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
}

export function usePathname() {
  // Get pathname from window location if available
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '/';
}

export function useParams() {
  return {};
}

export function useSelectedLayoutSegment() {
  return null;
}

export function useSelectedLayoutSegments() {
  return [];
}

// Re-export other navigation utilities as pass-throughs
export { redirect, permanentRedirect, notFound } from 'next/dist/client/components/navigation';

