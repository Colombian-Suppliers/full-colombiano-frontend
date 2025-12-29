// @ts-nocheck
'use client';
import React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { IoChevronDown } from 'react-icons/io5';

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

interface ActionIcon {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

/**
 * Header
 * Main navigation component for the landing page
 * Includes logo, navigation menu, and action icons
 */
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tiendaDropdownOpen, setTiendaDropdownOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Quiénes somos', href: '/about-us' },
    {
      label: 'Tienda',
      href: '/marketplace',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Todos los productos', href: '/marketplace' },
        { label: 'Categorías', href: '/marketplace/categories' },
        { label: 'Ofertas', href: '/marketplace/offers' },
      ],
    },
    { label: 'Contáctenos', href: '#contact' },
    { label: 'Blog', href: '/blog' },
  ];

  const actionIcons: ActionIcon[] = [
    { Icon: FiSearch, label: 'Buscar', href: '#search' },
    { Icon: FiHeart, label: 'Favoritos', href: '/favorites' },
    { Icon: FiUser, label: 'Mi cuenta', href: '/login' },
    { Icon: FiShoppingBag, label: 'Carrito', href: '/cart' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Full Colombiano"
              width={120}
              height={48}
              className="h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setTiendaDropdownOpen(true)}
                    onMouseLeave={() => setTiendaDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-secondary-600 font-medium transition-colors">
                      {link.label}
                      <IoChevronDown
                        className={`w-4 h-4 transition-transform ${tiendaDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {tiendaDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                        {link.dropdownItems?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-secondary-50 hover:text-secondary-600 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-secondary-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Action Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {actionIcons.map(({ Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-secondary-600 hover:border-secondary-300 transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setTiendaDropdownOpen(!tiendaDropdownOpen)
                        }
                        className="flex items-center justify-between w-full text-gray-700 font-medium py-2"
                      >
                        {link.label}
                        <IoChevronDown
                          className={`w-4 h-4 transition-transform ${tiendaDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {tiendaDropdownOpen && (
                        <div className="pl-4 mt-2 space-y-2">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="block text-gray-600 hover:text-secondary-600 py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-gray-700 font-medium py-2 hover:text-secondary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Action Icons */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {actionIcons.map(({ Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600"
                    aria-label={label}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

Header.displayName = 'Header';


export default Header;
