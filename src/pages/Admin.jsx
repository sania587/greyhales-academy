import React, { useState, useEffect } from 'react';

const AdminPage = ({ navigate }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEnrollments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/enroll`);
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
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
                        {enrollments.length > 0 ? enrollments.map((en, i) => (
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
            </div>
        </main>
    );
};

export default AdminPage;
