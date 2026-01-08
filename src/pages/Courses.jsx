import React from 'react';

const CoursesPage = ({ navigate, onSelectCourse }) => {
    const courses = [
        {
            id: 1,
            title: 'Module 1: Interior Design Blueprint Course',
            img: 'https://jdinstituteoffashiontechnology.b-cdn.net/wp-content/uploads/2025/11/Certificate-Course-in-Modular-Interior-Design--1536x1024.webp',
            desc: "This carefully curated blueprint course walks you through the complete interior design process. You'll learn how to plan, style, visualize, and present interior spaces professionally-culminating in a final project that showcases your design expertise and creative growth",
            level: 'All Levels',
            curriculum: [
                {
                    title: "Module 1: Introduction to Interior Design",
                    content: "An overview of interior design fundamentals, professional roles, design processes, and industry expectations. This module lays the foundation for understanding how interior design works in practice."
                },
                {
                    title: "Module 2: Space Planning",
                    content: "Learn how to plan functional and efficient layouts by understanding scale, circulation, zoning, and furniture placement to maximize comfort and usability in interior spaces."
                },
                {
                    title: "Module 3: Lighting in Interior Design",
                    content: "Explore the principles of lighting, including natural and artificial light, lighting types, placement, and how lighting affects mood, functionality, and aesthetics."
                },
                {
                    title: "Module 4: Color in Interior Design",
                    content: "Understand color theory, color psychology, and how to create harmonious color schemes that enhance spaces and communicate the desired atmosphere."
                },
                {
                    title: "Module 5: Textiles",
                    content: "Gain insight into fabrics and soft furnishings, including their properties, applications, and how to select textiles that add comfort, texture, and visual interest to interiors."
                },
                {
                    title: "Module 6: Interior Finishes",
                    content: "Learn about surface materials such as flooring, wall finishes, and ceilings, focusing on material selection, durability, and aesthetic impact."
                },
                {
                    title: "Module 7: Furniture, Art, and Accessories",
                    content: "Discover how to select, arrange, and style furniture, artwork, and accessories to create balanced, cohesive, and visually appealing interiors."
                },
                {
                    title: "Module 8: Mood Board",
                    content: "Learn how to create professional mood boards that visually communicate design concepts, materials, colors, and overall design direction."
                },
                {
                    title: "Module 9: 3D Modeling",
                    content: "An introduction to 3D modeling tools and techniques used to visualize interior spaces and present design ideas clearly to clients."
                },
                {
                    title: "Module 10: Final Project",
                    content: "Apply everything learned throughout the course to complete a comprehensive interior design project, showcasing your skills from concept development to final presentation."
                }
            ]
        },
        {
            id: 2,
            title: 'Module 2: Computer Aids Design',
            img: 'https://www.elcamino.edu/images/New_CADD_Hero_Banner.jpg',
            desc: 'This module focuses on Computer-Aided Design (CAD) as a fundamental aspect of modern interior design. Learn to create professional 2D floor plans, elevations, and 3D visualizations using industry-standard software to bring your design concepts to life.',
            level: 'All Levels',
            curriculum: [
                {
                    title: 'Lesson 1: Introduction to CAD for Interior Design',
                    content: 'Learn the fundamentals of Computer-Aided Design and how it revolutionizes the interior design workflow, from initial concepts to final presentations.'
                },
                {
                    title: 'Lesson 2: 2D Drafting Fundamentals',
                    content: 'Master the essential 2D drafting tools and techniques for creating floor plans, elevations, sections, and construction documents.'
                }
            ]
        },
        {
            id: 3,
            title: 'Module 3: Interio Business Mastery',
            img: 'https://booksofdiscovery.com/wp-content/uploads/2022/08/BM-F-450pxw.jpg',
            desc: 'This is a business-focused course designed to help interior designers turn their creative skills into a profitable and sustainable business. This course covers everything from brand building and client acquisition to project management and long-term growth strategies.',
            level: 'All Levels',
            curriculum: [
                {
                    title: 'Lesson 1: Introduction to Interior Design as a Business',
                    content: 'Understand how the interior design industry operates from a business perspective, including the mindset required to succeed as a professional designer.'
                },
                {
                    title: 'Lesson 2: Building Your Brand',

                    content: 'Learn how to define your brand identity, position yourself in the market, and create a strong, recognizable presence that attracts your ideal clients.'
                },
                {
                    title: 'Lesson 3: Setting Up and Running Your Business',

                    content: 'This lesson covers the essentials of launching and managing your interior design business, including legal structure, operations, workflows, and daily business management.'
                }
                ,
                {
                    title: 'Lesson 4: Marketing and Client Acquisition',

                    content: 'Discover effective marketing strategies and systems for attracting, converting, and retaining clients using both online and offline channels.'
                },
                {
                    title: 'Lesson 5: Managing Projects and Growing Your Business',

                    content: 'Learn how to manage client projects professionally—from timelines and budgets to communication—while building systems that support business growth.'
                },
                {
                    title: 'Lesson 6: Advanced Growth Strategies',

                    content: 'Explore advanced strategies for scaling your interior design business, increasing profitability, expanding your services, and positioning yourself for long-term success.'
                }
            ]
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
