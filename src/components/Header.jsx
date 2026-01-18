import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Header = ({ navigate, currentPage, user }) => {
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
                            src={logo}
                            alt="IDA Logo"
                            className="h-12 w-auto object-contain"
                        />
                        <h1 className="text-xl font-bold text-gray-900">
                            <span className="sm:hidden text-base">Greyhales Academy</span>
                            <span className="hidden sm:inline text-xl">Greyhales Academy</span>
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.id)}
                                className={`${currentPage === item.id ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-700 hover:text-orange-500'} pb-1 transition-colors font-medium`}
                            >
                                {item.name}
                            </button>
                        ))}

                        <div className="flex items-center space-x-4 border-l pl-8 ml-4 border-gray-100">
                            {user ? (
                                <>
                                    {user.role === 'admin' && (
                                        <button
                                            onClick={() => navigate('admin')}
                                            className="text-orange-600 font-bold hover:text-orange-700 transition-colors"
                                        >
                                            Admin
                                        </button>
                                    )}
                                    <span className="text-gray-500 text-sm">Hi, {user.name.split(' ')[0]}</span>
                                    <button
                                        onClick={() => navigate('logout')}
                                        className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 transition-all shadow-md"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('login')}
                                        className="text-gray-700 font-medium hover:text-orange-500 transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('register')}
                                        className="bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-100"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>

                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} className="text-orange-500" /> : <Menu size={24} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <nav className="md:hidden pb-6 pt-2 space-y-1 animate-in slide-in-from-top duration-200">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { navigate(item.id); setIsMobileMenuOpen(false); }}
                                className={`block w-full text-left px-4 py-3 rounded-lg ${currentPage === item.id ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                {item.name}
                            </button>
                        ))}
                        <div className="pt-4 mt-4 border-t border-gray-100 px-4 space-y-3">
                            {user ? (
                                <>
                                    <div className="text-sm font-medium text-gray-500">Logged in as: {user.name}</div>
                                    {user.role === 'admin' && (
                                        <button
                                            onClick={() => { navigate('admin'); setIsMobileMenuOpen(false); }}
                                            className="block w-full text-left py-2 text-orange-600 font-bold"
                                        >
                                            Admin Dashboard
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { navigate('logout'); setIsMobileMenuOpen(false); }}
                                        className="block w-full text-center py-3 bg-gray-800 text-white rounded-lg font-bold"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => { navigate('login'); setIsMobileMenuOpen(false); }}
                                        className="block w-full text-center py-3 border border-gray-200 text-gray-700 rounded-lg font-bold"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => { navigate('register'); setIsMobileMenuOpen(false); }}
                                        className="block w-full text-center py-3 bg-orange-600 text-white rounded-lg font-bold"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
