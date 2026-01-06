import React from 'react';
import { Facebook, Twitter, Youtube, Phone, Mail, Instagram, Linkedin } from 'lucide-react';

const Footer = ({ navigate }) => {
    return (
        <footer className="bg-navy-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo & About */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6 cursor-pointer" onClick={() => navigate('home')}>
                            <img
                                src="https://www.interiordesignacademy.my/wp-content/uploads/2025/01/ida-logo.png"
                                alt="IDA Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Greyhales Academy offers personalized, focused learning to develop creativity and professional skills, preparing students for success in residential and commercial design.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all group">
                                <Facebook size={20} className="group-hover:scale-110" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all group">
                                <Instagram size={20} className="group-hover:scale-110" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all group">
                                <Youtube size={20} className="group-hover:scale-110" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all group">
                                <Linkedin size={20} className="group-hover:scale-110" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b-2 border-orange-500 inline-block pb-1">Quick Links</h3>
                        <nav className="flex flex-col space-y-4">
                            {['Home', 'About Us', 'Courses', 'Contact Us'].map((link) => (
                                <button
                                    key={link}
                                    onClick={() => navigate(link.toLowerCase().replace(' ', ''))}
                                    className="text-gray-400 hover:text-orange-500 transition-colors text-left flex items-center group"
                                >
                                    <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 text-orange-500 mr-0 group-hover:mr-2">›</span>
                                    {link}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b-2 border-orange-500 inline-block pb-1">Our Programs</h3>
                        <nav className="flex flex-col space-y-4 text-gray-400">
                            <span className="hover:text-white transition-colors cursor-default">Sketching Skill</span>
                            <span className="hover:text-white transition-colors cursor-default">CAD (2D & 3D)</span>
                            <span className="hover:text-white transition-colors cursor-default">Residential Design</span>
                            <span className="hover:text-white transition-colors cursor-default">Commercial Design</span>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b-2 border-orange-500 inline-block pb-1">Get In Touch</h3>
                        <div className="space-y-4 text-gray-400">
                            <p className="flex items-start space-x-3">
                                <Phone size={20} className="text-orange-500 mt-1" />
                                <span>+234 8148554538</span>
                            </p>
                            <p className="flex items-start space-x-3">
                                <Mail size={20} className="text-orange-500 mt-1" />
                                <span className="break-all">Info@greyhalesacademy.com</span>
                            </p>
                            <div className="pt-4">
                                <p className="text-sm italic opacity-60">"Transforming potential into tangible creativity."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/5 py-8 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Greyhales Academy | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
