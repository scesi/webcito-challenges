import { useEffect, useRef, useState } from 'react';

type DropdownFilterProps = {
  value: string;
  setValue: (val: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
  className?: string;
};

export const DropdownFilter = ({
  value,
  setValue,
  options,
  label = 'Select option',
  placeholder = 'Select',
  className = '',
}: DropdownFilterProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[#22262C] border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white h-[40px] flex items-center justify-between hover:bg-[#2d333b] transition-colors whitespace-nowrap"
      >
        {value === placeholder ? placeholder : value}
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full min-w-[200px] bg-[#161b22] border border-gray-700 rounded-md shadow-lg right-0">
          <div className="px-3 py-1 font-semibold text-white flex justify-between items-center border-b border-[#21262d] mb-2">
            <span>{label}</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm text-white hover:bg-[#30363d] cursor-pointer ${
                value === opt ? 'bg-[#21262d]' : ''
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
