import React from 'react';
import { ChevronLeft } from 'lucide-react';

const BackButton = ({ onClick, show }) => {
    if (!show) return null;

    return (
        <button
            onClick={onClick}
            className="md:hidden fixed left-3 top-24 z-50 bg-white shadow-2xl p-3 rounded-full border border-gray-100 text-orange-500 hover:text-orange-600 transition-all active:scale-95 flex items-center justify-center"
            style={{ boxShadow: '0 10px 25px -5px rgba(234, 148, 87, 0.3)' }}
            aria-label="Go Back"
        >
            <ChevronLeft size={24} strokeWidth={3} />
            <span className="ml-1 font-medium text-navy-900">Back</span>
        </button>
    );
};

export default BackButton;
