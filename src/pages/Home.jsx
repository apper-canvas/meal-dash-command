import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Import icons using our utility
const MapPinIcon = getIcon('map-pin');
const SearchIcon = getIcon('search');
const XIcon = getIcon('x');

const Home = () => {
  // State for user location and search
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample restaurant data for our MVP
  const [restaurants, setRestaurants] = useState([]);
  
  // Mock restaurant data (in a real app this would come from an API)
  const mockRestaurants = [
    {
      id: 'r1',
      name: 'Spice Garden',
      cuisineType: ['Indian', 'Curry'],
      priceRange: '$$',
      rating: 4.5,
      deliveryTime: 30,
      imageUrl: 'https://source.unsplash.com/WOxddhzhC1w/600x400',
      isOpen: true,
    },
    {
      id: 'r2',
      name: 'Burger Junction',
      cuisineType: ['American', 'Fast Food'],
      priceRange: '$',
      rating: 4.2,
      deliveryTime: 25,
      imageUrl: 'https://source.unsplash.com/MQUqbmszGGM/600x400',
      isOpen: true,
    },
    {
      id: 'r3',
      name: 'Sushi Master',
      cuisineType: ['Japanese', 'Sushi'],
      priceRange: '$$$',
      rating: 4.7,
      deliveryTime: 40,
      imageUrl: 'https://source.unsplash.com/9_MMSwkwP_M/600x400',
      isOpen: true,
    },
    {
      id: 'r4',
      name: 'Pizza Palace',
      cuisineType: ['Italian', 'Pizza'],
      priceRange: '$$',
      rating: 4.0,
      deliveryTime: 35,
      imageUrl: 'https://source.unsplash.com/MQUqbmszGGM/600x400',
      isOpen: true,
    },
    {
      id: 'r5',
      name: 'Taco Fiesta',
      cuisineType: ['Mexican', 'Tacos'],
      priceRange: '$$',
      rating: 4.3,
      deliveryTime: 30,
      imageUrl: 'https://source.unsplash.com/IGfIGP5ONV0/600x400',
      isOpen: false,
    },
    {
      id: 'r6',
      name: 'Noodle House',
      cuisineType: ['Chinese', 'Noodles'],
      priceRange: '$',
      rating: 4.1,
      deliveryTime: 25,
      imageUrl: 'https://source.unsplash.com/kcA-c3f_3FE/600x400',
      isOpen: true,
    },
  ];
  
  // Simulate loading restaurant data
  useEffect(() => {
    const timer = setTimeout(() => {
      setRestaurants(mockRestaurants);
      setIsLoading(false);
      
      // Auto-detect location if empty
      if (!location) {
        setLocation('New York');
        toast.info("We've set your location to New York for demo purposes");
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle location selection
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      setShowLocationModal(false);
      toast.success(`Location updated to ${location}`);
    } else {
      toast.error("Please enter a valid location");
    }
  };
  
  // Filter restaurants based on search query
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisineType.some(cuisine => cuisine.toLowerCase().includes(query))
    );
  });
  
  return (
    <div className="min-h-screen">
      {/* Hero section with location selector */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Food Delivery Made Simple</h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Order from your favorite restaurants and get food delivered to your doorstep
            </p>
            
            <div className="flex items-center justify-center mb-8">
              <button 
                onClick={() => setShowLocationModal(true)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all"
              >
                <MapPinIcon className="h-5 w-5" />
                <span>{location || 'Set your location'}</span>
              </button>
            </div>

            {/* Search bar */}
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search for restaurant or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pr-12 text-surface-800 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <SearchIcon className="h-5 w-5 text-surface-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Main content with restaurants */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-surface-800 dark:text-white">
          Restaurants Near You
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-48 bg-surface-200 dark:bg-surface-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <motion.div
                key={restaurant.id}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="card hover:shadow-lg cursor-pointer overflow-hidden"
              >
                <div className="relative h-48 -mx-4 -mt-4 mb-4">
                  <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {!restaurant.isOpen && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-surface-900/80 text-white px-3 py-1 rounded-lg text-sm font-medium">
                        Currently Closed
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="bg-white dark:bg-surface-800 text-surface-800 dark:text-white px-2 py-1 rounded-lg text-sm font-medium shadow-sm">
                      {restaurant.deliveryTime} min
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-1 text-surface-900 dark:text-white">{restaurant.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-surface-700 dark:text-surface-300">
                      {restaurant.rating}
                    </span>
                  </div>
                  <span className="mx-2 text-surface-400">•</span>
                  <span className="text-sm text-surface-600 dark:text-surface-400">{restaurant.priceRange}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {restaurant.cuisineType.map((cuisine, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 px-2 py-1 rounded-full"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-surface-600 dark:text-surface-400">
              No restaurants found matching "{searchQuery}"
            </h3>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 btn-secondary"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
      
      {/* Main Feature Section */}
      <MainFeature />
      
      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-surface-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Set Your Location</h3>
              <button 
                onClick={() => setShowLocationModal(false)}
                className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleLocationSubmit}>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Delivery Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your delivery address"
                  className="input"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLocationModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Location
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;