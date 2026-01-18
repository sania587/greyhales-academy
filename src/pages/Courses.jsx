import React from 'react';
import courses from '../data/courses';

const CoursesPage = ({ navigate, onSelectCourse }) => {

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

                                <div className="flex flex-col items-center justify-center pt-6 space-y-4">
                                    <button
                                        onClick={() => handleReadMore(course)}
                                        className="w-[200px] bg-[#EA9457] text-white font-extrabold py-3 rounded shadow-lg hover:bg-[#d88448] transition-colors"
                                    >
                                        Learn More
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
