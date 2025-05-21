import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getIcon } from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const MoonIcon = getIcon('moon');
const SunIcon = getIcon('sun');

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.9 9.6c-.2-.5-.8-.7-1.3-.5l-2.9 1.4-2.1-5.1c-.2-.5-.8-.7-1.3-.5l-1.9.8c-.5.2-.7.8-.5 1.3l2.1 5.1-2.9 1.4c-.5.2-.7.8-.5 1.3l.8 1.9c.2.5.8.7 1.3.5l2.9-1.4 2.1 5.1c.2.5.8.7 1.3.5l1.9-.8c.5-.2.7-.8.5-1.3l-2.1-5.1 2.9-1.4c.5-.2.7-.8.5-1.3l-.8-1.9zM8.1 10.5l1.4-2.8c.2-.5 0-1.1-.5-1.3L7.1 5.6c-.5-.2-1.1 0-1.3.5L4.4 9l-2.8 1.4c-.5.2-.7.8-.5 1.3l.8 1.9c.2.5.8.7 1.3.5L6 12.6l1.4 2.8c.2.5.8.7 1.3.5l1.9-.8c.5-.2.7-.8.5-1.3l-.8-1.9c-.2-.5-.8-.7-1.3-.5l-1.9.1z"/>
            </svg>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">MealDash</h1>
          </div>
          
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-surface-600" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-surface-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-surface-500 dark:text-surface-400 text-sm">
            © {new Date().getFullYear()} MealDash. All rights reserved.
          </div>
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;