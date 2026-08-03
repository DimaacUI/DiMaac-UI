import { Suspense } from 'react';
import LoginForm from '@/core/admin/LoginForm';
import DimaacMark from '@/core/admin/DimaacMark';

export default function AdminLoginPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <DimaacMark width={132} className="text-white" />
          <div className="space-y-2">
            <h1 className="text-lg font-bold">Admin</h1>
            <p className="text-sm text-white/50">Sign in to manage templates and components.</p>
          </div>
        </div>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
