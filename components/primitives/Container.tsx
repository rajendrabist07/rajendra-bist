import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: 'default' | 'narrow' | 'prose';
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    default: 'max-w-6xl',
    narrow: 'max-w-4xl',
    prose: 'max-w-[68ch]',
  }[size];

  return (
    <Component
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
