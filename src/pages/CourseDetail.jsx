import React, { useState } from 'react';

const CourseDetailPage = ({ course, navigate }) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!course) return null;

    return (
        <main className="bg-white pb-20">
            {/* Page Header */}
            <div className="bg-[#f2f5f7] py-20 px-4 text-center">
                <h1 className="text-5xl font-black text-navy-900 uppercase tracking-widest mb-4">Course</h1>
                <p className="text-gray-500 font-medium">
                    <span className="hover:text-orange-500 cursor-pointer" onClick={() => navigate('home')}>Home</span>
                    <span className="mx-2">.</span>
                    {course.title}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-navy-900 mb-8">{course.title}</h2>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img src={course.img} alt={course.title} className="w-full h-auto object-cover" />
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-100">
                            {['overview', 'curriculum'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-12 py-4 font-black text-lg transition-all relative capitalize ${activeTab === tab
                                        ? 'text-white bg-[#EA9457]'
                                        : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#EA9457]"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white p-8 border border-gray-100 rounded-b-xl shadow-sm">
                            {activeTab === 'overview' ? (
                                <div className="space-y-8 animate-fade-in">
                                    <p className="text-gray-600 leading-relaxed text-lg italic">
                                        {course.desc}
                                    </p>
                                    <div>
                                        <h4 className="text-2xl font-bold text-navy-900 mb-4">Objective:</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            Equip learners with the skills and knowledge required to design functional, aesthetic, and professional spaces using industry-standard principles and software tools.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-10 animate-fade-in">
                                    <h4 className="text-2xl font-bold text-navy-900">Course Outline</h4>
                                    <div className="space-y-8">
                                        {course.curriculum && course.curriculum.length > 0 ? (
                                            course.curriculum.map((module, index) => (
                                                <div key={index} className="border-l-4 border-orange-500 pl-6 py-2">
                                                    <h5 className="text-xl font-bold text-navy-900 mb-3">{module.title}</h5>
                                                    <p className="text-gray-600 leading-relaxed">{module.content}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="border-l-4 border-orange-500 pl-6 py-2">
                                                <h5 className="text-xl font-bold text-navy-900 mb-3">Coming Soon...</h5>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">


                        <button

                            className="w-full bg-navy-900 text-white py-5 rounded-xl font-black text-xl hover:bg-black transition-all shadow-xl hover:-translate-y-1"
                        >
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CourseDetailPage;
