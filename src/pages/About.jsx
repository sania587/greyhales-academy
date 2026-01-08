import React, { useState, useEffect } from 'react';

const AboutPage = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const sliderImages = [
        'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setSliderIndex((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main>
            <div className="bg-gray-200 py-12 px-4 text-center">
                <h1 className="text-4xl font-bold mb-2">About Us</h1>
                <p className="text-gray-600">Home . About Us</p>
            </div>

            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">

                    <div className="grid md:grid-cols-1 gap-12 items-center">

                        <div className="text-justify space-y-4 italic text-gray-700 leading-relaxed">
                            <p>
                                "Greyhales Academy was created with a simple belief: interior design should feel accessible, inspiring, and genuinely transformative. We exist to guide emerging designers with warmth, clarity, and the kind of practical knowledge that truly builds confidence.
                            </p>
                            <p>
                                Our mission is to help people see design not just as decoration, but as a thoughtful craft that shapes how we live. Every course we create reflects that purpose. We teach with honesty, curiosity, and a deep respect for both creativity and function.
                            </p>
                            <p>
                                Rather than overwhelming students with jargon or rigid rules, we focus on understanding why decisions matter, how spaces affect people, and what it takes to bring an idea to life with intention.
                            </p>
                            <p>
                                At the heart of Greyhales Academy is a commitment to integrity, growth, and the belief that design should welcome every voice. We value thoughtful work over trends, process over shortcuts, and learning that evolves with the world around us.
                            </p>
                            <p>
                                Our teaching style is grounded and human. We encourage exploration, support mistakes as part of the journey, and offer tools you can use from day one.
                            </p>
                            <p>
                                The impact we aim to create goes beyond completing a course. We want our students to step into the design industry with confidence, a strong creative point of view, and a deeper appreciation for the spaces we shape.
                            </p>
                            <p>
                                Greyhales Academy is more than an online school, it's a place where potential feels tangible, creativity feels supported, and every learner is encouraged to grow into the designer they're meant to become."
                            </p>
                        </div>
                    </div>
                </div>
            </section>





            {/* Journey Section with Orange Overlay */}
            <section className="relative py-32 px-4 overflow-hidden">
                {/* Fixed Parallax Background */}
                <div className="absolute inset-0 z-0" style={{ clipPath: 'inset(0)' }}>
                    <div
                        className="fixed inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nEVanJCBIn4k1y3gNCkcm6f9W4utrWKBoA&s')",
                            zIndex: -1
                        }}
                    ></div>
                    {/* Orange Opacity Overlay */}
                    <div className="absolute inset-0 bg-[#EA9457]/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-orange-500/40"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight drop-shadow-xl">
                        Start your interior design journey today! Join our classes to enhance your creativity and professional skills.
                    </h2>

                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-navy-900/30 translate-x-2 translate-y-2 rounded transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                        <button className="relative bg-[#EA9457] text-white px-12 py-5 rounded font-black text-2xl hover:bg-[#d88448] transition-all border-2 border-white/20">
                            Contact Us Now
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
