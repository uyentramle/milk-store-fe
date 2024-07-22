import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'antd';

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

interface Product {
    id: string;
    name: string;
    image: string;
    sku: string;
    description: string;
    price: number;
    weight: number;
    discount: number;
    quantity: number;
    type: Type;
    brand: Brand;
    ageRange: AgeRange;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    active: boolean;
}

const ProductDetailPage: React.FC = () => {
    const { id, page } = useParams<{ id: string, page: string }>();
    const [product, setProduct] = useState<Product>();
    const [images, setImages] = useState<Image[]>([]);
    const [mainImage, setMainImage] = useState<string>('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://localhost:44329/api/Product/GetProductById?id=${id}`);
                const data = await response.json();
                if (data.success) {
                    setProduct(data.data);
                } else {
                    console.error('Failed to fetch product details:', data.message);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        const fetchProductImages = async () => {
            try {
                const response = await fetch(`https://localhost:44329/api/ProductImage/GetProductImagesById?productImageId=${id}`);
                const data = await response.json();
                if (data.success) {
                    setImages(data.data.map((item: any) => item.image, setMainImage(data.data[0].image.imageUrl)));
                } else {
                    console.error('Failed to fetch product images:', data.message);
                }
            } catch (error) {
                console.error('Error fetching product images:', error);
            }
        };
        fetchProductDetails();
        fetchProductImages();

        
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-8 flex justify-center">
            <div className="w-full flex">
                <div className="w-1/2 pr-4 flex flex-col items-center">
                    <div className="mb-4 flex justify-center items-center" style={{ width: '400px', height: '400px' }}>
                        <img src={mainImage} alt={product.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex justify-center space-x-2">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img.imageUrl}
                                alt={`Thumbnail ${index}`}
                                className="w-20 h-20 object-cover cursor-pointer"
                                onClick={() => setMainImage(img.imageUrl)}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <h2 className="mb-4 text-2xl font-bold">{product.name}</h2>
                    <p className='mt-8'><strong>SKU:</strong> {product.sku}</p>
                    <p className='mt-2'><strong>Mô tả:</strong> {product.description}</p>
                    <p className='mt-2'><strong>Giá gốc:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</p>
                    <p className='mt-2'><strong>Giá giảm:</strong> {product.discount ? `${product.discount}%` : 'Không có'}</p>
                    <p className='mt-2'><strong>Cân nặng:</strong> {product.weight} Kg</p>
                    <p className='mt-2'><strong>Số lượng:</strong> {product.quantity}</p>
                    <p className='mt-2'><strong>Phân loại:</strong> {product.type.name}</p>
                    <p className='mt-2'><strong>Thương hiệu:</strong> {product.brand.name}</p>
                    <p className='mt-2'><strong>Độ tuổi:</strong> {product.ageRange.name}</p>
                    <p className='mt-2'>
                        <strong>Trạng thái: </strong>
                        <span className={`${product.active ? 'text-green-500' : 'text-red-500'} font-bold`}>
                            {product.active ? 'Đang bán' : 'Ngừng bán'}
                        </span>
                    </p>
                    {page === "manage" && (
                        <Link to="/admin/products">
                            <button
                                type="button"
                                className="rounded bg-pink-500 px-4 py-2 mt-4 font-bold text-white hover:bg-pink-700"
                            >
                                Trở về
                            </button>
                        </Link>
                    )}
                    {page === "restore" && (
                        <Link to="/admin/products/restore">
                            <button
                                type="button"
                                className="rounded bg-pink-500 px-4 py-2 mt-4 font-bold text-white hover:bg-pink-700"
                            >
                                Trở về
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;