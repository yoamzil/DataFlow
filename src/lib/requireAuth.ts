
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('isAuthenticated')?.value === 'true';
  if (!isAuthenticated) {
    redirect('/login');
  }
}