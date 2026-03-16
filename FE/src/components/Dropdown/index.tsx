'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import clsx from 'clsx';
import { FaChevronDown } from 'react-icons/fa';
import styles from './styles.module.css';

export type DropdownOption = {
  id: string;
  label: string;
  icon?: ReactNode;
}

export type DropdownProps = {
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (option: DropdownOption) => void;
  collapsed?: boolean;
  className?: string;
}

export default function Dropdown({ 
  options, 
  selected, 
  onSelect, 
  collapsed = false,
  className} : DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.id === selected.id) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <div className={clsx(styles.dropdown, className)} ref={dropdownRef}>
      <button 
        className={styles.dropdownToggle} 
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.icon}>{selectedOption.icon}</span>
        {!collapsed && (
          <>
            <span className={styles.label}>{selectedOption.label}</span>
            <FaChevronDown className={clsx(styles.arrow, { [styles.arrowOpen]: isOpen })} />
          </>
        )}
      </button>

      {isOpen && (
        <ul className={clsx(styles.dropdownMenu, { [styles.collapsedMenu]: collapsed })}>
          {options.map((option) => (
            <li 
              key={option.id} 
              className={clsx(styles.dropdownItem, { [styles.active]: option.id === selected.id })}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <span className={styles.itemIcon}>{option.icon}</span>
              {!collapsed && <span className={clsx(styles.itemLabel, styles.label)}>{option.label}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}