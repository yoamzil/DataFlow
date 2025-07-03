  // src/hooks/useAuthGuard.ts
  import { useEffect } from 'react';
  import { useRouter } from 'next/navigation';

  export function useAuthGuard() {
    const router = useRouter();
    useEffect(() => {
      const isAuthenticated = document.cookie.split('; ').some(cookie => cookie === 'isAuthenticated=true');
      if (!isAuthenticated) {
        router.replace('/login');
      }
    }, [router]);
  }