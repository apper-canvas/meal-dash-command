import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const HomeIcon = getIcon('home');
const AlertTriangleIcon = getIcon('alert-triangle');

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex flex-col items-center justify-center p-4"
    >
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6 flex justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              duration: 0.8 
            }}
          >
            <AlertTriangleIcon className="w-24 h-24 text-primary" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-800 dark:text-white">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-surface-700 dark:text-surface-200">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 text-lg">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center">
          <Link 
            to="/"
            className="btn-primary px-6 py-3 flex items-center space-x-2"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;