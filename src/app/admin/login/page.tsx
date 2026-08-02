import { Suspense } from 'react';
import LoginForm from '@/core/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">DiMaac Admin</h1>
          <p className="text-sm text-white/50">Sign in to manage templates and components.</p>
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
