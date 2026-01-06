import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CoursesPage from './pages/Courses';
import ContactPage from './pages/Contact';

import CourseDetailPage from './pages/CourseDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const navigate = (page, course = null) => {
    setCurrentPage(page);
    if (course) {
      setSelectedCourse(course);
    }
    window.scrollTo(0, 0);
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
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header navigate={navigate} currentPage={currentPage} />
      <div className="flex-grow">
        {renderPage()}
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
