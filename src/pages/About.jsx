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

                    <h2 className="text-5xl font-bold text-center mb-12">The Purpose of <br></br>Greyhales Academy</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="bg-gray-300 h-100 rounded-lg overflow-hidden shadow-xl">
                            <img src="https://www.interiordesignacademy.my/wp-content/uploads/2025/01/2148346288-1024x682.jpg" alt="Interior Design" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-justify space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Greyhales Academy was created with a simple belief: interior design should feel accessible, inspiring, and genuinely transformative. We exist to guide emerging designers with warmth, clarity, and the kind of practical knowledge that truly builds confidence.
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
                                Greyhales Academy is more than an online school, it's a place where potential feels tangible, creativity feels supported, and every learner is encouraged to grow into the designer they're meant to become.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Teacher Section */}
            <section className="py-24 px-4 bg-[#cbdceb]">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-navy-900 mb-20 uppercase tracking-tight">
                        Meet Our Teacher
                    </h2>

                    <div className="relative max-w-xl mx-auto ">
                        {/* Profile Image - Circular with border */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-20 z-20">
                            <div className=" w-48 h-48 rounded-full border-[12px] border-[#cbdceb] overflow-hidden shadow-xl">
                                <img
                                    src="https://www.interiordesignacademy.my/wp-content/uploads/2025/02/teacher-719x510.png"
                                    alt="Founder"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-[#b9cedf] pt-36 pb-12 rounded-lg border border-white/30 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black text-navy-900 mb-2">IDAcademy</h3>
                                <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">Founder</p>
                            </div>

                            {/* White Bottom Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-4 bg-white"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-6xl font-bold text-center mb-4">Small Class, Big Impact</h2>
                    <p className="text-2xl text-center text-gray-600 mb-16">Fostering Creative and Technical Excellence in Interior Design</p>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Auto Slider Column */}
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            {sliderImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === sliderIndex ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {/* Dots navigation */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                                {sliderImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-3 h-3 rounded-full transition-all ${idx === sliderIndex ? 'bg-orange-500 w-8' : 'bg-white/50'}`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-4xl font-black text-navy-900 mb-8 leading-tight">
                                We are small class basis<br />
                                <span className="text-3xl text-orange-500">(Maximum 10 pax per class)</span><br />
                                <span className="text-2xl text-gray-400">我们是小班授课（每班最多 10 人）</span>
                            </h3>
                            <div className="space-y-6 text-xl text-gray-600 leading-relaxed text-justify">
                                <p>
                                    In the context of interior design education, these benefits contribute significantly to the development of a student's creative and technical skills, preparing them more effectively for professional challenges and opportunities in the field.
                                </p>
                                <p>
                                    在室内设计教育的背景下，这些好处极大地促进了学生的创造力和技术技能的发展，使他们更有效地应对该领域的专业挑战和机会。
                                </p>
                            </div>
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
