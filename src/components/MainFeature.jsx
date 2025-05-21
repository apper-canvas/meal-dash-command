import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon, formatCurrency } from '../utils/appUtils';

// Import icons using our utility
const ShoppingCartIcon = getIcon('shopping-cart');
const PlusIcon = getIcon('plus');
const MinusIcon = getIcon('minus');
const TrashIcon = getIcon('trash-2');
const XIcon = getIcon('x');
const CreditCardIcon = getIcon('credit-card');
const ChevronRightIcon = getIcon('chevron-right');

const MainFeature = () => {
  // Cart state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Menu items state
  const [popularItems, setPopularItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample menu items
  const sampleMenuItems = [
    {
      id: 'm1',
      name: 'Double Cheeseburger',
      description: 'Two beef patties with cheese, lettuce, tomato and special sauce',
      price: 9.99,
      image: 'https://source.unsplash.com/MQUqbmszGGM/400x300',
      restaurant: 'Burger Junction',
      category: 'Burgers'
    },
    {
      id: 'm2',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      price: 12.99,
      image: 'https://source.unsplash.com/20HxBT3sr3A/400x300',
      restaurant: 'Pizza Palace',
      category: 'Pizza'
    },
    {
      id: 'm3',
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices',
      price: 14.99,
      image: 'https://source.unsplash.com/OGJp_0A1Z2M/400x300',
      restaurant: 'Spice Garden',
      category: 'Indian'
    },
    {
      id: 'm4',
      name: 'California Roll',
      description: 'Crab, avocado and cucumber wrapped in seaweed and rice',
      price: 8.99,
      image: 'https://source.unsplash.com/9_MMSwkwP_M/400x300',
      restaurant: 'Sushi Master',
      category: 'Sushi'
    }
  ];
  
  // Load menu items
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopularItems(sampleMenuItems);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        // Add new item with quantity of 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast.success(`Added ${item.name} to cart`);
  };
  
  // Update item quantity
  const updateQuantity = (itemId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId) => {
    const itemToRemove = cart.find(item => item.id === itemId);
    
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    
    if (itemToRemove) {
      toast.info(`Removed ${itemToRemove.name} from cart`);
    }
  };
  
  // Handle checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // In a real app, you would process payment here
    toast.success("Order placed successfully!");
    setCart([]);
    setIsCheckoutOpen(false);
  };
  
  // Toggle cart
  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
    if (isCheckoutOpen) {
      setIsCheckoutOpen(false);
    }
  };
  
  return (
    <section className="py-12 bg-surface-50 dark:bg-surface-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-surface-800 dark:text-white">
            Popular Items Near You
          </h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Explore our selection of delicious meals from top restaurants in your area
          </p>
        </div>
        
        {/* Food items grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-40 bg-surface-200 dark:bg-surface-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-surface-200 dark:bg-surface-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="card hover:shadow-lg overflow-hidden group"
              >
                <div className="h-40 -mx-4 -mt-4 mb-4 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold text-surface-800 dark:text-white">{item.name}</h3>
                  <span className="font-semibold text-primary">{formatCurrency(item.price)}</span>
                </div>
                
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 px-2 py-1 rounded-full">
                    {item.restaurant}
                  </span>
                  
                  <button
                    onClick={() => addToCart(item)}
                    className="btn-primary text-sm py-1.5"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Floating cart button */}
        <div className="fixed bottom-4 right-4 z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCart}
            className="relative bg-primary text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            
            {cart.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
              >
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </motion.span>
            )}
          </motion.button>
        </div>
        
        {/* Cart sidebar */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleCart}
                className="fixed inset-0 bg-black/60 z-30"
              ></motion.div>
              
              {/* Cart panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-surface-800 shadow-xl z-40 overflow-y-auto"
              >
                <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-surface-800 dark:text-white flex items-center">
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    Your Cart
                  </h3>
                  <button
                    onClick={toggleCart}
                    className="text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                
                {!isCheckoutOpen ? (
                  <>
                    {cart.length > 0 ? (
                      <div className="divide-y divide-surface-200 dark:divide-surface-700">
                        {cart.map(item => (
                          <div key={item.id} className="p-4">
                            <div className="flex gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium text-surface-800 dark:text-white">
                                    {item.name}
                                  </h4>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-surface-400 hover:text-surface-600 dark:text-surface-500 dark:hover:text-surface-300"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                                  {item.restaurant}
                                </p>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-lg">
                                    <button
                                      onClick={() => updateQuantity(item.id, -1)}
                                      className="px-2 py-1 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                                    >
                                      <MinusIcon className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 py-1 text-surface-800 dark:text-white">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="px-2 py-1 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
                                    >
                                      <PlusIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                  
                                  <span className="font-medium text-surface-800 dark:text-white">
                                    {formatCurrency(item.price * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 h-64">
                        <ShoppingCartIcon className="w-16 h-16 text-surface-300 dark:text-surface-600 mb-4" />
                        <h4 className="text-lg font-medium text-surface-800 dark:text-white mb-2">
                          Your cart is empty
                        </h4>
                        <p className="text-center text-surface-600 dark:text-surface-400 mb-4">
                          Add some delicious items from the menu to get started
                        </p>
                        <button
                          onClick={toggleCart}
                          className="btn-primary"
                        >
                          Browse Menu
                        </button>
                      </div>
                    )}
                    
                    {cart.length > 0 && (
                      <div className="p-4 bg-surface-50 dark:bg-surface-900 sticky bottom-0 border-t border-surface-200 dark:border-surface-700">
                        <div className="flex justify-between mb-4">
                          <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
                          <span className="font-medium text-surface-800 dark:text-white">
                            {formatCurrency(cartTotal)}
                          </span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span className="text-surface-600 dark:text-surface-400">Delivery Fee</span>
                          <span className="font-medium text-surface-800 dark:text-white">{formatCurrency(2.99)}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-lg font-semibold">
                          <span className="text-surface-800 dark:text-white">Total</span>
                          <span className="text-primary">{formatCurrency(cartTotal + 2.99)}</span>
                        </div>
                        
                        <button
                          onClick={() => setIsCheckoutOpen(true)}
                          className="btn-primary w-full py-3 flex items-center justify-center space-x-2"
                        >
                          <span>Proceed to Checkout</span>
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-4">
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="flex items-center text-surface-600 dark:text-surface-400 hover:text-surface-800 dark:hover:text-white mb-4"
                    >
                      <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Cart
                    </button>
                    
                    <h3 className="text-xl font-semibold text-surface-800 dark:text-white mb-4">
                      Checkout
                    </h3>
                    
                    <form onSubmit={handleCheckout}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          className="input"
                          placeholder="Enter your full address"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          className="input"
                          placeholder="Your phone number"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Payment Method
                        </label>
                        <div className="border border-surface-200 dark:border-surface-700 rounded-lg divide-y divide-surface-200 dark:divide-surface-700">
                          <label className="flex items-center p-3 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800">
                            <input type="radio" name="payment" value="card" className="mr-3" defaultChecked />
                            <CreditCardIcon className="w-5 h-5 mr-2 text-surface-600 dark:text-surface-400" />
                            <span className="text-surface-800 dark:text-white">Credit/Debit Card</span>
                          </label>
                          
                          <label className="flex items-center p-3 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-800">
                            <input type="radio" name="payment" value="cash" className="mr-3" />
                            <svg className="w-5 h-5 mr-2 text-surface-600 dark:text-surface-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="6" width="20" height="12" rx="2" />
                              <circle cx="12" cy="12" r="2" />
                              <path d="M6 12h.01M18 12h.01" />
                            </svg>
                            <span className="text-surface-800 dark:text-white">Cash on Delivery</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Special Instructions (Optional)
                        </label>
                        <textarea
                          className="input min-h-[80px]"
                          placeholder="Any special requests for your order or delivery"
                        ></textarea>
                      </div>
                      
                      <div className="bg-surface-50 dark:bg-surface-900 p-4 rounded-lg mb-6">
                        <h4 className="font-medium text-surface-800 dark:text-white mb-3">Order Summary</h4>
                        
                        <div className="space-y-2 mb-3">
                          {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-surface-600 dark:text-surface-400">
                                {item.quantity} x {item.name}
                              </span>
                              <span className="text-surface-800 dark:text-white">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-surface-200 dark:border-surface-700 pt-3 mt-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-surface-600 dark:text-surface-400">Subtotal</span>
                            <span className="text-surface-800 dark:text-white">{formatCurrency(cartTotal)}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-surface-600 dark:text-surface-400">Delivery Fee</span>
                            <span className="text-surface-800 dark:text-white">{formatCurrency(2.99)}</span>
                          </div>
                          <div className="flex justify-between font-medium">
                            <span className="text-surface-800 dark:text-white">Total</span>
                            <span className="text-primary">{formatCurrency(cartTotal + 2.99)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn-primary w-full py-3"
                      >
                        Place Order
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MainFeature;