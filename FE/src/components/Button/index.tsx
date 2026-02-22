import React, { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type Props = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<Props> = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            <span>
                {children}
            </span>
        </button >
    );
};

export default Button;