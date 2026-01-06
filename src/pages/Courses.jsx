import React from 'react';

const CoursesPage = ({ navigate, onSelectCourse }) => {
    const courses = [
        {
            id: 1,
            title: 'Module 1: Fundamental of Interior Design (Sketching Skill)',
            img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
            desc: 'The Fundamental of Interior Design (Sketching Skill) course teaches essential sketching techniques to visualize and...',
            level: 'All Levels'
        },
        {
            id: 2,
            title: 'Module 2: Computer Aids Design (2D)',
            img: 'https://www.elcamino.edu/images/New_CADD_Hero_Banner.jpg',
            desc: 'This module focuses on 2D design as a fundamental aspect of interior design, serving as...',
            level: 'All Levels'
        },
        {
            id: 3,
            title: 'Module 3: Computer Aids Design (3D)',
            img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
            desc: 'Master the 3D modeling skills to transform your 2D sketches into vibrant, realistic 3D environments...',
            level: 'All Levels'
        },
        {
            id: 4,
            title: 'Module 4: Residential Design',
            img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
            desc: 'Learn the principles of residential interior design, focusing on creating functional and beautiful living spaces...',
            level: 'All Levels'
        },
        {
            id: 5,
            title: 'Module 5: Commercial Design',
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
            desc: 'Dive into the world of commercial design, learning to plan office spaces, retail environments, and more...',
            level: 'All Levels'
        },
        {
            id: 6,
            title: 'Module 6: Interior Design',
            img: 'https://www.elcamino.edu/images/New_CADD_Hero_Banner.jpg',
            desc: 'Dive into the world of commercial design, learning to plan office spaces, retail environments, and more...',
            level: 'All Levels'
        }
    ];

    const handleReadMore = (course) => {
        onSelectCourse(course);
    };

    return (
        <main className="bg-white pb-20">
            {/* Header Section */}
            <div className="relative py-20 px-4 text-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage:
                            "url('https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg?semt=ais_hybrid&w=740&q=80')",
                    }}
                />

                {/* Overlay color (optional for tint) */}
                <div className="absolute inset-0 bg-neon-700/60" />

                {/* Content */}
                <div className="relative z-10">
                    <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-2">
                        Our Courses
                    </h1>
                    <p className="text-gray-200 font-medium italic">
                        Pathways to Professional Excellence
                    </p>
                </div>
            </div>


            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto space-y-12">
                    {courses.map((course) => (
                        <div key={course.id} className="grid md:grid-cols-5 gap-0 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-50 group">
                            {/* Course Image */}
                            <div className="md:col-span-2 h-[320px] overflow-hidden">
                                <img
                                    src={course.img}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Course Content */}
                            <div className="md:col-span-3 p-10 flex flex-col justify-between bg-white">
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-bold text-navy-900 group-hover:text-orange-500 transition-colors leading-tight">
                                        {course.title}
                                    </h3>
                                    <div className="flex items-center space-x-2 text-orange-400">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>
                                        <span className="font-bold text-gray-500">{course.level}</span>
                                    </div>
                                    <p className="text-gray-500 text-lg leading-relaxed line-clamp-2">
                                        {course.desc}
                                    </p>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button
                                        onClick={() => handleReadMore(course)}
                                        className="bg-[#EA9457] text-white px-12 py-3 rounded text-xl font-black hover:bg-[#d88448] transition-all shadow-md active:scale-95"
                                    >
                                        Read more
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default CoursesPage;
