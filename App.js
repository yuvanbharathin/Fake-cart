import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { ShoppingCart } from "lucide-react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      alert("Item already added to the cart");
      return;
    }
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 min-h-screen text-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-[#bb8fce] p-4 text-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold">Minimal Store</h1>
        <button onClick={() => setIsModalOpen(true)} className="relative flex items-center">
          <ShoppingCart size={28} />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-400 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </nav>
      
      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg shadow-md p-4 transition-transform hover:scale-105 hover:shadow-lg">
            <img src={product.image} alt={product.title} className="h-40 mx-auto" />
            <h2 className="text-lg font-semibold mt-3 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 text-xl font-bold">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-[#bb8fce] text-white px-4 py-2 mt-3 rounded-lg w-full hover:bg-purple-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      {/* Cart Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2 mb-2">
                  <p className="text-lg text-gray-800">{item.title}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500 transition"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-600 text-white px-4 py-2 mt-4 w-full rounded-lg hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default App;
