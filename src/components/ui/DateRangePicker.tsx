// @ts-nocheck
import React from 'react';import { useState, useRef, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { MdChevronLeft, MdChevronRight, MdCalendarToday } from 'react-icons/md';

/**
 * DateRangePicker Component
 * Calendario personalizado para selección de rangos de fechas
 */
const DateRangePicker = ({ startDate, endDate, onChange, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingStart, setSelectingStart] = useState(true);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleDateClick = (date) => {
    if (selectingStart) {
      setTempStartDate(date);
      setTempEndDate(null);
      setSelectingStart(false);
    } else {
      if (date < tempStartDate) {
        setTempStartDate(date);
        setTempEndDate(tempStartDate);
      } else {
        setTempEndDate(date);
      }
      setSelectingStart(true);
      // Auto-confirm when both dates are selected
      setTimeout(() => {
        onChange(tempStartDate, date >= tempStartDate ? date : tempStartDate);
        onClose();
      }, 100);
    }
  };

  const isDateSelected = (date) => {
    if (tempStartDate && isSameDay(date, tempStartDate)) return 'start';
    if (tempEndDate && isSameDay(date, tempEndDate)) return 'end';
    if (
      tempStartDate &&
      tempEndDate &&
      isWithinInterval(date, { start: tempStartDate, end: tempEndDate })
    )
      return 'range';
    return false;
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Add empty cells for days before month starts
  const startDay = monthStart.getDay();
  const emptyDays = Array.from({ length: startDay }, () => null);

  const allDays = [...emptyDays, ...calendarDays];

  return (
    <div
      ref={calendarRef}
      className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <MdChevronLeft className="text-gray-600" />
        </button>
        <h3 className="font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <MdChevronRight className="text-gray-600" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-8" />;
          }

          const selectionType = isDateSelected(date);
          let className =
            'h-8 w-8 text-sm flex items-center justify-center rounded-md cursor-pointer transition-colors ';

          if (selectionType === 'start') {
            className += 'bg-primary text-white hover:bg-primary-600';
          } else if (selectionType === 'end') {
            className += 'bg-primary text-white hover:bg-primary-600';
          } else if (selectionType === 'range') {
            className += 'bg-primary-100 text-primary-800 hover:bg-primary-200';
          } else {
            className += 'hover:bg-gray-100 text-gray-700';
          }

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={className}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>

      {/* Footer with selected range */}
      {(tempStartDate || tempEndDate) && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {tempStartDate && (
              <div className="flex items-center gap-2">
                <MdCalendarToday className="text-primary" size={16} />
                <span>
                  {selectingStart ? 'Inicio: ' : 'Rango: '}
                  {format(tempStartDate, 'dd/MM/yyyy', { locale: es })}
                  {tempEndDate &&
                    ` - ${format(tempEndDate, 'dd/MM/yyyy', { locale: es })}`}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
