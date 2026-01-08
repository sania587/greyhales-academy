import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Phone, MessageCircle, MoreHorizontal, UserCheck, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import welcomeImage from '../assets/image.jpeg';

const HomePage = ({ navigate }) => {
    const courses = [
        {
            title: 'Module 1: Interior Design Blueprint Course',
            img: 'https://jdinstituteoffashiontechnology.b-cdn.net/wp-content/uploads/2025/11/Certificate-Course-in-Modular-Interior-Design--1536x1024.webp'
        },
        {
            title: 'Module 2: Computer Aids Design',
            img: 'https://www.elcamino.edu/images/New_CADD_Hero_Banner.jpg'
        },
        {
            title: 'Module 3: Interio Business Mastery',
            img: 'https://booksofdiscovery.com/wp-content/uploads/2022/08/BM-F-450pxw.jpg'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);
    const totalItems = courses.length;

    // Update itemsToShow based on window size
    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth < 640) {
                setItemsToShow(1); // Mobile
            } else if (window.innerWidth < 1024) {
                setItemsToShow(2); // Tablet
            } else {
                setItemsToShow(3); // Desktop
            }
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);
        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    // Only auto-scroll if there are more items than can be shown
    const needsCarousel = totalItems > itemsToShow;

    useEffect(() => {
        if (!needsCarousel) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 10000);
        return () => clearInterval(timer);
    }, [currentIndex, itemsToShow, needsCarousel]);

    const nextSlide = () => {
        if (!needsCarousel) return;
        setCurrentIndex((prev) => {
            const maxIndex = totalItems - itemsToShow;
            const nextIndex = prev + 1;
            return nextIndex > maxIndex ? 0 : nextIndex;
        });
    };

    const prevSlide = () => {
        if (!needsCarousel) return;
        setCurrentIndex((prev) => {
            const maxIndex = totalItems - itemsToShow;
            const prevIndex = prev - 1;
            return prevIndex < 0 ? maxIndex : prevIndex;
        });
    };

    return (
        <main className="relative font-sans text-navy-900">
            {/* Floating Buttons */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
                <a
                    href="https://wa.me/2348148554538"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
                >
                    <MessageCircle size={24} />
                </a>
                <a
                    href="tel:+2348148554538"
                    className="bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
                >
                    <Phone size={24} />
                </a>


            </div>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                {/* Fixed Parallax Background */}
                <div className="absolute inset-0 z-0" style={{ clipPath: 'inset(0)' }}>
                    <div
                        className="fixed inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000')",
                            zIndex: -1
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-black/80 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
                    <div className="max-w-3xl">
                        <p className="font-script text-3xl underline text-orange-400 mb-4 animate-fade-in">
                            Acquire a Lifetime Knowledge
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8 animate-fade-in">
                            Comprehensive <br />
                            <span className="text-orange-500">Training</span> for <br />
                            Creative Spaces
                        </h1>

                        <div className="animate-fade-in flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate('about')}
                                className="bg-orange-500 shadow-lg text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-orange-600 transition-all shadow-xl hover:-translate-y-1"
                            >
                                Get Started
                            </button>
                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-md border border-white/20">
                                <span className="text-3xl">🎓</span>
                                <div className="text-white text-sm">
                                    <span className="block font-bold text-lg leading-none">500+</span>
                                    <span className="opacity-70">Trusted by Students</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-24 px-4 bg-white overflow-hidden relative z-10" id="welcome">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column */}
                        <div className="space-y-10">
                            <div className="space-y-6">
                                <h2 className="text-5xl font-bold text-navy-900 leading-tight">
                                    Welcome to <br />
                                    <span className="text-orange-500">Greyhales Academy</span>
                                </h2>
                                <div className="text-gray-600 text-lg leading-relaxed max-w-xl">
                                    <p>Join tailored classes to learn skills from sketching to advanced design, preparing you for a successful career in interior design.</p>
                                </div>
                            </div>

                            {/* Inner Section with Icon Boxes */}
                            <div className="grid sm:grid-cols-2 gap-8">
                                {/* Focused Attention */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 flex-shrink-0">
                                        <UserCheck size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-navy-900 leading-none">
                                            Focused<br />Attention
                                        </h3>
                                    </div>
                                </div>

                                {/* Comprehensive Curriculum */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 flex-shrink-0">
                                        <BookOpen size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-navy-900 leading-none">
                                            Comprehensive<br />Curriculum
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Learn More Button */}
                            <div>
                                <button
                                    onClick={() => navigate('about')}
                                    className="bg-orange-500 text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-gray-600/50"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Precision Design Replication */}
                        <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-5">
                            <div className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px]">

                                {/* 1. Decorative Dot Pattern (Top Right Background) */}
                                <div className="absolute -top-10 -right-10 opacity-60 z-0 select-none">
                                    <div className="grid grid-cols-14 gap-3">
                                        {[...Array(260)].map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 bg-orange-600/60 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Offset Orange Circle (Background) */}
                                <div className="absolute inset-0 -translate-x-6 translate-y-2 border-[1.5px] border-orange-500 rounded-full z-0 opacity-80"></div>

                                {/* 3. Main Image Container (Circular) */}
                                <div className="absolute inset-0 rounded-full overflow-hidden border-1 border-orange-700/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10">
                                    <img
                                        src={welcomeImage}
                                        alt="Small Class Training"
                                        className="w-full h-full object-cover scale-110"
                                    />

                                    {/* 4. Inner White Ring Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center p-[20%]">
                                        <div className="w-full h-full rounded-full border-[18px] border-orange-500/90 shadow-inner"></div>
                                    </div>
                                </div>

                                {/* 5. Trusted Badge (Bottom Left) */}
                                <div className="absolute -bottom-8 -left-8 sm:bottom-4 sm:-left-4 bg-white rounded-full shadow-2xl z-30 w-36 h-36 sm:w-56 sm:h-56 p-4 flex flex-col items-center justify-center text-center">
                                    <div className="absolute inset-3 border border-dashed border-gray-400 rounded-full"></div>
                                    <span className="relative z-10 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Trusted By</span>
                                    <span className="relative z-10 text-3xl sm:text-5xl font-black text-orange-500 leading-none italic">500+</span>
                                    <span className="relative z-10 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Students</span>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* REPLICATED Courses Header */}
            <section className="relative z-10">
                <div className="bg-orange-500 py-24 px-4 relative flex flex-col items-center justify-center overflow-visible">
                    {/* Educational Symbol Pattern Background */}
                    <div
                        className="absolute inset-0 opacity-90 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url('https://www.transparenttextures.com/patterns/mathematics.png')`,
                            filter: 'brightness(0) invert(1)'
                        }}
                    ></div>

                    <h2 className="text-5xl md:text-6xl font-black text-white relative z-10 text-center uppercase tracking-tight leading-none drop-shadow-xl">
                        Browse Our <br />
                        Courses
                    </h2>

                    {/* Downward Orange Triangle (Points to white section) */}
                    <div className="absolute -bottom-[60px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-t-[70px] border-t-orange-500 z-30"></div>
                </div>

                <div className="bg-white py-24 px-4 overflow-hidden">
                    <div className="max-w-7xl mx-auto relative group">
                        {/* Course Slider Container */}
                        <div className="relative overflow-hidden px-4 md:px-12">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
                            >
                                {courses.map((course, index) => (
                                    <div
                                        key={index}
                                        className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                                    >
                                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full min-h-[500px]">
                                            <div className="h-64 overflow-hidden">
                                                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-8 flex flex-col flex-grow justify-between">
                                                <h3 className="text-xl font-bold text-navy-900 leading-tight mb-8">
                                                    {course.title}
                                                </h3>

                                                <div className="relative">
                                                    {/* Shadow/Border effect for button */}
                                                    <div className="absolute inset-0 bg-gray-800/20 translate-x-2 translate-y-2 rounded"></div>
                                                    <button
                                                        onClick={() => navigate('courses')}
                                                        className="relative w-full bg-[#EA9457] text-white font-extrabold py-4 rounded shadow-lg hover:bg-[#d88448] transition-colors"
                                                    >
                                                        See Preview
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows - Only show if carousel is needed */}
                        {needsCarousel && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-100 p-2 rounded shadow-lg text-orange-500 hover:scale-110 transition-transform flex items-center justify-center"
                                >
                                    <ChevronLeft size={24} strokeWidth={3} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white border border-gray-100 p-2 rounded shadow-lg text-orange-500 hover:scale-110 transition-transform flex items-center justify-center"
                                >
                                    <ChevronRight size={24} strokeWidth={3} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 px-4 bg-navy-900 text-white relative overflow-hidden z-10">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                Why Choose <span className="text-orange-500 italic">Greyhales Academy?</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Discover how to create stunning spaces, build a design business, and work with clients worldwide, all from the comfort of your home with our premium online interior design programs. We help you design with confidence and launch a thriving career.
                            </p>

                            <div className="grid grid-cols-2 space-y-5">
                                {[

                                    "High Quality Curriculum",

                                    "Dedicated Facilitators",

                                    "Flexible Learning",

                                    "Creative Community",

                                    "Certificate Of Completion",

                                    "Internship Opportunities",

                                    "Data Bundle Rewards",

                                    "Lifetime Access"
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 flex-shrink-0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                                        </div>
                                        <span className="text-lg text-gray-200">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600"
                                className="rounded-2xl h-80 w-full object-cover shadow-2xl hover:scale-105 transition-transform"
                                alt="Benefit 1"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600"
                                className="rounded-2xl h-80 w-full object-cover mt-12 shadow-2xl hover:scale-105 transition-transform"
                                alt="Benefit 2"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/*  Final CTA Banner */}
            <section className="relative py-32 px-4 overflow-hidden">
                {/* Fixed Parallax Background */}
                <div className="absolute inset-0 z-0" style={{ clipPath: 'inset(0)' }}>
                    <div
                        className="fixed inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://media.istockphoto.com/id/1480277406/photo/graduation-group-and-back-view-of-students-celebrate-education-success-behind-of-excited.jpg?s=612x612&w=0&k=20&c=KRfzU9eeBsUdCNUXQSIx4yf6O2PlMD9XvckFgx-hndc=')",
                            zIndex: -1
                        }}
                    ></div>
                    {/* Orange Opacity Overlay */}
                    <div className="absolute inset-0 bg-[#EA9457]/80 mix-blend-multiply"></div>
                </div>

                <div className="pl-4 md:pl-10">
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-12 leading-[1] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                        Learn anywhere, <br />
                        design confidently, and <br />
                        turn your passion into <br />
                        a thriving career.
                    </h2>

                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gray-900/40 translate-x-1.5 translate-y-1.5 rounded"></div>
                        <button
                            onClick={() => navigate('contact')}
                            className="relative bg-[#EA9457] text-white px-14 py-4 rounded font-black text-2xl hover:bg-[#d88448] transition-all"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>


        </main>
    );
};

export default HomePage;
