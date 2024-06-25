import React, { useState } from 'react';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    imageUrl: "https://via.placeholder.com/150",
    name: "Dark Denim Shirt",
    color: "Dark Blue",
    price: 120.00,
    quantity: 1,
  },
  {
    id: 2,
    imageUrl: "https://via.placeholder.com/150",
    name: "Denim Trendy Jacket",
    color: "Sky Blue",
    price: 120.00,
    quantity: 1,
  },
  {
    id: 3,
    imageUrl: "https://via.placeholder.com/150",
    name: "Retro Shirt For Women",
    color: "Magenta",
    price: 220.00,
    quantity: 2,
  }
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState(sampleProducts);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    console.log("Proceed to checkout");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      </div>
      <div className="container mx-auto p-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md">
            <img className="w-24 h-24 rounded-lg" src={item.imageUrl} alt={item.name} />
            <div className="flex flex-col ml-4">
              <span className="font-semibold">{item.name}</span>
              <span className="text-gray-500">#{item.id}</span>
              <span className="text-gray-500">{item.color}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-lg font-bold" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <input 
                type="number" 
                value={item.quantity} 
                min={1} 
                className="w-12 text-center border rounded"
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
              />
              <button className="text-lg font-bold" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
            </div>
            <div className="flex items-center justify-end w-20">
              <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
            </div>
            <button className="text-red-500" onClick={() => handleRemove(item.id)}>×</button>
          </div>
        ))}
        <div className="p-4 mt-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-semibold">Subtotal</span>
            <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Promo Code?"
              className="w-full p-2 mr-2 border rounded"
            />
            <button className="px-4 py-2 text-white bg-purple-500 rounded">
              Apply
            </button>
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-purple-500 rounded"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 text-white bg-gray-800 rounded">
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
