import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CoursesPage from './pages/Courses';
import ContactPage from './pages/Contact';

import CourseDetailPage from './pages/CourseDetail';

import BackButton from './components/BackButton';

import EnrollmentPage from './pages/Enrollment';
import PaymentInfoPage from './pages/PaymentInfo';
import AdminPage from './pages/Admin';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [history, setHistory] = useState(['home']);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const handleLogin = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setCurrentPage('home');
        setHistory(['home']);
    };

    const navigate = (page, course = null) => {
        if (page === 'logout') {
            handleLogout();
            return;
        }
        setCurrentPage(page);
        setHistory(prev => [...prev, page]);
        if (course) {
            setSelectedCourse(course);
        }
        window.scrollTo(0, 0);
    };

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop(); // Remove current page
            const prevPage = newHistory[newHistory.length - 1];
            setCurrentPage(prevPage);
            setHistory(newHistory);
        } else {
            setCurrentPage('home');
            setHistory(['home']);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'about':
                return <AboutPage navigate={navigate} />;
            case 'courses':
                return <CoursesPage navigate={navigate} onSelectCourse={(course) => navigate('course-detail', course)} />;
            case 'course-detail':
                return <CourseDetailPage course={selectedCourse} navigate={navigate} />;
            case 'contact':
                return <ContactPage navigate={navigate} />;
            case 'enrollment':
                return user ? <EnrollmentPage navigate={navigate} course={selectedCourse} token={token} /> : <LoginPage navigate={navigate} onLogin={handleLogin} message="Please login to enroll" />;
            case 'payment-info':
                return <PaymentInfoPage navigate={navigate} />;
            case 'admin':
                return user && user.role === 'admin' ? <AdminPage navigate={navigate} /> : <LoginPage navigate={navigate} onLogin={handleLogin} />;
            case 'login':
                return <LoginPage navigate={navigate} onLogin={handleLogin} />;
            case 'register':
                return <RegisterPage navigate={navigate} onLogin={handleLogin} />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header navigate={navigate} currentPage={currentPage} user={user} />
            <BackButton onClick={goBack} show={currentPage !== 'home'} />
            <div className="flex-grow">
                {renderPage()}
            </div>
            <Footer navigate={navigate} />
        </div>
    );
}

export default App;
