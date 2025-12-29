// @ts-nocheck
'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MdNotifications, MdHelpOutline, MdStore } from 'react-icons/md';

interface ProgressBarProps {
  percent: number;
}

const ProgressBar = ({ percent }: ProgressBarProps) => (
  <div className="flex items-center gap-3">
    <div className="w-40 bg-gray-200 h-2 rounded">
      <div
        className="bg-primary-600 h-2 rounded"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export interface DashboardHeaderProps {
  /**
   * Store setup progress percentage
   */
  setupProgress?: number;
  /**
   * Number of unread announcements
   */
  unreadCount?: number;
  /**
   * User initials or avatar
   */
  userInitial?: string;
}

/**
 * DashboardHeader Component
 * Header for dashboard pages with progress, notifications, and quick actions
 */
export const DashboardHeader = ({
  setupProgress = 0,
  unreadCount = 0,
  userInitial = 'U',
}: DashboardHeaderProps) => {
  const router = useRouter();
  const completedSteps = Math.floor((setupProgress / 100) * 3);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {/* Progress and completion summary */}
        <button
          onClick={() => router.push('/dashboard/store')}
          className="text-gray-600 hover:text-gray-900 cursor-pointer"
          aria-label="Ver tienda"
        >
          <Image
            src="/logo.svg"
            alt="Full Colombiano"
            width={96}
            height={32}
            className="w-24 object-contain inline-block hover:scale-105 transition-transform duration-200"
          />
        </button>
        <div className="hidden md:flex flex-col items-end mr-2">
          <div className="hidden md:block">
            <ProgressBar percent={setupProgress} />
          </div>
          <div className="text-sm text-gray-600 mt-1">{`${completedSteps}/3 completado`}</div>
        </div>

        <button
          className="text-gray-600 hover:text-gray-900 cursor-pointer"
          aria-label="Carrito"
          onClick={() => router.push('/cart')}
        >
          <MdStore size={22} />
        </button>

        <button
          className="relative text-gray-600 hover:text-gray-900 cursor-pointer"
          aria-label="Notificaciones"
          onClick={() => router.push('/dashboard/announcements')}
        >
          <MdNotifications size={22} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 min-w-4 flex items-center justify-center px-1">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          className="text-gray-600 hover:text-gray-900 cursor-pointer"
          aria-label="Ayuda"
          onClick={() => router.push('/dashboard/help')}
        >
          <MdHelpOutline size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
            {userInitial}
          </div>
        </div>
      </div>
    </header>
  );
};

DashboardHeader.displayName = 'DashboardHeader';


export default DashboardHeader;
