import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';

interface Brand {
    id: number;
    name: string;
    brandOrigin: string;
    description: string;
    active: boolean;
    imageUrl: string | null;
    totalFollow: number;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    updatedBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
}

interface Type {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

interface AgeRange {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

const CreateProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        thumbnail: null,
        images: [],
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

    const [productTypes, setProductTypes] = useState<Type[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://localhost:44329/api/ProductType/GetAllProductType')
            .then((response) => response.json())
            .then((data) => setProductTypes(data.data))
            .catch((error) => console.error('Error fetching product types:', error));

        fetch('https://localhost:44329/api/AgeRange/GetAllAgeRange')
            .then((response) => response.json())
            .then((data) => setAgeRanges(data.data))
            .catch((error) => console.error('Error fetching age ranges:', error));

        fetch('https://localhost:44329/api/Brand/GetBrands?pageIndex=0&pageSize=1000')
            .then((response) => response.json())
            .then((data) => setBrands(data.data.items))
            .catch((error) => console.error('Error fetching brands:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            if (name === 'thumbnail') {
                setFormData((prevState) => ({
                    ...prevState,
                    thumbnail: files[0],
                }));
            } else if (name === 'images') {
                setFormData((prevState) => ({
                    ...prevState,
                    images: [...prevState.images, ...Array.from(files)],
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            thumbnail: null,
            images: [],
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation logic
        if (!formData.thumbnail) {
            message.error("Ảnh bìa không được bỏ trống");
            return;
        }

        if (formData.images.length === 0) {
            message.error("Ảnh sản phẩm không được bỏ trống");
            return;
        }

        if (formData.price < 0) {
            message.error("Giá gốc không được là số âm");
            return;
        }

        if (formData.discount < 0 || formData.discount > 100) {
            message.error("Giảm giá phải từ 0 đến 100%");
            return;
        }

        if (formData.weight < 0 || formData.weight > 10) {
            message.error("Cân nặng không hợp lệ (phải từ 0 đến 10Kg)");
            return;
        }

        if (formData.quantity < 0 || formData.quantity > 100000) {
            message.error("Số lượng không hợp lệ (phải từ 0 đến 100000)");
            return;
        }

        if (!formData.type) {
            message.error("Vui lòng chọn loại sản phẩm");
            return;
        }

        if (!formData.brand) {
            message.error("Vui lòng chọn thương hiệu");
            return;
        }

        if (!formData.age) {
            message.error("Vui lòng chọn độ tuổi");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found.');
        }

        const decodedToken: any = jwtDecode(accessToken);
        const createdBy = decodedToken.id;
        const createData = new FormData();
        createData.append('Name', formData.name);
        createData.append('Sku', formData.sku);
        createData.append('Description', formData.description || '');
        createData.append('Price', formData.price.toString());
        createData.append('Weight', formData.weight.toString());
        createData.append('Discount', formData.discount.toString());
        createData.append('Quantity', formData.quantity.toString());
        createData.append('TypeId', formData.type.toString());
        createData.append('BrandId', formData.brand.toString());
        createData.append('AgeId', formData.age.toString());
        createData.append('CreatedBy', createdBy);
        try {
            const response = await axios.post('https://localhost:44329/api/Product/CreateProduct', createData, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.data.success) {
                message.success('Tạo sản phẩm thành công');
                console.log("Created product successfully");
                const responeData = await axios.get(`https://localhost:44329/api/Product/GetProductBySku?sku=${formData.sku}`);
                const productId = responeData.data.data.id;
                if (responeData.data.success && productId != null) {
                    console.log("Get Product by sku successfully");
                    if (formData.images.length > 0 && formData.thumbnail !== null) {
                        const formData1 = new FormData();
                        formData1.append('ProductId', productId.toString());
                        formData1.append('CreatedBy', createdBy);
                        formData1.append('thumbnailFile', formData.thumbnail);
                        formData.images.forEach((image) => {
                            formData1.append('imageFiles', image);
                        });
                        const response1 = await axios.post('https://localhost:44329/api/ProductImage/CreateProductImage', formData1, {
                            headers: {
                                'accept': '*/*',
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });

                        if (response1.data.success) {
                            console.log("Created product image successfully");
                            message.success('Thêm hình ảnh sản phẩm thành công');
                            handleReset();
                        }
                    }
                }
            } else {
                message.error('Không thể tạo sản phẩm');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            message.error('Tạo sản phẩm thất bại');
        }
    };

    const handleConfirmDelete = () => {
        if (itemToDelete === 'thumbnail') {
            setFormData((prevState) => ({
                ...prevState,
                thumbnail: null,
            }));
        } else if (itemToDelete && itemToDelete.startsWith('image-')) {
            const imageIndex = parseInt(itemToDelete.split('-')[1], 10);
            setFormData((prevState) => ({
                ...prevState,
                images: prevState.images.filter((_, index) => index !== imageIndex),
            }));
        }
        setShowDeletePopup(false);
        setItemToDelete(null);
    };    

    const DeletePopup = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className="mb-4">Bạn có chắc chắn muốn xóa ảnh này?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                        onClick={() => setShowDeletePopup(false)}
                    >
                        Hủy
                    </button>
                    <button
                        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                        onClick={handleConfirmDelete}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Tạo sản phẩm</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="flex space-x-6">
                    <div className="flex-1 flex flex-col space-y-4">
                        <label className="font-bold">Ảnh bìa <span className="text-red-500">*</span></label>
                        <div className="flex justify-center items-center border border-gray-300 rounded-md h-64 min-w-64 w-auto mx-auto">
                        {formData.thumbnail ? (
                            <img
                                src={URL.createObjectURL(formData.thumbnail)}
                                alt="Thumbnail"
                                className="object-cover h-full w-full"
                                onClick={() => {
                                    setItemToDelete('thumbnail');
                                    setShowDeletePopup(true);
                                }}
                            />
                        ) : (
                            <label className="w-full h-full flex justify-center items-center cursor-pointer">
                                <input
                                    type="file"
                                    name="thumbnail"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/PlusCM128.svg/1200px-PlusCM128.svg.png" alt="Add Thumbnail" className="h-28 opacity-50" />
                            </label>
                        )}
                        </div>
                        <label className="font-bold">Ảnh sản phẩm <span className="text-red-500">*</span></label>
                        <div className="relative w-full h-12">
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="absolute inset-0 w-full h-full bg-pink-500 text-white rounded-md flex justify-center items-center z-0 ">
                                Thêm ảnh sản phẩm
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4 justify-center">
                            {formData.images.length > 0 && formData.images.length <= 6 &&
                                formData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Product ${index}`}
                                        className="w-40 h-40 object-cover"
                                        onClick={() => {
                                            setItemToDelete(`image-${index}`);
                                            setShowDeletePopup(true);
                                        }}
                                    />
                                ))}
                            {formData.images.length > 6 &&
                                formData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Product ${index}`}
                                        className="w-20 h-20 object-cover"
                                        onClick={() => {
                                            setItemToDelete(`image-${index}`);
                                            setShowDeletePopup(true);
                                        }}
                                    />
                                ))}
                            {formData.images.length === 0 &&
                                <label className="w-full h-full flex justify-center items-center cursor-pointer">
                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <img src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png" alt="Add Thumbnail" className="h-40 opacity-50" />
                                </label>
                            }
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-bold">
                                Tên sản phẩm <span className="text-red-500">*</span>
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
                            <label htmlFor="sku" className="block font-bold">
                                Mã sản phẩm <span className="text-red-500">*</span>
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
                            <label htmlFor="description" className="block font-bold">
                                Mô tả
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
                        <div className="mb-4">
                            <label htmlFor="price" className="block font-bold">
                                Giá gốc <span className="text-red-500">*</span>
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
                            <label htmlFor="discount" className="block font-bold">
                                Giảm giá
                            </label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="weight" className="block font-bold">
                                Cân nặng (kg) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block font-bold">
                                Số lượng <span className="text-red-500">*</span>
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
                            <label htmlFor="type" className="block font-bold">
                                Phân loại <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Chọn phân loại</option>
                                {productTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="brand" className="block font-bold">
                                Thương hiệu <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Chọn thương hiệu</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="age" className="block font-bold">
                                Độ tuổi <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Chọn độ tuổi</option>
                                {ageRanges.map((ageRange) => (
                                    <option key={ageRange.id} value={ageRange.id}>{ageRange.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <Link to="/admin/products">
                        <button
                            type="button"
                            className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                        >
                            Trở về
                        </button>
                    </Link>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
                    >
                        Làm mới
                    </button>
                    <button
                        type="submit"
                        className="rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700"
                    >
                        Thêm mới
                    </button>
                </div>
            </form>
            {showDeletePopup && <DeletePopup />}
        </div>
    );
};

export default CreateProductPage;
