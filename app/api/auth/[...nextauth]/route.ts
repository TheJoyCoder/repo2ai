'use server';

import { GET, POST } from '@/lib/auth';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET must be set');
}

export { GET, POST };

