import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <Link
          href="/"
          className="mb-8 transition-all duration-500 ease-in-out opacity-100 transform translate-y-0"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={48}
            height={48}
            className="h-12 w-auto cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in"
            priority
          />
        </Link>
        {children}
      </main>
    </div>
  );
}

