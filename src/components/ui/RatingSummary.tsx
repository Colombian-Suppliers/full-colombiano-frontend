// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { MdStar } from 'react-icons/md';

/**
 * RatingSummary Component
 * Principio: Single Responsibility - solo muestra el resumen de calificaciones
 * Principio: Interface Segregation - props específicos para datos de rating
 */
const RatingSummary = ({ averageRating, totalReviews, ratingBreakdown }) => {
  const [animatedAverage, setAnimatedAverage] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedBars, setAnimatedBars] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  // Refs to store timer references for cleanup
  const timersRef = useRef([]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <MdStar
            key={i}
            className={`text-[#FBBF24] ${
              i < fullStars
                ? 'fill-current'
                : i === fullStars && hasHalfStar
                  ? 'fill-current opacity-50'
                  : 'text-gray-300'
            }`}
            size={16}
          />
        ))}
      </div>
    );
  };

  // Animation for numbers (count up effect)
  useEffect(() => {
    setIsVisible(true);

    // Clear any existing timers
    timersRef.current.forEach((timer) => {
      if (timer) clearInterval(timer);
    });
    timersRef.current = [];

    // Animate average rating
    const averageDuration = 1500; // 1.5 seconds
    const averageSteps = 60;
    const averageIncrement = averageRating / averageSteps;
    let averageCurrent = 0;

    const averageTimer = setInterval(() => {
      averageCurrent += averageIncrement;
      if (averageCurrent >= averageRating) {
        setAnimatedAverage(averageRating);
        clearInterval(averageTimer);
      } else {
        setAnimatedAverage(averageCurrent);
      }
    }, averageDuration / averageSteps);
    timersRef.current.push(averageTimer);

    // Animate total reviews
    const totalDuration = 1000; // 1 second
    const totalSteps = 40;
    const totalIncrement = totalReviews / totalSteps;
    let totalCurrent = 0;

    const totalTimer = setInterval(() => {
      totalCurrent += totalIncrement;
      if (totalCurrent >= totalReviews) {
        setAnimatedTotal(totalReviews);
        clearInterval(totalTimer);
      } else {
        setAnimatedTotal(Math.floor(totalCurrent));
      }
    }, totalDuration / totalSteps);
    timersRef.current.push(totalTimer);

    // Animate bars with staggered delay
    const barDuration = 1200; // 1.2 seconds
    const barSteps = 48;

    [5, 4, 3, 2, 1].forEach((stars, index) => {
      const targetValue = ratingBreakdown[stars] || 0;
      const barIncrement = targetValue / barSteps;
      let barCurrent = 0;

      const timeoutId = setTimeout(() => {
        const barTimer = setInterval(() => {
          barCurrent += barIncrement;
          if (barCurrent >= targetValue) {
            setAnimatedBars((prev) => ({ ...prev, [stars]: targetValue }));
            clearInterval(barTimer);
            // Remove from timers array
            timersRef.current = timersRef.current.filter((t) => t !== barTimer);
          } else {
            setAnimatedBars((prev) => ({ ...prev, [stars]: barCurrent }));
          }
        }, barDuration / barSteps);
        timersRef.current.push(barTimer);
      }, index * 150); // Stagger bars by 150ms

      timersRef.current.push(timeoutId);
    });

    return () => {
      timersRef.current.forEach((timer) => {
        if (timer) {
          clearInterval(timer);
          clearTimeout(timer);
        }
      });
      timersRef.current = [];
    };
  }, [averageRating, totalReviews, ratingBreakdown]);

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <h3 className="text-lg font-bold mb-4 text-[#0d141b]">
        Resumen de Reseñas
      </h3>
      <div className="flex flex-wrap gap-x-8 gap-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-[#0d141b] text-4xl font-black leading-tight tracking-[-0.033em] transition-all duration-300">
            {animatedAverage.toFixed(1)}
          </p>
          {renderStars(averageRating)}
          <p className="text-[#4c739a] text-base font-normal leading-normal transition-all duration-300">
            {animatedTotal} reseñas
          </p>
        </div>
        <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <React.Fragment key={stars}>
              <p className="text-[#0d141b] text-sm font-normal leading-normal">
                {stars}
              </p>
              <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="rounded-full bg-primary-500 transition-all duration-1000 ease-out"
                  style={{
                    width: `${animatedBars[stars] || 0}%`,
                    transitionDelay: `${[5, 4, 3, 2, 1].indexOf(stars) * 150}ms`,
                  }}
                ></div>
              </div>
              <p className="text-[#4c739a] text-sm font-normal leading-normal text-right transition-all duration-300">
                {Math.round(animatedBars[stars] || 0)}%
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
