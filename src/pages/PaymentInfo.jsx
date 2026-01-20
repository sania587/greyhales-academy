import React from 'react';

const PaymentInfoPage = ({ navigate }) => {
    return (
        <main className="bg-gray-50 pb-20 pt-10 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-green-600 p-8 text-white text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h1 className="text-3xl font-bold uppercase tracking-widest">Enrollment Successful!</h1>
                    <p className="mt-2 font-medium opacity-90">Please complete your payment to finalize registration.</p>
                </div>

                <div className="p-10 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-navy-900 border-b pb-2">Payment Details</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <span className="text-gray-500 font-bold uppercase text-sm">Bank Name</span>
                            <span className="text-navy-900 font-black">Monipoint Microfinance Bank</span>

                            <span className="text-gray-500 font-bold uppercase text-sm">Account Number</span>
                            <span className="text-orange-500 font-black text-xl tracking-widest sm:text-md">8148554538</span>

                            <span className="text-gray-500 font-bold uppercase text-sm">Account Name</span>
                            <span className="text-navy-900 font-black italic">Greyhales Academy</span>
                        </div>
                    </div>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-xl">
                        <p className="text-navy-900 font-medium text-md italic sm:text-sm">
                            "Please forward your proof of payment to <a href="mailto:enrollment@greyhalesacademy.com" className="text-orange-600 font-bold underline text-sm">enrollment@greyhalesacademy.com</a>"
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <button
                            onClick={() => navigate('home')}
                            className="w-full border-2 border-navy-900 text-navy-900 py-4 rounded-xl font-black text-xl hover:bg-navy-900 hover:text-white transition-all active:scale-95"
                        >
                            Back to Home
                        </button>
                        <p className="text-center text-gray-400 text-sm">A confirmation email will be sent once payment is verified.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaymentInfoPage;
