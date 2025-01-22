import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle } from 'lucide-react'

const TopBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    //Event for mouse click
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event component
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#2D2B3A] text-white text-sm py-2.5">
      <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
        <p className="flex items-center gap-2 lg:text-sm md:text-sm text-xs">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Free Shipping On All Orders Over $50
        </p>
        <div className="flex items-center gap-4 text-white/80">
          <div className="relative">
            <button
              className="flex lg:text-sm md:text-sm text-xs items-center gap-1 hover:text-white"
              onClick={toggleDropdown}
            >
              Eng
              <ChevronDown className="w-4 h-4" />
            </button>
            <div
              ref={dropdownRef}
              className={`absolute z-50 top-full left-0 mt-1 bg-[#bdbdbd] text-gray-800 rounded-md hover:rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}
            >
              <a href="" className="block px-3 py-2 hover:bg-gray-100">
                English
              </a>
              <a href="" className="block px-3 py-2 hover:bg-gray-100">
                Español
              </a>
              <a href="" className="block px-3 py-2 hover:bg-gray-100">
                Français
              </a>
            </div>
          </div>
          <Link href="/faqs" className="hover:text-white lg:text-sm md:text-sm text-xs">
            Faqs
          </Link>
          <Link href="/contact" className="flex lg:text-sm md:text-sm text-xs items-center gap-1 hover:text-white">
            <HelpCircle className="w-4 h-4" />
            Need Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
