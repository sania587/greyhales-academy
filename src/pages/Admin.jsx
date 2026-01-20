import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const AdminPage = ({ navigate }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEnrollments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/enroll`);
            if (response.ok) {
                const data = await response.json();
                setEnrollments(data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = enrollments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(enrollments.length / itemsPerPage);

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-navy-900 uppercase tracking-tight">Registered Users</h1>
                <button
                    onClick={fetchEnrollments}
                    className="bg-navy-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition-all flex items-center space-x-2"
                >
                    <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    <span>Refresh</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 font-black text-navy-900">Name</th>
                            <th className="p-4 font-black text-navy-900">Email</th>
                            <th className="p-4 font-black text-navy-900">Phone</th>
                            <th className="p-4 font-black text-navy-900">Course</th>
                            <th className="p-4 font-black text-navy-900 text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? currentItems.map((en, i) => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 text-gray-600 font-medium">{en.firstName} {en.lastName}</td>
                                <td className="p-4 text-gray-600 italic">{en.email}</td>
                                <td className="p-4 text-gray-600 font-bold">{en.phone}</td>
                                <td className="p-4">
                                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase">
                                        {en.course}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-center text-sm">{new Date(en.createdAt).toLocaleDateString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-400 italic">
                                    {loading ? 'Loading data...' : 'No registrations found yet.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {enrollments.length > itemsPerPage && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-bold">{indexOfFirstItem + 1}</span> to <span className="font-bold">{Math.min(indexOfLastItem, enrollments.length)}</span> of <span className="font-bold">{enrollments.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <button
                                            key={idx + 1}
                                            onClick={() => setCurrentPage(idx + 1)}
                                            aria-current={currentPage === idx + 1 ? 'page' : undefined}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === idx + 1 ? 'bg-orange-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdminPage;
