import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-custom-green">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Feria de Empleo Tecmilenio</h1>
            <p className="text-lg text-gray-100">
              Registra tus datos para participar en nuestra rifa y ganar un premio
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <RegistrationForm />
          </div>

          <div className="bg-white rounded-lg mt-8 overflow-hidden">
            <Image
              src="/feria.jpg"
              alt="Empresas"
              width={400}
              height={400}
              className="mx-auto"
            />
          </div>

          <div className="mt-8 text-center">
            <Link href="/admin">
              <Button variant="outline" className="bg-white text-custom-green hover:bg-black-100">
                Panel de Administrador
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer con color #14095D */}
      <footer className="bg-[#14095D] text-white py-4 text-center shadow-md">
        <p className="text-sm font-medium">Creado por: María Fernanda, Emmanuel, Valeria y Gerson</p>
      </footer>
    </div>
  );
}
