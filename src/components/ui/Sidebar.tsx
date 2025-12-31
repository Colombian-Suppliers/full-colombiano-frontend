// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from "@/lib/hooks/useAuth";
import { ROUTES } from "@/config/routes.config";
import {
  MdDashboard,
  MdInventory,
  MdReceipt,
  MdStar,
  MdChevronLeft,
  MdQuestionAnswer,
  MdAssignmentReturn,
  MdVerified,
  MdSettings,
  MdStore,
  MdHelp,
  MdKeyboardArrowRight,
  MdLogout,
  MdNotifications,
  MdLocalShipping,
  MdRequestQuote,
  MdPerson,
  MdAccountBalance,
  MdShare,
  MdBarChart,
  MdLocalAtm,
  MdLocalOffer,
  MdGroup,
} from 'react-icons/md';

/**
 * Sidebar Component
 * Principio: Single Responsibility - maneja solo la navegación lateral
 * Principio: Open/Closed - extensible agregando items al array menuItems
 */
const Sidebar = ({ collapsed = false, onToggle }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const unreadAnnouncementsCount = 0;
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside (classic mousedown listener)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSettingsDropdown(false);
      }
    };

    if (showSettingsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSettingsDropdown]);

  // Keep original settings overlay behavior (static classes). No mount/unmount timer so behavior remains unchanged.

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSettingsAction = (action) => {
    setShowSettingsDropdown(false);
    switch (action) {
      case 'logout':
        handleLogout();
        break;
      case 'verification':
        router.push(ROUTES.DASHBOARD_VERIFICATION);
        break;
      case 'store':
        router.push(ROUTES.DASHBOARD_STORE);
        break;
      case 'help':
        router.push(ROUTES.DASHBOARD_HELP);
        break;
      case 'bank':
        // Route to bank account settings (fallback to settings)
        router.push(ROUTES.DASHBOARD_SETTINGS);
        break;
      case 'shipping':
        router.push(ROUTES.DASHBOARD_SHIPMENTS);
        break;
      case 'socials':
        // Socials fallback to settings
        router.push(ROUTES.DASHBOARD_SETTINGS);
        break;
      case 'general':
        router.push(ROUTES.DASHBOARD_SETTINGS);
        break;
      default:
        break;
    }
  };

  // Note: group child navigation uses Link elements to preserve anchor semantics.
  // We keep this commented helper in case we need programmatic navigation later.
  // const handleGroupChildNavigation = (path) => {
  //   setShowSettingsDropdown(false);
  //   setOpenGroup(null);
  //   router.push(path);
  // };

  // const handleViewStore = () => router.push(ROUTES.DASHBOARD_STORE);

  const isActive = (path) => {
    return pathname === path;
  };

  const [openGroup, setOpenGroup] = useState(null);
  const [mountedGroups, setMountedGroups] = useState(new Set());
  const mountedTimers = useRef(new Map());
  const isMountedRef = useRef(true);
  const sidebarRef = useRef(null);
  const groupButtonRefs = useRef(new Map());
  const portalOverlayRef = useRef(null);
  // Overlay coordinates used for portal rendering (viewport coords)
  const [overlayTop, setOverlayTop] = useState(0);
  const [overlayLeft, setOverlayLeft] = useState(0);

  useEffect(() => {
    const timers = mountedTimers.current;
    return () => {
      isMountedRef.current = false;
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  // toggle a group, ensuring only one remains open at a time
  const toggleGroup = (key) => {
    setShowSettingsDropdown(false); // close settings when opening a group
    setOpenGroup((prev) => (prev === key ? null : key));
  };

  // Manage mounted groups to allow exit animations before unmounting
  useEffect(() => {
    const ANIM_DURATION = 300;
    // When a group opens, ensure it's mounted immediately
    if (openGroup) {
      setMountedGroups((prev) => new Set([...prev, openGroup]));
      // Clear any queued unmount for this group
      const t = mountedTimers.current.get(openGroup);
      if (t) {
        clearTimeout(t);
        mountedTimers.current.delete(openGroup);
      }
    }

    // For every mounted group, if it's not the openGroup, schedule unmount
    mountedGroups.forEach((gk) => {
      if (gk !== openGroup) {
        // schedule unmount
        if (!mountedTimers.current.get(gk)) {
          const timer = setTimeout(() => {
            if (!isMountedRef.current) return;
            setMountedGroups((prev) => {
              const copy = new Set(prev);
              copy.delete(gk);
              return copy;
            });
            mountedTimers.current.delete(gk);
          }, ANIM_DURATION + 20);
          mountedTimers.current.set(gk, timer);
        }
      }
    });

    return () => {
      // nothing to cleanup here aside from timers which will clear on unmount of component
    };
  }, [openGroup, mountedGroups]);

  // If sidebar is collapsed, ensure no group dropdown remains open
  useEffect(() => {
    if (collapsed) {
      setOpenGroup(null);
      // clear scheduled timers
      mountedTimers.current.forEach((t) => clearTimeout(t));
      mountedTimers.current.clear();
      setMountedGroups(new Set());
      // ensure settings closes when sidebar collapses
      setShowSettingsDropdown(false);
    }
  }, [collapsed]);

  // Keep overlay position updated when a group opens (only in collapsed mode)
  useEffect(() => {
    if (!openGroup || !collapsed) return;

    const computePosition = () => {
      const btn = groupButtonRefs.current.get(openGroup);
      const container = sidebarRef.current;
      if (!btn || !container) return;
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      // Compute absolute viewport coords for portal: place it to the right of the sidebar
      const topViewport = Math.max(4, btnRect.top);
      const leftViewport = containerRect.right;
      setOverlayTop(topViewport);
      setOverlayLeft(leftViewport);
    };

    // compute immediately
    computePosition();

    // recompute on scroll/resize while open so overlay stays aligned
    window.addEventListener('resize', computePosition);
    window.addEventListener('scroll', computePosition, true);

    return () => {
      window.removeEventListener('resize', computePosition);
      window.removeEventListener('scroll', computePosition, true);
    };
  }, [openGroup, collapsed]);

  // Close collapsed portal overlay when clicking outside (like settings behavior)
  useEffect(() => {
    if (!openGroup || !collapsed) return;

    const handleClickOutsideGroup = (event) => {
      const btn = groupButtonRefs.current.get(openGroup);
      const overlay = portalOverlayRef.current;
      if (
        overlay &&
        !overlay.contains(event.target) &&
        btn &&
        !btn.contains(event.target)
      ) {
        setOpenGroup(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideGroup);
    document.addEventListener('click', handleClickOutsideGroup);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideGroup);
      document.removeEventListener('click', handleClickOutsideGroup);
    };
  }, [openGroup, collapsed]);

  // Keep settings overlay position updated when opened while collapsed
  // Settings overlay positioning is static — do not compute dynamic position.

  const menuGroups = [
    {
      key: 'dashboard',
      path: ROUTES.DASHBOARD,
      label: 'Panel de Control',
      icon: MdDashboard,
    },
    {
      key: 'products',
      label: 'Productos',
      icon: MdInventory,
      children: [
        {
          key: 'products',
          path: ROUTES.DASHBOARD_PRODUCTS,
          label: 'Mis Productos',
          icon: MdInventory,
        },
        {
          key: 'reviews',
          path: ROUTES.DASHBOARD_REVIEWS,
          label: 'Reseñas',
          icon: MdStar,
        },
        {
          key: 'questions',
          path: ROUTES.DASHBOARD_QUESTIONS,
          label: 'Preguntas y Respuestas',
          icon: MdQuestionAnswer,
        },
      ],
    },
    {
      key: 'orders',
      label: 'Pedidos',
      icon: MdReceipt,
      children: [
        {
          key: 'orders',
          path: ROUTES.DASHBOARD_ORDERS,
          label: 'Mis Pedidos',
          icon: MdReceipt,
        },
        {
          key: 'quotes',
          path: ROUTES.DASHBOARD_QUOTES,
          label: 'Cotizaciones',
          icon: MdRequestQuote,
        },
        {
          key: 'returns',
          path: ROUTES.DASHBOARD_RETURNS,
          label: 'Devoluciones',
          icon: MdAssignmentReturn,
        },
        {
          key: 'shipping',
          path: ROUTES.DASHBOARD_SHIPMENTS,
          label: 'Envíos',
          icon: MdLocalShipping,
        },
        {
          key: 'pickup',
          path: ROUTES.DASHBOARD_PICKUP,
          label: 'Recogida en Tienda',
          icon: MdInventory,
        },
      ],
    },
    {
      key: 'reports',
      path: ROUTES.DASHBOARD_REPORTS,
      label: 'Informes',
      icon: MdBarChart,
    },
    {
      key: 'withdrawals',
      path: ROUTES.DASHBOARD_WITHDRAWALS,
      label: 'Retiros',
      icon: MdLocalAtm,
    },
    {
      key: 'coupons',
      path: ROUTES.DASHBOARD_COUPONS,
      label: 'Cupones',
      icon: MdLocalOffer,
    },
    {
      key: 'followers',
      path: ROUTES.DASHBOARD_FOLLOWERS,
      label: 'Seguidores',
      icon: MdGroup,
    },
    {
      key: 'announcements',
      path: ROUTES.DASHBOARD_ANNOUNCEMENTS,
      label: 'Anuncios',
      icon: MdNotifications,
    },
    {
      key: 'help',
      path: ROUTES.DASHBOARD_HELP,
      label: 'Centro de ayuda',
      icon: MdHelp,
    },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`relative ${collapsed ? 'w-20' : 'w-[17rem]'} bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button - positioned at the edge */}
      <button
        onClick={onToggle}
        className={`absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg hover:bg-primary-50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200 z-10 cursor-pointer ${
          collapsed ? 'rotate-180' : ''
        }`}
        title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        <MdChevronLeft size={16} className="text-gray-600" />
      </button>

      <div className="flex flex-col gap-4 flex-1 p-4">
        {/* Profile Section */}
        <div
          className={`${collapsed ? 'flex justify-center' : 'flex items-center gap-3'}`}
        >
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-primary-500 flex items-center justify-center text-white font-semibold border-2 border-primary-300">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0 transition-all duration-200">
              <h1 className="text-[#0d141b] text-base font-medium leading-normal truncate">
                {user?.name || user?.email || 'Usuario'}
              </h1>
              <p className="text-[#4c739a] text-sm font-normal leading-normal">
                {user?.role === 'vendor'
                  ? 'Vendedor'
                  : user?.role === 'customer'
                    ? 'Comprador'
                    : 'Usuario'}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col gap-2">
          {menuGroups.map((g) => (
            <div key={g.key}>
              {!g.children ? (
                <Link
                  href={g.path}
                  onClick={() => setShowSettingsDropdown(false)}
                  onMouseDown={() => setShowSettingsDropdown(false)}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive(g.path)
                      ? 'bg-primary-100 text-primary-800 shadow-sm border-l-4 border-primary-600'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-sm focus:bg-primary-50 focus:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary/20'
                  } ${collapsed ? 'justify-center px-2' : ''} cursor-pointer`}
                  title={collapsed ? g.label : undefined}
                >
                  <div className="relative flex-shrink-0">
                    <g.icon
                      className={`text-xl transition-transform duration-200 ${
                        isActive(g.path) ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                    {g.path === ROUTES.DASHBOARD_ANNOUNCEMENTS &&
                      unreadAnnouncementsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1 animate-pulse">
                          {unreadAnnouncementsCount > 99
                            ? '99+'
                            : unreadAnnouncementsCount}
                        </span>
                      )}
                  </div>
                  {!collapsed && (
                    <p
                      className={`text-sm font-medium leading-normal truncate transition-all duration-200 ${isActive(g.path) ? 'font-semibold' : ''}`}
                    >
                      {g.label}
                    </p>
                  )}
                </Link>
              ) : (
                <div>
                  <button
                    ref={(el) => {
                      if (el) groupButtonRefs.current.set(g.key, el);
                      else groupButtonRefs.current.delete(g.key);
                    }}
                    onClick={() => toggleGroup(g.key)}
                    // Note: use only click to open/close groups. Hover behavior removed to match UX requirement.
                    className={`group w-full relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive(g.path)
                        ? 'bg-primary-100 text-primary-800 shadow-sm border-l-4 border-primary-600'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:shadow-sm'
                    } ${collapsed ? 'justify-center px-2' : ''} cursor-pointer`}
                    title={collapsed ? g.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <g.icon
                        className={`text-xl ${isActive(g.path) ? 'scale-110' : ''}`}
                      />
                    </div>
                    {!collapsed && (
                      <div className="flex flex-1 items-center justify-between">
                        <p
                          className={`text-sm font-medium leading-normal truncate ${isActive(g.path) ? 'font-semibold' : ''}`}
                        >
                          {g.label}
                        </p>
                        <MdKeyboardArrowRight
                          className={`text-lg transition-transform ${openGroup === g.key ? 'rotate-90' : ''}`}
                        />
                      </div>
                    )}
                  </button>
                  {/* children */}
                  {/* Group overlay - when collapsed we render in a portal (fixed viewport coords) to avoid stacking context issues */}
                  {collapsed ? (
                    openGroup === g.key && mountedGroups.has(g.key) ? (
                      createPortal(
                        <div
                          ref={portalOverlayRef}
                          className={`fixed bg-white border border-gray-200 rounded-lg shadow-xl min-w-48 z-50 overflow-hidden ring-1 ring-gray-200 animate-in slide-in-from-left-2 fade-in duration-200 ${openGroup === g.key ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                          style={{
                            top: `${overlayTop}px`,
                            left: `${overlayLeft}px`,
                          }}
                          aria-hidden={openGroup === g.key ? 'false' : 'true'}
                        >
                          <div>
                            {g.children.map((c) => (
                              // Use programmatic navigation in collapsed/portal overlay so we can
                              // control the order of navigation and overlay close without unmounting
                              // the overlay before the click event completes.
                              <button
                                key={c.key}
                                onClick={() => {
                                  router.push(c.path);
                                  setShowSettingsDropdown(false);
                                  setOpenGroup(null);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer hover:shadow-sm active:scale-95 ${isActive(c.path) ? 'font-semibold bg-primary-50 text-primary-700' : ''}`}
                                role="link"
                              >
                                {c.icon && <c.icon className="text-base" />}
                                <span>{c.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>,
                        document.body
                      )
                    ) : null
                  ) : (
                    <div
                      className={`mt-1 transition-all duration-300 ${'overflow-hidden'} ${openGroup === g.key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      aria-hidden={openGroup === g.key ? 'false' : 'true'}
                    >
                      {mountedGroups.has(g.key) && (
                        <div className={`${collapsed ? '' : 'pl-6'}`}>
                          {g.children.map((c) => (
                            <Link
                              key={c.key}
                              href={c.path}
                              onClick={() => {
                                setShowSettingsDropdown(false);
                                setOpenGroup(null);
                              }}
                              className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer hover:shadow-sm active:scale-95 ${isActive(c.path) ? 'font-semibold bg-primary-50 text-primary-700' : ''}`}
                            >
                              {c.icon && <c.icon className="text-base" />}
                              <span>{c.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Actions */}
      <div className="p-4 pt-0 space-y-2 relative">
        {/* Settings Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setOpenGroup(null);
              setShowSettingsDropdown((prev) => !prev);
            }}
            className={`w-full flex items-center gap-3 px-3 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-gray-500/20 focus:outline-none cursor-pointer border border-gray-300 hover:border-gray-400 ${
              collapsed ? 'justify-center' : ''
            }`}
            title={collapsed ? 'Ajustes' : undefined}
          >
            <MdSettings className="text-xl flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="text-sm font-medium leading-normal flex-1 text-left">
                  Ajustes
                </span>
                <MdKeyboardArrowRight
                  className={`text-lg transition-transform duration-200 ${
                    showSettingsDropdown ? 'rotate-180' : ''
                  }`}
                />
              </>
            )}
          </button>
          {showSettingsDropdown && (
            <div
              className={`absolute bottom-0 bg-white border border-gray-200 rounded-lg shadow-xl min-w-48 z-50 overflow-hidden ring-1 ring-gray-200 animate-in slide-in-from-left-2 fade-in duration-200 ${
                collapsed ? 'left-13' : 'left-57'
              }`}
            >
              <button
                onClick={() => handleSettingsAction('store')}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer rounded-md hover:shadow-sm active:scale-95"
              >
                <MdStore className="text-base" />
                Tienda
              </button>
              <button
                onClick={() => handleSettingsAction('verification')}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer rounded-md hover:shadow-sm active:scale-95"
              >
                <MdVerified className="text-base" />
                Verificación
              </button>
              <button
                onClick={() => handleSettingsAction('bank')}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer rounded-md hover:shadow-sm active:scale-95"
              >
                <MdAccountBalance className="text-base" />
                Cuenta bancaria
              </button>
              <button
                onClick={() => handleSettingsAction('shipping')}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer rounded-md hover:shadow-sm active:scale-95"
              >
                <MdLocalShipping className="text-base" />
                Envío propio
              </button>
              <button
                onClick={() => handleSettingsAction('socials')}
                className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 cursor-pointer rounded-md hover:shadow-sm active:scale-95"
              >
                <MdShare className="text-base" />
                Redes Sociales
              </button>
            </div>
          )}
        </div>

        {/* Three quick-action buttons (green = Mi tienda, yellow = Perfil, red = Cerrar sesión) */}
        <div
          className={`${collapsed ? 'flex gap-2 items-center justify-center' : 'flex gap-2 items-center w-full'}`}
        >
          <button
            onClick={() => router.push(ROUTES.DASHBOARD_STORE)}
            className={`${collapsed ? 'w-10' : 'flex-1'} h-10 rounded-lg bg-green-700 text-white flex items-center ${collapsed ? 'justify-center' : 'justify-center'} hover:bg-green-800 cursor-pointer px-3`}
            aria-label="Mi tienda"
            title="Mi tienda"
          >
            <MdStore />
            {/* no textual label (icons only) */}
          </button>
          <button
            onClick={() => router.push(ROUTES.DASHBOARD_SETTINGS)}
            className={`${collapsed ? 'w-10' : 'flex-1'} h-10 rounded-lg bg-yellow-400 text-white flex items-center ${collapsed ? 'justify-center' : 'justify-center'} hover:bg-yellow-500 cursor-pointer px-3`}
            aria-label="Perfil"
            title="Perfil"
          >
            <MdPerson />
            {/* no textual label (icons only) */}
          </button>
          <button
            onClick={handleLogout}
            className={`${collapsed ? 'w-10' : 'flex-1'} h-10 rounded-lg bg-red-600 text-white flex items-center ${collapsed ? 'justify-center' : 'justify-center'} hover:bg-red-700 cursor-pointer px-3`}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
          >
            <MdLogout />
            {/* no textual label (icons only) */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
