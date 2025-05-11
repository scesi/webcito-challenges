import { useState, useEffect, useRef } from 'react';
import styles from './select-component.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectComponentProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const SelectComponent = ({
  label,
  value,
  options,
  onChange,
}: SelectComponentProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || options[0]?.value || ''
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.dropdownToggle}
        onClick={() => setOpen(!open)}
      >
        <p className={styles.buttonLabel}>{selected?.label || label}</p>
        <svg
          className={`${styles.dropdownIcon} ${open ? styles.open : ''}`}
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 1L7 7L1 1" stroke="#ffffff" strokeWidth="2" />
        </svg>
      </button>
      {open && (
        <div className={styles.dropdownContainer}>
          <h3 className={styles.dropdownTitle}>Select {label.toLowerCase()}</h3>
          <ul className={styles.dropdownMenu}>
            {options.map((option) => (
              <li
                key={option.value}
                className={styles.dropdownItem}
                onClick={() => {
                  console.log(option.value, 'option.value');
                  setSelectedValue(option.value);
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.value === selectedValue ? (
                  <>
                    <svg
                      className={styles.dropdownItemIcon}
                      width="15"
                      height="15"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 9L4.23309 11.4248C4.66178 11.7463 5.26772 11.6728 5.60705 11.2581L14 1"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className={styles.optionLabelActive}>{option.label}</p>
                  </>
                ) : (
                  <>
                    <span className={styles.dropdownItemIcon}></span>
                    <p className={styles.optionLabel}>{option.label}</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};