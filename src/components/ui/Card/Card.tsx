// @ts-nocheck
import React from 'react';import { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardSubComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Card container component
 */
export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card header section
 */
export const CardHeader = ({
  children,
  className,
  ...props
}: CardSubComponentProps) => {
  return (
    <div
      className={clsx('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card content section
 */
export const CardContent = ({
  children,
  className,
  ...props
}: CardSubComponentProps) => {
  return (
    <div className={clsx('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Card footer section
 */
export const CardFooter = ({
  children,
  className,
  ...props
}: CardSubComponentProps) => {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-t border-gray-200 bg-gray-50 overflow-hidden rounded-b-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';


export default Card;
