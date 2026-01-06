import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ navigate, currentPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'About Us', id: 'about' },
        { name: 'Courses', id: 'courses' },
        { name: 'Contact Us', id: 'contact' },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('home')}>
                        <img
                            src="https://www.interiordesignacademy.my/wp-content/uploads/2025/01/ida-logo.png"
                            alt="IDA Logo"
                            className="h-12 w-auto object-contain"
                        />
                        <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                            Greyhales Academy
                        </h1>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.id)}
                                className={`${currentPage === item.id ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-700 hover:text-orange-500'} pb-1 transition-colors`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <nav className="md:hidden pb-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { navigate(item.id); setIsMobileMenuOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
