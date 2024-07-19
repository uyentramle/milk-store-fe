import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { message, Checkbox } from 'antd';

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

interface Image {
    id: number;
    imageUrl: string;
    thumbnailUrl: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    deletedAt: string;
    deletedBy: string;
    isDeleted: boolean;
    type: string;
}

const UpdateProductPage = () => {
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
        typeId: 0,
        brandId: 0,
        ageId: 0,
    });

    const { productId } = useParams<{ productId: string }>();
    const [productTypes, setProductTypes] = useState<Type[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [checkThumbnailChanged, setThumbnailChanged] = useState(false);
    const [checkImagesChanged, setImagesChanged] = useState(false);



    useEffect(() => {
        fetch(`https://localhost:7251/api/Product/GetProductById?id=${productId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    fetch(`https://localhost:7251/api/ProductImage/GetProductImagesById?productImageId=${productId}`)
                    .then((response) => response.json())
                    .then((productImageData) => {
                        setFormData({
                            name: data.data.name,
                            thumbnail: productImageData.data[0].image.thumbnailUrl,
                            images: productImageData.data.map((item: any) => item.image),
                            sku: data.data.sku,
                            description: data.data.description,
                            price: data.data.price,
                            weight: data.data.weight,
                            discount: data.data.discount,
                            quantity: data.data.quantity,
                            typeId: data.data.typeId,
                            brandId: data.data.brandId,
                            ageId: data.data.ageId,
                        });
                    });
                }
            })
            .catch((error) => console.error('Error fetching product:', error));

        fetch('https://localhost:7251/api/ProductType/GetAllProductType')
            .then((response) => response.json())
            .then((data) => setProductTypes(data.data))
            .catch((error) => console.error('Error fetching product types:', error));

        fetch('https://localhost:7251/api/AgeRange/GetAllAgeRange')
            .then((response) => response.json())
            .then((data) => setAgeRanges(data.data))
            .catch((error) => console.error('Error fetching age ranges:', error));

        fetch('https://localhost:7251/api/Brand/GetBrands?pageIndex=0&pageSize=1000')
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
                setImages((prevState) => [...prevState, ...Array.from(files)]);
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
            typeId: '',
            brandId: '',
            ageId: '',
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

        if (formData.discount < 0) {
            message.error("Giá giảm không được là số âm");
            return;
        }

        if (formData.discount > formData.price) {
            message.error("Giá giảm không được lớn hơn giá gốc");
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

        if (!formData.typeId) {
            message.error("Vui lòng chọn loại sản phẩm");
            return;
        }

        if (!formData.brandId) {
            message.error("Vui lòng chọn thương hiệu");
            return;
        }

        if (!formData.ageId) {
            message.error("Vui lòng chọn độ tuổi");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found.');
        }

        const decodedToken: any = jwtDecode(accessToken);
        const UpdatedBy = decodedToken.id;

        const updateProductData = new FormData();
        updateProductData.append('Id', productId);
        updateProductData.append('Name', formData.name);
        updateProductData.append('Sku', formData.sku);
        updateProductData.append('Description', formData.description);
        updateProductData.append('Price', formData.price.toString());
        updateProductData.append('Weight', formData.weight.toString());
        updateProductData.append('Discount', formData.discount.toString());
        updateProductData.append('Quantity', formData.quantity.toString());
        updateProductData.append('TypeId', formData.typeId.toString());
        updateProductData.append('BrandId', formData.brandId.toString());
        updateProductData.append('AgeId', formData.ageId.toString());
        updateProductData.append('UpdatedBy', UpdatedBy);

        try
        {
            const updateProduct = await axios.post(`https://localhost:7251/api/Product/UpdateProduct`, updateProductData,{
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            if (updateProduct.data.success) {
                message.success('Cập nhật sản phẩm thành công!');
                const productImage = new FormData();
                productImage.append('ProductId', productId);
                productImage.append('UpdatedBy', UpdatedBy);

                if (!checkThumbnailChanged && !checkImagesChanged){
                    return;
                } else if (checkThumbnailChanged && !checkImagesChanged) {
                    productImage.append('thumbnailFile', formData.thumbnail);
                    productImage.append('imageFiles', '');
                    productImage.append('imageIds', '');
                } else if (!checkThumbnailChanged && checkImagesChanged) {
                    productImage.append('thumbnailFile', '');
                    for (let i = 0; i < images.length; i++) 
                        {
                            productImage.append('imageFiles', images[i]);
                        }
                    for (let i = 0; i < formData.images.length; i++){
                        productImage.append('imageIds', formData.images[i].id);
                    }
                } else {
                    productImage.append('thumbnailFile', formData.thumbnail);
                    for (let i = 0; i < images.length; i++)
                        {
                            productImage.append('imageFiles', images[i]);
                        }
                    for (let i = 0; i < formData.images.length; i++){
                        productImage.append('imageIds', formData.images[i].id);
                    }
                }
                const updateProductImage = await axios.post(`https://localhost:7251/api/ProductImage/UpdateProductImage`, productImage,{
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (updateProductImage.data.success) {
                    message.success('Cập nhật hình ảnh sản phẩm thành công!');
                }
                
            }
            else {
                message.error('Cập nhật sản phẩm thất bại!');
            }

        }
        catch (error) {
            message.error('Không thể cập nhật sản phẩm. Vui lòng thử lại sau!');
        }
    };

    const handleThumbnailClick = () => {
        setItemToDelete('thumbnail');
        setShowDeletePopup(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete === 'thumbnail') {
            setFormData((prevState) => ({
                ...prevState,
                thumbnail: null,
            }));
            setThumbnailChanged(true)
        } else if (itemToDelete && itemToDelete.startsWith('image-')) {
            const imageId = parseInt(itemToDelete.split('-')[1], 10);
            setFormData((prevState) => ({
                ...prevState,
                images: prevState.images.filter((img) => img.id !== imageId),
            }));
            setImagesChanged(true)
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
            <h1 className="mb-6 text-3xl font-bold">Cập nhật sản phẩm</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="flex space-x-6">
                    <div className="flex-1 flex flex-col space-y-4">
                        <label className="font-bold">Ảnh bìa <span className="text-red-500">*</span></label>
                        <div className="flex justify-center items-center border border-gray-300 rounded-md h-64 relative">
                            {formData.thumbnail ? (
                                <img
                                    src={formData.thumbnail ? formData.thumbnail :  URL.createObjectURL(formData.thumbnail)}
                                    alt="Thumbnail"
                                    className="object-cover h-full w-full"
                                    onClick={handleThumbnailClick}
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
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/PlusCM128.svg/1200px-PlusCM128.svg.png" alt="Add Thumbnail" className="h-40 opacity-50" />
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
                                        src={image.imageUrl ? image.imageUrl : URL.createObjectURL(image)}
                                        alt={`Product ${index}`}
                                        className="w-40 h-40 object-cover"
                                        onClick={() => {
                                            setItemToDelete(`image-${image.id}`);
                                            setShowDeletePopup(true);
                                        }}
                                    />
                                ))}
                            {formData.images.length > 6 &&
                                formData.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.imageUrl ? image.imageUrl : URL.createObjectURL(image)}
                                        alt={`Product ${index}`}
                                        className="w-20 h-20 object-cover"
                                        onClick={() => {
                                            setItemToDelete(`image-${image.id}`);
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
                                Giá giảm
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
                                name="typeId"
                                value={formData.typeId}
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
                                name="brandId"
                                value={formData.brandId}
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
                                name="ageId"
                                value={formData.ageId}
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
                        Cập nhật
                    </button>
                </div>
            </form>
            {showDeletePopup && <DeletePopup />}
        </div>
    );
};

export default UpdateProductPage;
