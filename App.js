import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [mealGroceryItems, setMealGroceryItems] = useState([]);
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [catalogPage, setCatalogPage] = useState(1);
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [dealFilter, setDealFilter] = useState('all');
  const [dealSearch, setDealSearch] = useState('');
  const [listSearch, setListSearch] = useState('');
  const [storeFilter, setStoreFilter] = useState('all');
  const [locationSearch, setLocationSearch] = useState('');
  const [trendTime, setTrendTime] = useState('day');
  const [trendSearch, setTrendSearch] = useState('');
  const [selectedDay, setSelectedDay] = useState('mon');
  const [recipeSearch, setRecipeSearch] = useState('');
  const [rewardFilter, setRewardFilter] = useState('all');
  const [rewardSearch, setRewardSearch] = useState('');
  const [userPoints, setUserPoints] = useState(1250);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [newListItemName, setNewListItemName] = useState('');
  const [newListItemPrice, setNewListItemPrice] = useState('');
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 22, seconds: 10 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Product Images array
  const productImages = [
    'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1585478259715-876acad78006?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1576045057999-568f588f82fb?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587241323521-8c723cee5d68?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1606312619071-47c1c16d17fc?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1595981266625-26c69e3934f1?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1584269600513-c194b60a7558?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1586444191166-6c3b3e4bebc1?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587241323521-8c723cee5d68?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1580310614670-9925f499b6c2?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1579583812018-96d7109c3f7a?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1550258987-190a24941a8a?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1584278858535-6da6952cfcff?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1576045057999-568f588f82fb?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587241323521-8c723cee5d68?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1606312619071-47c1c16d17fc?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1595981266625-26c69e3934f1?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=300&h=200&fit=crop',
    'https://images.unsplash.com/photo-1584269600513-c194b60a7558?w=300&h=200&fit=crop'
  ];

  const categories = ['Fruits & Veg', 'Dairy & Eggs', 'Bakery', 'Beverages', 'Snacks'];
  const productNames = [
    'Honeycrisp apples', 'Free range eggs', 'Almond milk', 'Organic strawberries', 'Sourdough loaf',
    'Broccoli crowns', 'Greek yogurt', 'Olive oil', 'Banana bunch', 'Cheddar cheese',
    'Whole chicken', 'Baby spinach', 'Rye bread', 'Orange juice', 'Potato chips',
    'Avocado', 'Butter', 'Croissants', 'Iced tea', 'Granola bars'
  ];

  const deals = [
    {id: 'd1', name: 'Organic strawberry basket', price: 4.19, original: 6.99, discount: '-40%', type: '30', image: productImages[3], left: 12},
    {id: 'd2', name: 'Free-range eggs (dozen)', price: 4.99, original: 4.99, discount: 'BOGO', type: 'bogo', image: productImages[1]},
    {id: 'd3', name: 'Almond milk 64oz', price: 1.99, original: 3.99, discount: '-50%', type: '50', image: productImages[2], sponsored: true},
    {id: 'd4', name: 'Snack variety pack', price: 8.99, original: 14.99, discount: 'clearance', type: 'clearance', image: productImages[14]},
    {id: 'd5', name: 'Fresh salmon fillet', price: 9.09, original: 12.99, discount: '-30%', type: '30', image: productImages[10]},
    {id: 'd6', name: 'Greek yogurt 4-pack', price: 5.49, original: 5.49, discount: 'buy 1, 50% off 2nd', type: 'bogo', image: productImages[6]},
    {id: 'd7', name: 'Artisan sourdough', price: 2.99, original: 4.49, discount: 'member', type: 'clearance', image: productImages[4]},
    {id: 'd8', name: 'Sparkling water 12pk', price: 4.49, original: 6.99, discount: '-35%', type: '50', image: productImages[23]}
  ];

  const stores = [
    {id: 's1', name: 'Downtown Market', address: '123 Main St', distance: 0.8, hours: '7am - 10pm', services: ['pickup', 'delivery'], phone: '(555) 123-4567', open: true, pickup: true, delivery: true},
    {id: 's2', name: 'Westside Grocery', address: '456 Oak Ave', distance: 1.2, hours: '8am - 9pm', services: ['pickup'], phone: '(555) 234-5678', open: true, pickup: true, delivery: false},
    {id: 's3', name: 'Eastside Fresh', address: '789 Pine Rd', distance: 2.1, hours: '6am - 11pm', services: ['delivery', 'pickup'], phone: '(555) 345-6789', open: true, pickup: true, delivery: true},
    {id: 's4', name: 'Northgate Express', address: '321 Cedar Ln', distance: 0.3, hours: '24 hours', services: ['pickup'], phone: '(555) 456-7890', open: true, pickup: true, delivery: false},
    {id: 's5', name: 'Southside Market', address: '555 Elm St', distance: 1.5, hours: '8am - 8pm', services: ['pickup', 'delivery'], phone: '(555) 567-8901', open: false, pickup: true, delivery: true},
    {id: 's6', name: 'Central Grocery', address: '777 Park Ave', distance: 0.6, hours: '7am - 9pm', services: ['pickup', 'delivery'], phone: '(555) 678-9012', open: true, pickup: true, delivery: true}
  ];

  const trendingItems = [
    {id: 't1', name: 'Organic almond milk', price: 3.99, sales: '+245%', rank: 1, bought: 342, image: productImages[2]},
    {id: 't2', name: 'Free-range eggs', price: 4.99, sales: '+189%', rank: 2, bought: 287, image: productImages[1]},
    {id: 't3', name: 'Organic avocado', price: 6.99, sales: '+167%', rank: 3, bought: 412, image: productImages[15]},
    {id: 't4', name: 'Greek yogurt', price: 5.49, sales: '+134%', rank: 4, bought: 178, image: productImages[6]},
    {id: 't5', name: 'Honeycrisp apples', price: 4.99, sales: '+112%', rank: 5, bought: 203, image: productImages[0]},
    {id: 't6', name: 'Organic broccoli', price: 2.49, sales: '+98%', rank: 6, bought: 156, image: productImages[5]},
    {id: 't7', name: 'Artisan sourdough', price: 4.29, sales: '+87%', rank: 7, bought: 98, image: productImages[4]},
    {id: 't8', name: 'Sparkling water', price: 5.99, sales: '+76%', rank: 8, bought: 312, image: productImages[23]},
    {id: 't9', name: 'Kale', price: 2.99, sales: '+156%', rank: 9, bought: 267, image: productImages[25]},
    {id: 't10', name: 'Quinoa', price: 4.99, sales: '+134%', rank: 10, bought: 189, image: productImages[17]},
    {id: 't11', name: 'Chia seeds', price: 3.99, sales: '+112%', rank: 11, bought: 145, image: productImages[19]},
    {id: 't12', name: 'Granola', price: 5.49, sales: '+98%', rank: 12, bought: 234, image: productImages[19]}
  ];

  const mealsByDay = {
    mon: [
      {id: 'm1', name: 'Avocado Toast', calories: 350, protein: '12g', prepTime: '10 min', image: 'brightness-alt-high', ingredients: ['Bread', 'Avocado', 'Eggs']},
      {id: 'm2', name: 'Quinoa Salad', calories: 420, protein: '15g', prepTime: '15 min', image: 'flower1', ingredients: ['Quinoa', 'Cucumber', 'Tomatoes', 'Feta']},
      {id: 'm3', name: 'Grilled Salmon', calories: 580, protein: '35g', prepTime: '25 min', image: 'fish', ingredients: ['Salmon', 'Lemon', 'Asparagus']}
    ],
    tue: [
      {id: 'm4', name: 'Greek Yogurt Bowl', calories: 280, protein: '18g', prepTime: '5 min', image: 'cup', ingredients: ['Greek yogurt', 'Honey', 'Berries', 'Granola']},
      {id: 'm5', name: 'Turkey Wrap', calories: 450, protein: '25g', prepTime: '10 min', image: 'basket', ingredients: ['Turkey', 'Lettuce', 'Tomato', 'Wrap']},
      {id: 'm6', name: 'Veggie Stir-fry', calories: 390, protein: '14g', prepTime: '20 min', image: 'carrot', ingredients: ['Broccoli', 'Carrots', 'Bell peppers', 'Tofu']}
    ],
    wed: [
      {id: 'm7', name: 'Smoothie Bowl', calories: 320, protein: '16g', prepTime: '8 min', image: 'cup-straw', ingredients: ['Banana', 'Berries', 'Spinach', 'Almond milk']},
      {id: 'm8', name: 'Lentil Soup', calories: 310, protein: '18g', prepTime: '15 min', image: 'bowl-hot', ingredients: ['Lentils', 'Carrots', 'Celery', 'Onions']},
      {id: 'm9', name: 'Chicken Breast', calories: 520, protein: '42g', prepTime: '30 min', image: 'egg-fried', ingredients: ['Chicken breast', 'Rice', 'Broccoli']}
    ],
    thu: [
      {id: 'm10', name: 'Oatmeal', calories: 250, protein: '8g', prepTime: '7 min', image: 'cup', ingredients: ['Oats', 'Milk', 'Banana', 'Honey']},
      {id: 'm11', name: 'Caprese Salad', calories: 380, protein: '12g', prepTime: '10 min', image: 'flower1', ingredients: ['Tomatoes', 'Mozzarella', 'Basil', 'Olive oil']},
      {id: 'm12', name: 'Beef Tacos', calories: 610, protein: '28g', prepTime: '20 min', image: 'basket', ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Cheese']}
    ],
    fri: [
      {id: 'm13', name: 'Scrambled Eggs', calories: 300, protein: '20g', prepTime: '8 min', image: 'egg-fried', ingredients: ['Eggs', 'Toast', 'Avocado']},
      {id: 'm14', name: 'Tuna Sandwich', calories: 420, protein: '24g', prepTime: '8 min', image: 'bread-slice', ingredients: ['Tuna', 'Bread', 'Lettuce', 'Mayo']},
      {id: 'm15', name: 'Pizza Night', calories: 720, protein: '26g', prepTime: '35 min', image: 'pie-chart', ingredients: ['Pizza dough', 'Tomato sauce', 'Cheese', 'Pepperoni']}
    ]
  };

  const rewards = [
    {id: 'r1', name: '$5 off', points: 500, type: 'discount', desc: 'on any purchase over $25', icon: 'tag-fill'},
    {id: 'r2', name: 'Free almond milk', points: 800, type: 'product', desc: 'any brand, up to $4.99', icon: 'cup-straw'},
    {id: 'r3', name: 'Free delivery', points: 300, type: 'shipping', desc: 'on next order', icon: 'truck'},
    {id: 'r4', name: '$15 off', points: 1200, type: 'discount', desc: 'on orders $50+', icon: 'percent'},
    {id: 'r5', name: 'Free eggs', points: 600, type: 'product', desc: 'dozen, any brand', icon: 'egg-fried'},
    {id: 'r6', name: 'Free pickup', points: 200, type: 'shipping', desc: 'waived pickup fee', icon: 'box-seam'},
    {id: 'r7', name: '$10 off', points: 1000, type: 'discount', desc: 'any order', icon: 'gem'},
    {id: 'r8', name: 'Free salad', points: 450, type: 'product', desc: 'one free bag', icon: 'flower1'}
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          if (minutes > 0) { minutes--; seconds = 59; }
          else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize data
  useEffect(() => {
    const initialListItems = [
      { id: 'i1', name: 'Organic avocados', price: 2.99, quantity: 2, purchased: false },
      { id: 'i2', name: 'Free-range eggs (dozen)', price: 4.49, quantity: 1, purchased: false },
      { id: 'i3', name: 'Whole milk 1gal', price: 3.29, quantity: 1, purchased: true },
      { id: 'i4', name: 'Baby spinach', price: 2.49, quantity: 1, purchased: false },
      { id: 'i5', name: 'Sourdough loaf', price: 3.79, quantity: 1, purchased: false }
    ];
    setListItems(initialListItems);

    const initialMealGroceryItems = [
      { id: 'mg1', name: 'Avocados', quantity: 3, purchased: false, price: 2.99 },
      { id: 'mg2', name: 'Salmon fillet', quantity: 2, purchased: false, price: 8.99 },
      { id: 'mg3', name: 'Quinoa', quantity: 1, purchased: false, price: 4.99 },
      { id: 'mg4', name: 'Greek yogurt', quantity: 2, purchased: false, price: 5.49 },
      { id: 'mg5', name: 'Chicken breast', quantity: 3, purchased: false, price: 7.99 }
    ];
    setMealGroceryItems(initialMealGroceryItems);

    // Generate catalog products
    const generatedProducts = [];
    for (let i = 0; i < 108; i++) {
      const cat = categories[Math.floor(Math.random() * categories.length)];
      generatedProducts.push({
        id: `cat${i}`,
        name: productNames[i % productNames.length] + (i >= productNames.length ? ' ' + Math.floor(i/productNames.length) : ''),
        category: cat,
        price: parseFloat((2.99 + Math.random() * 8).toFixed(2)),
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        reviews: Math.floor(Math.random() * 200) + 10,
        image: productImages[i % productImages.length]
      });
    }
    setCatalogProducts(generatedProducts);
  }, []);

  // Functions
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
    showToast(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      showToast(`Removed ${product.name} from cart`);
    }
  };

  const updateCartQuantity = (productId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const toggleCart = () => {
    setShowCartModal(!showCartModal);
  };

  const showCheckoutForm = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  const hideCheckoutForm = () => {
    setShowCheckoutModal(false);
  };

  const placeOrder = (event) => {
    event.preventDefault();
    
    const orderData = {
      orderId: 'ORD' + Date.now(),
      date: new Date().toLocaleString(),
      customer: {
        name: document.getElementById('fullName')?.value || 'Anna Kowalski',
        email: document.getElementById('email')?.value || 'anna@example.com',
        phone: document.getElementById('phone')?.value || '+1 (555) 123-4567',
        address: {
          street: document.getElementById('street')?.value || '123 Main Street',
          city: document.getElementById('city')?.value || 'New York',
          zip: document.getElementById('zip')?.value || '10001'
        },
        instructions: document.getElementById('instructions')?.value || ''
      },
      items: [...cart],
      subtotal: getCartTotal(),
      tax: getCartTotal() * 0.08,
      deliveryFee: 5.99,
      total: getCartTotal() * 1.08 + 5.99
    };
    
    setCurrentOrder(orderData);
    setCart([]);
    setShowCheckoutModal(false);
    setShowConfirmationModal(true);
    showToast('Order placed successfully!');
  };

  const hideConfirmation = () => {
    setShowConfirmationModal(false);
  };

  const downloadBill = () => {
    if (!currentOrder) return;
    const billContent = `Order #${currentOrder.orderId}\nDate: ${currentOrder.date}\n\nItems:\n${currentOrder.items.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nSubtotal: $${currentOrder.subtotal.toFixed(2)}\nTax: $${currentOrder.tax.toFixed(2)}\nDelivery: $${currentOrder.deliveryFee.toFixed(2)}\nTotal: $${currentOrder.total.toFixed(2)}`;
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GrocerEase_Order_${currentOrder.orderId}.txt`;
    a.click();
    showToast('Bill downloaded!');
  };

  const printBill = () => {
    window.print();
  };

  // Shopping list functions
  const handleToggleListItem = (id) => {
    setListItems(prev => prev.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleUpdateListItem = (id, change) => {
    setListItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const handleDeleteListItem = (id) => {
    setListItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddListItem = () => {
    if (!newListItemName.trim()) return;
    const price = parseFloat(newListItemPrice) || 2.99;
    setListItems(prev => [
      ...prev,
      { 
        id: `i${Date.now()}`, 
        name: newListItemName, 
        price: price, 
        quantity: 1, 
        purchased: false 
      }
    ]);
    setNewListItemName('');
    setNewListItemPrice('');
    showToast(`Added ${newListItemName} to your list`);
  };

  const handleClearPurchased = () => {
    setListItems(prev => prev.filter(item => !item.purchased));
    showToast('Cleared purchased items');
  };

  const handleShareList = () => {
    const text = listItems.map(i => `${i.name} (x${i.quantity})`).join(', ');
    navigator.clipboard?.writeText('My shopping list: ' + text);
    showToast('List copied to clipboard!');
  };

  // Meal planner functions
  const handleToggleMealGrocery = (id) => {
    setMealGroceryItems(prev => prev.map(item => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleAddAllToCart = () => {
    mealGroceryItems.forEach(item => {
      if (!item.purchased) {
        addToCart({...item, image: productImages[Math.floor(Math.random() * productImages.length)]});
      }
    });
    showToast('Added all unpurchased items to cart!');
  };

  const handleMealClearPurchased = () => {
    setMealGroceryItems(prev => prev.filter(i => !i.purchased));
    showToast('Cleared purchased items');
  };

  // Rewards functions
  const handleRedeemReward = (points, name) => {
    if (userPoints >= points) {
      setUserPoints(prev => prev - points);
      showToast(`Redeemed: ${name} for ${points} points!`);
    } else {
      showToast(`Need ${points - userPoints} more points to redeem ${name}`);
    }
  };

  // Filter functions
  const getFilteredDeals = () => {
    return deals.filter(deal => {
      if (dealFilter !== 'all' && deal.type !== dealFilter) return false;
      if (dealSearch && !deal.name.toLowerCase().includes(dealSearch.toLowerCase())) return false;
      return true;
    });
  };

  const getFilteredStores = () => {
    return stores.filter(store => {
      if (storeFilter !== 'all') {
        if (storeFilter === 'open' && !store.open) return false;
        if (storeFilter === 'pickup' && !store.pickup) return false;
        if (storeFilter === 'delivery' && !store.delivery) return false;
      }
      if (locationSearch && !store.name.toLowerCase().includes(locationSearch.toLowerCase()) && 
          !store.address.toLowerCase().includes(locationSearch.toLowerCase())) return false;
      return true;
    });
  };

  const getFilteredTrending = () => {
    return trendingItems.filter(item => 
      item.name.toLowerCase().includes(trendSearch.toLowerCase())
    );
  };

  const getFilteredRecipes = () => {
    const meals = mealsByDay[selectedDay] || mealsByDay.mon;
    if (!recipeSearch) return meals;
    return meals.filter(meal => 
      meal.name.toLowerCase().includes(recipeSearch.toLowerCase())
    );
  };

  const getFilteredRewards = () => {
    return rewards.filter(reward => {
      if (rewardFilter !== 'all' && reward.type !== rewardFilter) return false;
      if (rewardSearch && !reward.name.toLowerCase().includes(rewardSearch.toLowerCase())) return false;
      return true;
    });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Render functions
  const renderCartModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40" onClick={toggleCart}>
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              <i className="bi bi-cart3 mr-2 text-emerald-600"></i>
              Your Cart (<span>{getCartItemCount()}</span>)
            </h2>
            <button onClick={toggleCart} className="text-gray-400 hover:text-gray-600">
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-96">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <i className="bi bi-cart-x text-5xl"></i>
                <p className="mt-2">Your cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=50&h=50&fit=crop'} 
                      className="w-12 h-12 rounded-lg object-cover" 
                      alt={item.name} 
                    />
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => updateCartQuantity(item.id, -1)} className="text-gray-400 hover:text-rose-600">
                      <i className="bi bi-dash-circle"></i>
                    </button>
                    <button onClick={() => updateCartQuantity(item.id, 1)} className="text-gray-400 hover:text-emerald-600">
                      <i className="bi bi-plus-circle"></i>
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-rose-600">
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold text-emerald-600">${getCartTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={showCheckoutForm} 
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
            >
              <i className="bi bi-check2-circle mr-2"></i>Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCheckoutModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={hideCheckoutForm}>
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              <i className="bi bi-truck mr-2 text-emerald-600"></i>Delivery Address
            </h2>
            <button onClick={hideCheckoutForm} className="text-gray-400 hover:text-gray-600">
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={placeOrder}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName"
                    defaultValue="Anna Kowalski" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    defaultValue="anna@example.com" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    defaultValue="+1 (555) 123-4567" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input 
                    type="text" 
                    id="street"
                    defaultValue="123 Main Street" 
                    required 
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      id="city"
                      defaultValue="New York" 
                      required 
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input 
                      type="text" 
                      id="zip"
                      defaultValue="10001" 
                      required 
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions (Optional)</label>
                  <textarea 
                    id="instructions"
                    rows="2" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    placeholder="e.g., Leave at door, gate code, etc."
                  ></textarea>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-3">Order Summary</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-emerald-600">${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">
                  <i className="bi bi-check2-circle mr-2"></i>Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmationModal = () => {
    if (!currentOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={hideConfirmation}>
        <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-t-2xl">
            <div className="text-center">
              <i className="bi bi-check-circle-fill text-5xl mb-3"></i>
              <h2 className="text-2xl font-bold">Order Confirmed!</h2>
              <p className="text-emerald-50">Thank you for shopping with GrocerEase</p>
            </div>
          </div>
          <div className="p-6">
            <div className="order-bill p-6 rounded-xl bg-gray-50">
              <div className="text-center mb-6">
                <i className="bi bi-shop text-4xl text-emerald-600"></i>
                <h2 className="text-2xl font-bold text-gray-800">GrocerEase</h2>
                <p className="text-sm text-gray-500">Order Confirmation</p>
              </div>
              
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm"><span className="font-semibold">Order #:</span> {currentOrder.orderId}</p>
                <p className="text-sm"><span className="font-semibold">Date:</span> {currentOrder.date}</p>
              </div>
              
              <div className="mb-4 pb-4 border-b">
                <h3 className="font-semibold mb-2">Delivery Address</h3>
                <p className="text-sm">{currentOrder.customer.name}</p>
                <p className="text-sm">{currentOrder.customer.address.street}</p>
                <p className="text-sm">{currentOrder.customer.address.city}, {currentOrder.customer.address.zip}</p>
                <p className="text-sm">{currentOrder.customer.phone}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Order Items</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Item</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.items.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">{item.name} x{item.quantity}</td>
                        <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal:</span>
                  <span>${currentOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tax (8%):</span>
                  <span>${currentOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Delivery Fee:</span>
                  <span>${currentOrder.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-emerald-600">${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={downloadBill} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">
                <i className="bi bi-download mr-2"></i>Download Bill
              </button>
              <button onClick={printBill} className="flex-1 bg-white border border-emerald-600 text-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition">
                <i className="bi bi-printer mr-2"></i>Print Bill
              </button>
            </div>
            <button onClick={hideConfirmation} className="mt-3 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="page active-page">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Dashboard overview</h2>
          <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">7 pages preview</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden md:block">
            <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" 
            />
          </div>
          <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <i className="bi bi-cart3 text-gray-600 text-xl"></i>
            <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {getCartItemCount()}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white">
          <div className="mb-4 md:mb-0">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">📢 weekly spotlight · ad</span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Fresh cuts, big savings</h2>
            <p className="text-emerald-50 max-w-md mt-2 text-lg">Up to 40% off on organic fruits & vegetables. Today only.</p>
            <button 
              className="mt-5 bg-white text-emerald-700 px-6 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-xl transition flex items-center gap-2"
              onClick={() => navigateToPage('catalog')}
            >
              <span>Shop the deal</span> <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="relative">
            <i className="bi bi-bag-heart-fill text-8xl opacity-20 absolute -top-6 -right-6 hidden md:block"></i>
            <img 
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop&auto=format" 
              className="rounded-2xl shadow-2xl w-64 h-40 object-cover border-4 border-white/30" 
              alt="grocery ad" 
            />
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          <i className="bi bi-grid-3x3-gap-fill mr-2 text-emerald-600"></i> quick access to 7 pages (with ads)
        </h3>
        <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">sponsored cards</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Catalog Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer" onClick={() => navigateToPage('catalog')}>
          <div className="flex items-center gap-3 border-b pb-3 mb-3">
            <i className="bi bi-box-seam text-xl text-emerald-600"></i>
            <span className="font-semibold text-gray-700">catalog · ad</span>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <i className="bi bi-cup-straw text-amber-600"></i>
            </div>
            <span className="text-sm">Avocado <span className="float-right font-medium">$2.99</span></span>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 border border-dashed border-purple-200 flex items-center gap-2 mt-2">
            <i className="bi bi-megaphone-fill text-purple-400"></i>
            <span className="text-xs font-medium text-purple-700">ad: new organic milk 20% off</span>
          </div>
        </div>

        {/* Hot Deals Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer" onClick={() => navigateToPage('hotdeals')}>
          <div className="flex items-center gap-2 border-b pb-2 mb-3">
            <i className="bi bi-tag-fill text-rose-500"></i>
            <span className="font-semibold text-gray-700">hot deals · ad</span>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 flex gap-3 items-center">
            <i className="bi bi-brightness-alt-high-fill text-2xl text-amber-400"></i>
            <div>
              <p className="text-sm font-medium">🍉 watermelon friday</p>
              <p className="text-xs text-gray-500">$5.99</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 mt-3 border-l-4 border-blue-400 text-xs">📢 buy 2 get 1 free chips</div>
        </div>

        {/* Shopping List Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer" onClick={() => navigateToPage('shoppinglist')}>
          <div className="flex gap-2 items-center border-b pb-2">
            <i className="bi bi-card-checklist text-emerald-600"></i>
            <span className="font-semibold text-gray-700">my list · ad</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <input type="checkbox" className="accent-emerald-500" disabled /> 
            <span className="text-sm">spinach</span>
          </div>
          <div className="mt-2 bg-lime-50 p-2 rounded-lg flex items-center gap-2">
            <i className="bi bi-receipt-cutoff text-lime-600"></i>
            <span className="text-xs">recipe ad: add basil for pesto</span>
          </div>
        </div>

        {/* Store Locator Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer" onClick={() => navigateToPage('storelocator')}>
          <div className="flex items-center gap-2 border-b pb-2">
            <i className="bi bi-geo-alt-fill text-sky-600"></i>
            <span className="font-semibold text-gray-700">store finder</span>
          </div>
          <div className="flex gap-3 items-center mt-3">
            <i className="bi bi-shop text-2xl text-sky-300"></i>
            <span className="text-sm">downtown · 0.8mi</span>
          </div>
          <div className="bg-indigo-50 p-2 rounded-lg mt-3 flex items-center gap-2 text-xs">
            <i className="bi bi-pin-map-fill text-indigo-400"></i> westside store now open! 10% off
          </div>
        </div>

        {/* Trending Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer" onClick={() => navigateToPage('trending')}>
          <div className="flex items-center gap-2 border-b pb-2">
            <i className="bi bi-fire text-orange-500"></i>
            <span className="font-semibold text-gray-700">trending · ad</span>
          </div>
          <div className="flex items-center text-sm mt-2">
            <i className="bi bi-star-fill text-yellow-400 mr-1"></i>4.8 (1.2k) organic milk
          </div>
          <div className="border rounded-lg p-2 mt-3 flex items-center gap-2 border-gray-200">
            <i className="bi bi-star-fill text-xs text-yellow-400"></i>
            <span className="text-xs font-medium">sponsored: granola bites ★★★★</span>
          </div>
        </div>

        {/* Meal Planner Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer" onClick={() => navigateToPage('mealplanner')}>
          <div className="flex items-center gap-2 border-b pb-2">
            <i className="bi bi-calendar-week text-emerald-600"></i>
            <span className="font-semibold text-gray-700">meal plan · ad</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">mon: stir-fry</span>
          </div>
          <div className="bg-teal-50 p-2 rounded-lg mt-3 flex">
            <i className="bi bi-bell-fill text-teal-500 mr-2"></i>
            <span className="text-xs">ad: free chickpeas w/ hummus</span>
          </div>
        </div>

        {/* Rewards Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer" onClick={() => navigateToPage('rewards')}>
          <div className="flex items-center gap-2 border-b pb-2">
            <i className="bi bi-award-fill text-amber-600"></i>
            <span className="font-semibold text-gray-700">rewards · ad</span>
          </div>
          <p className="text-sm mt-2"><span className="font-bold">{userPoints}</span> points</p>
          <div className="bg-amber-50 p-2 mt-3 rounded-lg flex items-center gap-1">
            <i className="bi bi-gem text-amber-500"></i>
            <span className="text-xs">gold: double points today</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCatalog = () => {
    const itemsPerPage = 12;
    const filtered = catalogProducts.filter(p =>
      (catalogCategory === 'all' || p.category === catalogCategory) &&
      p.name.toLowerCase().includes(catalogSearch.toLowerCase())
    );
    const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const pagedItems = filtered.slice((catalogPage - 1) * itemsPerPage, catalogPage * itemsPerPage);

    return (
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Product catalog</h2>
            <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">{filtered.length} items</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                value={catalogSearch}
                onChange={(e) => { setCatalogSearch(e.target.value); setCatalogPage(1); }}
                placeholder="Search in catalog..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" 
              />
            </div>
            <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <i className="bi bi-cart3 text-gray-600 text-xl"></i>
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-7 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-500 mr-2">Categories:</span>
          <button 
            className={`px-4 py-2 text-sm rounded-full shadow-sm ${catalogCategory === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => { setCatalogCategory('all'); setCatalogPage(1); }}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`px-4 py-2 text-sm rounded-full ${catalogCategory === cat ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => { setCatalogCategory(cat); setCatalogPage(1); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="mb-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl shadow-md p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <i className="bi bi-megaphone-fill text-3xl"></i>
            <div>
              <p className="font-semibold">🍎 fresh harvest · 20% off all organic fruit</p>
              <p className="text-sm text-white/90">Use code FRESH20 · ends saturday</p>
            </div>
          </div>
          <button 
            className="bg-white text-orange-600 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-lg transition"
            onClick={() => { setCatalogCategory('Fruits & Veg'); setCatalogPage(1); }}
          >
            shop now
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {pagedItems.map(product => {
            const stars = Math.floor(parseFloat(product.rating));
            return (
              <div key={product.id} className="product-card bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <img src={product.image} className="product-image w-full h-32 object-cover mb-3 rounded-lg" alt={product.name} />
                <h4 className="font-medium text-gray-800">{product.name}</h4>
                <p className="text-xs text-gray-400">{product.category}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`bi ${i < stars ? 'bi-star-fill' : 'bi-star'} text-xs text-yellow-400`}></i>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm hover:bg-emerald-100"
                  >
                    <i className="bi bi-cart-plus"></i> add
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">
              Showing {(catalogPage - 1) * itemsPerPage + 1}-{Math.min(catalogPage * itemsPerPage, filtered.length)} of {filtered.length}
            </span>
            <button 
              onClick={() => setCatalogPage(prev => Math.max(1, prev - 1))}
              disabled={catalogPage <= 1}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-30"
            >
              ‹
            </button>
            <span className="text-sm font-medium">Page {catalogPage}</span>
            <button 
              onClick={() => setCatalogPage(prev => Math.min(pageCount, prev + 1))}
              disabled={catalogPage >= pageCount}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHotDeals = () => {
    const filteredDeals = getFilteredDeals();

    return (
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">🔥 hot deals & flash sales</h2>
            <span className="bg-rose-100 text-rose-600 text-xs px-3 py-1 rounded-full">{filteredDeals.length} offers</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                value={dealSearch}
                onChange={(e) => setDealSearch(e.target.value)}
                placeholder="Search deals..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200" 
              />
            </div>
            <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <i className="bi bi-cart3 text-gray-600 text-xl"></i>
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Flash Sale Banner */}
        <div className="mb-8 bg-gradient-to-r from-rose-600 to-orange-500 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white">
            <div className="mb-4 md:mb-0">
              <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">⏳ limited time · ad</span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">flash sale: 50% off</h2>
              <p className="text-orange-50 max-w-md mt-2 text-lg">on selected snacks & beverages. Today only.</p>
              <div className="flex items-center gap-3 mt-4">
                <span 
                  className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer hover:bg-orange-50"
                  onClick={() => setDealFilter('50')}
                >
                  shop flash deals
                </span>
                <span className="text-sm font-medium flex items-center gap-1">
                  <i className="bi bi-clock-history"></i> 
                  ends in {countdown.hours}:{countdown.minutes.toString().padStart(2,'0')}:{countdown.seconds.toString().padStart(2,'0')}
                </span>
              </div>
            </div>
            <div className="relative">
              <i className="bi bi-tags-fill text-8xl opacity-20 absolute -top-6 -right-6 hidden md:block"></i>
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop&auto=format" 
                className="rounded-2xl shadow-2xl w-64 h-40 object-cover border-4 border-white/30" 
                alt="sale ad" 
              />
            </div>
          </div>
        </div>

        {/* Deal Filters */}
        <div className="mb-7 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-500 mr-2">deal type:</span>
          {['all', '30', '50', 'bogo', 'clearance'].map(filter => (
            <button 
              key={filter}
              className={`px-4 py-2 text-sm rounded-full ${dealFilter === filter ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setDealFilter(filter)}
            >
              {filter === 'all' ? 'all deals' : 
               filter === '30' ? '10-30% off' :
               filter === '50' ? '50%+ off' :
               filter === 'bogo' ? 'BOGO' : 'clearance'}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDeals.map(deal => (
            <div key={deal.id} className="deal-card bg-white rounded-2xl border border-gray-200 p-4 shadow-sm relative">
              <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">{deal.discount}</div>
              {deal.left && <div className="absolute top-3 right-3 bg-amber-400 text-white text-xs px-2 py-1 rounded-full">🔥 {deal.left} left</div>}
              <img src={deal.image} className="product-image w-full h-32 object-cover mb-3 rounded-lg" alt={deal.name} />
              <h4 className="font-medium text-gray-800">{deal.name}</h4>
              <p className="text-xs text-gray-400">
                {deal.original > deal.price && <span className="line-through">${deal.original.toFixed(2)}</span>}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-rose-600">${deal.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(deal)} 
                  className="bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm hover:bg-rose-100"
                >
                  <i className="bi bi-cart-plus"></i> grab
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderShoppingList = () => {
    const filtered = listItems.filter(item => 
      item.name.toLowerCase().includes(listSearch.toLowerCase())
    );
    const total = filtered.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              <i className="bi bi-card-checklist mr-2 text-emerald-600"></i>my shopping list
            </h2>
            <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">{filtered.length} items</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
                placeholder="Search in list..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" 
              />
            </div>
            <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <i className="bi bi-cart3 text-gray-600 text-xl"></i>
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="mb-7 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl shadow-md p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <i className="bi bi-megaphone-fill text-2xl"></i>
            <div>
              <p className="font-semibold">🍎 complete your list: 10% off fresh produce</p>
              <p className="text-sm text-white/90">use code FRESH10 at checkout</p>
            </div>
          </div>
          <button className="bg-white text-emerald-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow">
            apply code
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newListItemName}
                onChange={(e) => setNewListItemName(e.target.value)}
                placeholder="Item name"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="number"
                value={newListItemPrice}
                onChange={(e) => setNewListItemPrice(e.target.value)}
                placeholder="Price"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-20"
              />
              <button 
                onClick={handleAddListItem}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-emerald-700 transition shadow-sm"
              >
                <i className="bi bi-plus-circle"></i> new item
              </button>
            </div>
            <button 
              onClick={handleClearPurchased}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-gray-50"
            >
              <i className="bi bi-check2-all"></i> clear purchased
            </button>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-gray-500">
              <i className="bi bi-exclamation-circle"></i> <span>${total.toFixed(2)}</span> est.
            </span>
            <button 
              onClick={handleShareList}
              className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 text-xs flex items-center gap-1 hover:bg-amber-100"
            >
              <i className="bi bi-share"></i> share
            </button>
          </div>
        </div>

        {/* List Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <i className="bi bi-bag-x text-5xl"></i>
              <p className="mt-2">your list is empty · add some groceries</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map(item => (
                <div key={item.id} className={`flex items-center justify-between p-4 ${item.purchased ? 'purchased bg-gray-50' : ''}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded text-emerald-600"
                      checked={item.purchased}
                      onChange={() => handleToggleListItem(item.id)}
                    />
                    <div className="flex-1">
                      <span className={`item-text font-medium ${item.purchased ? 'line-through text-gray-400' : ''}`}>
                        {item.name}
                      </span>
                      <div className="text-xs text-gray-400">${item.price.toFixed(2)} × {item.quantity}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleUpdateListItem(item.id, 1)} className="text-gray-500 hover:text-emerald-600 text-xl">
                      <i className="bi bi-plus-circle"></i>
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => handleUpdateListItem(item.id, -1)} className="text-gray-500 hover:text-amber-600 text-xl">
                      <i className="bi bi-dash-circle"></i>
                    </button>
                    <button onClick={() => handleDeleteListItem(item.id)} className="text-gray-400 hover:text-rose-600 text-xl ml-2">
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStoreLocator = () => {
    const filteredStores = getFilteredStores();

    return (
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              <i className="bi bi-geo-alt-fill mr-2 text-sky-600"></i>store locator
            </h2>
            <span className="bg-sky-100 text-sky-600 text-xs px-3 py-1 rounded-full">{filteredStores.length} stores near you</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Search city or zip..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200" 
              />
            </div>
            <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <i className="bi bi-cart3 text-gray-600 text-xl"></i>
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Map and Deal Section */}
        <div className="mb-7 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-1 h-64 relative overflow-hidden map-placeholder">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <i className="bi bi-map text-5xl text-sky-600 opacity-50"></i>
                <p className="text-sm text-gray-600 mt-2">interactive map</p>
                <p className="text-xs text-gray-400">📍 your location · {filteredStores.length} stores nearby</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl shadow-md p-5 text-white flex flex-col justify-between">
            <div>
              <i className="bi bi-tag-fill text-3xl opacity-80"></i>
              <p className="text-xl font-bold mt-2">flash in-store deal</p>
              <p className="text-sm text-white/90">20% off all organic produce when you visit today</p>
            </div>
            <button className="bg-white text-sky-700 px-4 py-2 rounded-full text-sm font-medium self-start mt-4 hover:shadow-lg transition">
              find nearest store
            </button>
          </div>
        </div>

        {/* Store Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex gap-2 flex-wrap">
            {['all', 'open', 'pickup', 'delivery'].map(filter => (
              <button 
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 ${storeFilter === filter ? 'bg-sky-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setStoreFilter(filter)}
              >
                <i className={`bi bi-${filter === 'all' ? 'shop' : filter === 'open' ? 'door-open' : filter === 'pickup' ? 'bag-check' : 'truck'}`}></i>
                {filter === 'all' ? 'all stores' : filter}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="bg-amber-50 text-amber-700 px-3 py-2 rounded-full text-sm border border-amber-200 flex items-center gap-1 hover:bg-amber-100">
              <i className="bi bi-crosshair"></i> use my location
            </button>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map(store => (
            <div key={store.id} className="store-card bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    <i className="bi bi-shop text-sky-600 mr-1"></i>{store.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1"><i className="bi bi-geo-alt"></i> {store.address}</p>
                </div>
                <span className="bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded-full">{store.distance} mi</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <i className="bi bi-clock text-gray-400"></i>
                <span className="text-xs text-gray-600">{store.hours}</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="bg-sky-600 text-white px-4 py-2 rounded-full text-xs flex-1 hover:bg-sky-700">
                  <i className="bi bi-signpost-split mr-1"></i>directions
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-xs flex-1 hover:bg-gray-50">
                  <i className="bi bi-telephone mr-1"></i>call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrending = () => {
    const filteredTrending = getFilteredTrending();

    return (
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              <i className="bi bi-fire mr-2 text-orange-500"></i>trending now
            </h2>
            <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">{filteredTrending.length} trending items</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                value={trendSearch}
                onChange={(e) => setTrendSearch(e.target.value)}
                placeholder="Search trending..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200" 
              />
            </div>
            <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <i className="bi bi-cart3 text-gray-600 text-xl"></i>
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Trending Banner */}
        <div className="mb-8 bg-gradient-to-r from-orange-500 to-rose-500 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white">
            <div className="mb-4 md:mb-0">
              <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3 trending-badge">
                <i className="bi bi-graph-up-arrow"></i> #1 trending category
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">superfoods week</h2>
              <p className="text-orange-50 max-w-md mt-2 text-lg">kale, quinoa, chia seeds · up to 25% off</p>
              <div className="flex items-center gap-3 mt-4">
                <button className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition">
                  explore superfoods
                </button>
                <span className="text-sm font-medium flex items-center gap-1">
                  <i className="bi bi-clock-history"></i> limited time
                </span>
              </div>
            </div>
            <div className="relative">
              <i className="bi bi-flower1 text-8xl opacity-20 absolute -top-6 -right-6 hidden md:block"></i>
              <img 
                src="https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=300&h=200&fit=crop&auto=format" 
                className="rounded-2xl shadow-2xl w-64 h-40 object-cover border-4 border-white/30" 
                alt="trending superfoods" 
              />
            </div>
          </div>
        </div>

        {/* Time Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-sm font-medium text-gray-500 mr-2">trending for:</span>
          {['day', 'week', 'month'].map(time => (
            <button 
              key={time}
              className={`px-4 py-2 rounded-full text-sm font-medium ${trendTime === time ? 'bg-orange-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTrendTime(time)}
            >
              {time === 'day' ? 'today' : time === 'week' ? 'this week' : 'this month'}
            </button>
          ))}
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTrending.map(item => {
            const boughtText = trendTime === 'day' ? `${item.bought} bought today` :
                              trendTime === 'week' ? `${item.bought * 3} bought this week` :
                              `${item.bought * 10} bought this month`;
            
            return (
              <div key={item.id} className="trend-card bg-white rounded-2xl border border-gray-200 p-4 shadow-sm relative">
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <i className="bi bi-fire"></i> #{item.rank}
                </div>
                <img src={item.image} className="product-image w-full h-32 object-cover mb-3 rounded-lg" alt={item.name} />
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart(item)} 
                    className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm hover:bg-orange-100"
                  >
                    <i className="bi bi-cart-plus"></i> add
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  <i className="bi bi-people-fill text-orange-300"></i> {boughtText}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMealPlanner = () => {
    const filteredMeals = getFilteredRecipes();

    return (
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              <i className="bi bi-calendar-week mr-2 text-emerald-600"></i>meal planner
            </h2>
            <span className="bg-emerald-100 text-emerald-600 text-xs px-3 py-1 rounded-full">5 meals planned</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                value={recipeSearch}
                onChange={(e) => setRecipeSearch(e.target.value)}
                placeholder="Search recipes..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" 
              />
            </div>
            <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <i className="bi bi-cart3 text-gray-600 text-xl"></i>
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Meal Kit Banner */}
        <div className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white">
            <div className="mb-4 md:mb-0">
              <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">
                <i className="bi bi-stars"></i> sponsored recipe kit
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">5-day healthy meal prep</h2>
              <p className="text-emerald-50 max-w-md mt-2 text-lg">includes recipes + shopping list · $49.99</p>
              <div className="flex items-center gap-3 mt-4">
                <button 
                  className="bg-white text-emerald-700 px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition"
                  onClick={() => addToCart({
                    id: 'mealKit', 
                    name: '5-day healthy meal prep kit', 
                    price: 49.99, 
                    quantity: 1, 
                    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop'
                  })}
                >
                  get the kit
                </button>
                <span className="text-sm font-medium flex items-center gap-1">
                  <i className="bi bi-clock-history"></i> limited spots
                </span>
              </div>
            </div>
            <div className="relative">
              <i className="bi bi-basket text-8xl opacity-20 absolute -top-6 -right-6 hidden md:block"></i>
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop&auto=format" 
                className="rounded-2xl shadow-2xl w-64 h-40 object-cover border-4 border-white/30" 
                alt="meal prep" 
              />
            </div>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200 pb-2">
          <span className="text-sm font-medium text-gray-500 mr-2">plan for:</span>
          {Object.keys(mealsByDay).map(day => (
            <button 
              key={day}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedDay === day ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setSelectedDay(day)}
            >
              {day === 'mon' ? 'monday' :
               day === 'tue' ? 'tuesday' :
               day === 'wed' ? 'wednesday' :
               day === 'thu' ? 'thursday' : 'friday'}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {filteredMeals.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-400">no matching recipes</div>
          ) : (
            filteredMeals.map(meal => (
              <div key={meal.id} className="meal-card bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i className={`bi bi-${meal.image} text-emerald-600 text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-medium">{meal.name}</h4>
                    <p className="text-xs text-gray-400">{meal.calories} cal · {meal.protein}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span><i className="bi bi-clock"></i> {meal.prepTime}</span>
                  <button 
                    onClick={() => addToCart({
                      id: `meal-${meal.id}`,
                      name: `${meal.name} Meal Kit`,
                      price: 12.99,
                      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop'
                    })}
                    className="text-emerald-600 hover:text-emerald-800"
                  >
                    <i className="bi bi-plus-circle"></i> add to cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Weekly Grocery List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <i className="bi bi-bag-check text-emerald-600"></i> weekly grocery list
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={handleAddAllToCart}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-emerald-700 transition"
              >
                <i className="bi bi-cart-plus"></i> add all to cart
              </button>
              <button 
                onClick={handleMealClearPurchased}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-50"
              >
                <i className="bi bi-check2-all"></i> clear checked
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {mealGroceryItems.map(item => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded text-emerald-600"
                    checked={item.purchased}
                    onChange={() => handleToggleMealGrocery(item.id)}
                  />
                  <span className={`text-sm ${item.purchased ? 'line-through text-gray-400' : ''}`}>
                    {item.name} x{item.quantity}
                  </span>
                </div>
                <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => addToCart({
                    ...item,
                    id: `grocery-${item.id}`,
                    image: productImages[Math.floor(Math.random() * productImages.length)]
                  })}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  <i className="bi bi-cart-plus"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRewards = () => {
    const filteredRewards = getFilteredRewards();

    return (
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <i className="bi bi-list text-2xl text-gray-500 md:hidden" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}></i>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              <i className="bi bi-award-fill mr-2 text-amber-500"></i>rewards & loyalty
            </h2>
            <span className="bg-amber-100 text-amber-600 text-xs px-3 py-1 rounded-full">⭐ {userPoints} points</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input 
                type="text" 
                value={rewardSearch}
                onChange={(e) => setRewardSearch(e.target.value)}
                placeholder="Search rewards..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-200" 
              />
            </div>
            <i className="bi bi-bell-fill text-gray-400 text-xl"></i>
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <i className="bi bi-cart3 text-gray-600 text-xl"></i>
              <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {getCartItemCount()}
              </span>
            </div>
          </div>
        </div>

        {/* Points Banner */}
        <div className="mb-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white">
            <div className="mb-4 md:mb-0">
              <span className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">
                <i className="bi bi-gem"></i> gold tier · <span>{userPoints}</span> pts
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                you're <span>{1500 - userPoints}</span> points away
              </h2>
              <p className="text-amber-50 max-w-md mt-2 text-lg">from platinum tier · free shipping & 5% cashback</p>
              <div className="flex items-center gap-3 mt-4">
                <button className="bg-white text-amber-700 px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition">
                  view benefits
                </button>
                <span className="text-sm font-medium flex items-center gap-1">
                  <i className="bi bi-clock-history"></i> reset in 45 days
                </span>
              </div>
            </div>
            <div className="relative">
              <i className="bi bi-trophy-fill text-8xl opacity-20 absolute -top-6 -right-6 hidden md:block"></i>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl text-center">
                <span className="text-3xl font-bold">{userPoints}</span>
                <span className="text-sm">/ 1,500 pts</span>
                <div className="w-32 h-2 bg-white/30 rounded-full mt-2">
                  <div className="h-2 bg-white rounded-full" style={{ width: `${Math.min(100, (userPoints / 1500) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6 border-b border-gray-200 pb-2">
          <span className="text-sm font-medium text-gray-500 mr-2">redeem:</span>
          {['all', 'discount', 'product', 'shipping'].map(filter => (
            <button 
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium ${rewardFilter === filter ? 'bg-amber-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setRewardFilter(filter)}
            >
              {filter === 'all' ? 'all rewards' : filter}
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredRewards.map(reward => (
            <div key={reward.id} className="reward-card bg-white rounded-2xl border border-gray-200 p-5 shadow-sm relative">
              <div className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">{reward.points} pts</div>
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <i className={`bi bi-${reward.icon} text-2xl text-amber-500`}></i>
              </div>
              <h4 className="font-semibold">{reward.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{reward.desc}</p>
              <button 
                onClick={() => handleRedeemReward(reward.points, reward.name)}
                className="mt-4 w-full bg-amber-600 text-white px-4 py-2 rounded-full text-xs hover:bg-amber-700 transition"
              >
                redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 mx-4">
          <div className="text-center mb-8">
            <i className="bi bi-shop text-5xl text-emerald-600"></i>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">GrocerEase</h1>
            <p className="text-gray-500">Your Smart Grocery Assistant</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                defaultValue="anna@example.com" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                defaultValue="password123" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            <button 
              onClick={handleLogin} 
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg"
            >
              <i className="bi bi-box-arrow-in-right mr-2"></i>Sign In
            </button>
            <p className="text-center text-sm text-gray-500">Demo credentials pre-filled · click Sign In</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col md:flex-row min-h-screen ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Toast Notification */}
      <div className="fixed bottom-4 right-4 z-50">
        {toastMessage && (
          <div className="toast-notification bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg mb-2">
            {toastMessage}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCartModal && renderCartModal()}
      {showCheckoutModal && renderCheckoutModal()}
      {showConfirmationModal && renderConfirmationModal()}

      {/* Sidebar */}
      <aside className="md:w-72 bg-white border-r border-gray-100 shadow-sm p-5 flex flex-col gap-6 transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-2 py-3 sidebar-brand">
            <i className="bi bi-shop text-3xl text-emerald-700"></i>
            <span className="text-xl font-semibold text-gray-800 tracking-tight">GrocerEase</span>
          </div>
          <div className="sidebar-toggle md:flex" onClick={toggleSidebar} title="Toggle sidebar">
            <i className="bi bi-layout-sidebar-inset text-emerald-700 text-xl"></i>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 bg-emerald-50 p-3 rounded-2xl user-info">
          <i className="bi bi-person-circle text-3xl text-emerald-600 user-avatar"></i>
          <div className="user-info-text">
            <p className="text-sm font-semibold text-gray-700">Anna Kowalski</p>
            <p className="text-xs text-gray-500">gold member ⭐</p>
          </div>
          <button onClick={handleLogout} className="ml-auto text-gray-400 hover:text-rose-600" title="Logout">
            <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {[
            { page: 'dashboard', icon: 'speedometer2', label: 'Dashboard' },
            { page: 'catalog', icon: 'box-seam', label: 'Catalog' },
            { page: 'hotdeals', icon: 'tag-fill', label: 'Hot Deals' },
            { page: 'shoppinglist', icon: 'card-checklist', label: 'Shopping List' },
            { page: 'storelocator', icon: 'geo-alt-fill', label: 'Store Locator' },
            { page: 'trending', icon: 'fire', label: 'Trending' },
            { page: 'mealplanner', icon: 'calendar-week', label: 'Meal Planner' },
            { page: 'rewards', icon: 'award-fill', label: 'Rewards' }
          ].map(item => (
            <div 
              key={item.page}
              className={`nav-item flex items-center gap-3 px-4 py-3 ${currentPage === item.page ? 'active text-gray-700' : 'text-gray-600'}`}
              onClick={() => navigateToPage(item.page)}
            >
              <i className={`bi bi-${item.icon} text-lg ${currentPage === item.page ? 'text-emerald-600' : ''}`}></i>
              <span className="text-sm nav-link-text">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Sidebar Ad */}
        <div className="mt-auto pt-6">
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-4 rounded-2xl border border-emerald-200 shadow-inner">
            <i className="bi bi-megaphone-fill text-emerald-700 block mb-2 text-xl"></i>
            <p className="text-xs font-semibold text-emerald-800 sidebar-ad-text">app exclusive</p>
            <p className="text-sm font-medium text-emerald-900 sidebar-ad-text">20% off your first pickup order</p>
            <button className="mt-3 bg-white text-emerald-700 text-xs px-3 py-1.5 rounded-full w-full shadow-sm hover:bg-emerald-50 sidebar-ad-btn">
              grab deal
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3 sidebar-footer-text">© GrocerEase · 8 pages</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-6 lg:p-8 overflow-y-auto">
        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'catalog' && renderCatalog()}
        {currentPage === 'hotdeals' && renderHotDeals()}
        {currentPage === 'shoppinglist' && renderShoppingList()}
        {currentPage === 'storelocator' && renderStoreLocator()}
        {currentPage === 'trending' && renderTrending()}
        {currentPage === 'mealplanner' && renderMealPlanner()}
        {currentPage === 'rewards' && renderRewards()}
      </main>
    </div>
  );
}

export default App;