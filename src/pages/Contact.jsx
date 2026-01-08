import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = ({ navigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            alert('Please fill in required fields (Name and Email)');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="bg-white">
            {/* Page Header */}

            <div className="bg-gray-200 py-12 px-4 text-center">
                <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
            </div>

            {/* Get In Touch Section */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-6xl font-black text-navy-900 leading-tight">
                            Get in Touch <br /> With Us
                        </h2>
                        <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                            Have a question or need further assistance? Reach out to us by filling out the form below, and we'll get back to you as soon as possible!
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Location */}
                        <div className="flex items-start space-x-6 pb-6 border-b border-gray-100">
                            <div className="bg-[#fdf3ec] p-4 rounded-full">
                                <MapPin className="text-[#EA9457]" size={28} />
                            </div>
                            <div>
                                <p className="text-navy-900 font-bold text-2xl">
                                    Nigeria
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-6 pb-6 border-b border-gray-100">
                            <div className="bg-[#fdf3ec] p-4 rounded-full">
                                <Mail className="text-[#EA9457]" size={28} />
                            </div>
                            <p className="text-navy-900 font-bold text-2xl pt-2">Info@greyhalesacademy.com</p>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start space-x-6">
                            <div className="bg-[#fdf3ec] p-4 rounded-full">
                                <Phone className="text-[#EA9457]" size={28} />
                            </div>
                            <p className="text-navy-900 font-bold text-2xl pt-2">+234 8148554538</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-24 px-4 bg-orange-500/80 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-black text-white mb-16">Got Question?</h2>

                    <form onSubmit={handleSubmit} className="space-y-8 text-left">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="block text-white font-bold">Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border border-gray-200 rounded focus:border-orange-500 focus:outline-none transition-colors italic text-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-white font-bold">Email <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border border-gray-200 rounded focus:border-orange-500 focus:outline-none transition-colors italic text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-white font-bold">Subject <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-4 border border-gray-200 rounded focus:border-orange-500 focus:outline-none transition-colors italic text-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-white font-bold">Message</label>
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-4 border border-gray-200 rounded focus:border-orange-500 focus:outline-none transition-colors italic text-gray-400 resize-none"
                            ></textarea>
                        </div>

                        {/* Dummy reCAPTCHA Placeholder */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-4 inline-flex items-center space-x-4">
                            <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                            <span className="text-gray-600 font-medium">I'm not a robot</span>
                            <div className="ml-10">
                                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="recaptcha" className="w-8 h-8 opacity-50" />
                                <p className="text-[8px] text-gray-400 text-center">reCAPTCHA</p>
                            </div>
                        </div>

                        <div className="text-center pt-8">
                            <button
                                type="submit"
                                className="bg-[#EA9457] text-white px-16 py-4 rounded text-xl font-black hover:bg-[#d88448] transition-all shadow-lg active:scale-95"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Map Section */}
            <div className="w-full h-[600px] bg-gray-100">
                <iframe
                    title="location-map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15934.346853385732!2d101.6215!3d3.2201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4612e69818e3%3A0xe5a363a0a39a7a9a!2sTaman%20Ehsan%2C%2052100%20Kuala%20Lumpur%2C%20Selangor%2C%20Malaysia!5e0!3m2!1sen!2snl!4v1700000000000!5m2!1sen!2snl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </main>
    );
};

export default ContactPage;
