import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CreateProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        sku: '',
        description: '',
        price: 0,
        weight: 0,
        discount: 0,
        quantity: 0,
        type: '',
        brand: '',
        age: '',
    });

    useEffect(() => {
        // Fetch product data from the API
        fetch('/api/products/123') 
          .then(response => response.json())
          .then(data => {
            setFormData(data);
          })
          .catch(error => {
            console.error('Error fetching product data:', error);
          });
      }, []);
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: type === 'file' ? files[0] : value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to server
        console.log(formData);
      };
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Update Milk Product</h1>
            <form onSubmit={handleSubmit} className="-mx-4 flex flex-wrap">
                <div className="w-1/2 px-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 block font-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="mb-2 block font-bold">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sku" className="mb-2 block font-bold">
                            Sku
                        </label>
                        <input
                            type="text"
                            id="sku"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="mb-2 block font-bold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="w-1/2 px-4">
                    <div className="mb-4">
                        <label htmlFor="weght" className="mb-2 block font-bold">
                            Weight
                        </label>
                        <input
                            type="number"
                            id="weght"
                            name="weght"
                            value={formData.weight}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="mb-2 block font-bold">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="discount" className="mb-2 block font-bold">
                            Discount
                        </label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="mb-2 block font-bold">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="age" className="mb-2 block font-bold">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="brand" className="mb-2 block font-bold">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="price"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="type" className="mb-2 block font-bold">
                            Type
                        </label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
            </form>
            <div className="mt-6 flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="mr-2 rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700"
                    >
                        Create Product
                    </button>
                    <Link to="/admin/products">
                        <button
                            type="button"
                            className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                        >
                            Back
                        </button>
                    </Link>
                </div>
        </div>
    );
};

export default CreateProductPage;
