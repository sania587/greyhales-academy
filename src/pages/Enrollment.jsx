import React, { useState } from 'react';

const EnrollmentPage = ({ navigate, course, token }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        course: course?.title || ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Actual backend URL will be used once server is set up
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('payment-info');
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Submission failed. Please check your connection or try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-gray-50 pb-20 pt-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-navy-900 p-8 text-white text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-widest">Enrollment Form</h1>
                    <p className="text-orange-400 mt-2 font-medium">Start Your Design Journey Today</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase">First Name</label>
                            <input
                                required
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                                placeholder="John"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase">Last Name</label>
                            <input
                                required
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase">Phone Number</label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                                placeholder="+234..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 uppercase">Email Address</label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase">Address</label>
                        <textarea
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                            placeholder="Your full address..."
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 uppercase">Course Selection</label>
                        <input
                            disabled
                            type="text"
                            name="course"
                            value={formData.course}
                            className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 text-gray-500 font-bold"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-[#EA9457] text-white py-4 rounded-xl font-black text-xl hover:bg-[#d88448] transition-all shadow-xl active:scale-95 flex items-center justify-center"
                    >
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default EnrollmentPage;
