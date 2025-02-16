import { GalleryVerticalEnd } from 'lucide-react';
import { LoginForm } from '@/components/login-form';

export const metadata = {
  title: 'Havys ERP Login',
  description: 'Havys ERP Prototype Login Page'
};

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MillOffice_18022019.jpg-1OQOdkD5q0MWT1tyGuHm43YtfiPqGo.jpeg"
          alt="Havys Oil Mill Sdn Bhd Factory"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            HAVYS OIL MILL SDN BHD
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
