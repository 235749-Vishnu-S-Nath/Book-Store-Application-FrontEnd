import { useState } from 'react';
import { Transition } from '@headlessui/react';

const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-12 h-12 rounded-md hover:bg-white/10 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className={`w-6 h-6 transition-transform ${
            isOpen ? 'rotate-45' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 4h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2z"
          />
        </svg>
      </button>

      <Transition
        show={isOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* Menu content */}
        <div className="absolute z-20 right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg">
          {/* Menu items */}
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Item 1
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Item 2
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Item 3
          </a>
        </div>
      </Transition>
    </div>
  );
};

export default BurgerButton;
