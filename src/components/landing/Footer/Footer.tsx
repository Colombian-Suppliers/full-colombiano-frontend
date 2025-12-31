// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks: Record<string, FooterSection> = {
    conocenos: {
      title: 'Conócenos',
      links: [
        { label: 'Nosotros', href: '/about-us' },
        { label: 'Contacto', href: '/contact-us' },
        { label: 'Preguntas frecuentes', href: '/#faq' },
        { label: 'Ayuda/PQR', href: '/help' },
      ],
    },
    enlaces: {
      title: 'Enlaces de interés',
      links: [
        { label: 'Tutoriales', href: '/tutoriales' },
        { label: 'Blog', href: '/blog' },
        { label: 'Foro', href: '/forum' },
        { label: 'Para vendedores', href: '/vendors' },
      ],
    },
    politicas: {
      title: 'Nuestras políticas',
      links: [
        { label: 'Términos y condiciones', href: '/terminos' },
        { label: 'Política de privacidad', href: '/privacy' },
        { label: 'Política de Cookies', href: '/cookies' },
        { label: 'Otras políticas', href: '/policies' },
      ],
    },
  };

  const socialLinks: SocialLink[] = [
    { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
    { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { Icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
    { Icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
    { Icon: FaWhatsapp, href: 'https://wa.me/', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-[#1E1E1E] text-white">
      {/* Main Footer Content */}
      <div className="mr-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center">
          {/* Left: Logo */}
          <div className="flex items-right lg:items-right">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Full Colombiano"
                width={120}
                height={64}
                className="h-12 lg:h-16 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="font-bold text-sm mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Right-side: combined logos image (bigger, visible) */}
          <div className="flex items-center justify-end">
            <Image
              src="/images/landing/logos-footer.webp"
              alt="Logos: apoyos y aliados"
              width={520}
              height={200}
              className="w-[400px] max-w-[420px] h-auto lg:max-w-[520px] object-contain -mr-10 -mt-6"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              Copyright (c) {currentYear} | Full Colombiano | Colombian Suppliers
              SAS - Todos los derechos reservados | Hecho en Colombia con{' '}
              <span className="text-red-500">?</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-[#72B059] flex items-center justify-center text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';


export default Footer;
