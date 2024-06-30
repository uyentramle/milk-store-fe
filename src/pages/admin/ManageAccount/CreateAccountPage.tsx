import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Account {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
    avatar: File | null;
    role: 'User' | 'Manager' | 'Staff';
}

const CreateAccountPage: React.FC = () => {
    const [formData, setFormData] = useState<Account>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: 'Male',
        avatar: null,
        role: 'User',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (name === 'avatar') {
            setFormData({ ...formData, [name]: files ? files[0] : null });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here, you can send the form data to an API or perform any necessary operations
        console.log('Form Data:', formData);
        // Reset the form after submission
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: 'Male',
            avatar: null,
            role: 'User',
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Create New Account</h1>
            <div className="flex">
                <div className="w-1/2 pr-4">
                    <div className="mb-4">
                        <label htmlFor="avatar" className="mb-1 block font-semibold">
                            Avatar:
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {formData.avatar && (
                        <img
                            src={URL.createObjectURL(formData.avatar)}
                            alt="Avatar Preview"
                            className="h-32 w-32 rounded-full object-cover"
                        />
                    )}
                </div>
                <div className="w-1/2 pl-4">
                    <form onSubmit={handleSubmit} className="max-w-md">
                        <div className="mb-4">
                            <label htmlFor="firstName" className="mb-1 block font-semibold">
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="mb-1 block font-semibold">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="mb-1 block font-semibold">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="mb-1 block font-semibold">
                                Phone:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="gender" className="mb-1 block font-semibold">
                                Gender:
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="role" className="mb-1 block font-semibold">
                                Role:
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="User">User</option>
                                <option value="Staff">Staff</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    type="submit"
                    className="rounded-md bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    onSubmit={handleSubmit}
                >
                    Create Account
                </button>
                <Link
                    to="/admin/accounts"
                    className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Back
                </Link>
            </div>
        </div>
    );
};

export default CreateAccountPage;
