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
                                        {course.longDesc || "This comprehensive module is designed to provide students with a deep understanding of industry standards and professional workflows."}
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
                                    <h4 className="text-2xl font-bold text-navy-900">Course Outline - 课程大纲</h4>
                                    <div className="space-y-8">
                                        {[1, 2, 3].map((lesson) => (
                                            <div key={lesson} className="border-l-4 border-orange-500 pl-6">
                                                <h5 className="text-xl font-bold text-navy-900 mb-3">Lesson {lesson}: Professional Introduction</h5>
                                                <ul className="space-y-2 text-gray-500">
                                                    <li>• Introduction to core concepts and industry fundamentals.</li>
                                                    <li>• Understanding different design typologies and space planning.</li>
                                                    <li>• Case studies of successful international projects.</li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white border-2 border-gray-50 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-6 flex items-center space-x-6 border-b border-gray-50">
                                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m12-11a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-bold text-sm uppercase">Maximum Students</p>
                                    <p className="text-xl font-black text-navy-900">10</p>
                                </div>
                            </div>
                            <div className="p-6 flex items-center space-x-6">
                                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-7h1" /></svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 font-bold text-sm uppercase">Skill Level</p>
                                    <p className="text-xl font-black text-navy-900">Advanced</p>
                                </div>
                            </div>
                        </div>

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
