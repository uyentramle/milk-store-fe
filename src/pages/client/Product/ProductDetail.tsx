import React, { useEffect, useState } from 'react';
import { Input, Typography, Row, Col, Card, Button, Rate } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './ProductDetail.css';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';

const { Title, Paragraph } = Typography;

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
  typeId: number;
  ageId: number;
  brandId: number;
  active: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
  brand: Brand;
  type: Type;
  ageRange: AgeRange;
}

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

const ProductDetail = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentValue, setCurrentValue] = useState<number>(2);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (productId) {
      fetch(`https://localhost:44329/api/Product/GetProductById?id=${productId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const fetchedProduct = data.data;
            setProduct(fetchedProduct);

            // Fetch product images
            fetch(`https://localhost:44329/api/ProductImage/GetProductImagesById?productImageId=${productId}`)
              .then((response) => response.json())
              .then((imageData) => {
                if (imageData.success) {
                  const imageUrls = imageData.data.map((image: any) => image.image.imageUrl);
                  setProductImages(imageUrls);
                } else {
                  console.error('Failed to fetch product images:', imageData.message);
                }
              })
              .catch((error) => {
                console.error('Error fetching product images:', error);
              });

            // Fetch brand details
            fetch(`https://localhost:44329/api/Brand/ViewBrandDetail/${fetchedProduct.brandId}`)
              .then((response) => response.json())
              .then((brandData) => {
                if (brandData.success) {
                  const brand = brandData.data;
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    brand: {
                      ...prevProduct?.brand,
                      imageUrl: brand.imageUrl || 'https://via.placeholder.com/200', // Default image if not available
                    },
                  }));
                } else {
                  console.error('Failed to fetch brand details:', brandData.message);
                }
              })
              .catch((error) => {
                console.error('Error fetching brand details:', error);
              });
          } else {
            console.error('Failed to fetch product:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    }

    // Fetch related products
    fetch('https://localhost:44329/api/Product/GetAllProducts')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const productsData = data.data;
          const fetchImages = productsData.map((product: Product) =>
            fetch(`https://localhost:44329/api/ProductImage/GetProductImagesById?productImageId=${product.id}`)
              .then((response) => response.json())
              .then((imageData) => {
                if (imageData.success) {
                  const imageUrl = imageData.data[0]?.image?.imageUrl || 'https://via.placeholder.com/200'; // Default image if no image found
                  return { ...product, image: imageUrl };
                } else {
                  console.error('Failed to fetch related product images:', imageData.message);
                  return { ...product, image: 'https://via.placeholder.com/200' }; // Default image on error
                }
              })
              .catch((error) => {
                console.error('Error fetching related product images:', error);
                return { ...product, image: 'https://via.placeholder.com/200' }; // Default image on error
              })
          );

          Promise.all(fetchImages).then((productsWithImages) => {
            setRelatedProducts(productsWithImages);
          });
        } else {
          console.error('Failed to fetch related products:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching related products:', error);
      });
  }, [productId]);
  const handleProductClick = (id: string) => {
    navigate(`/product-detail/${id}`); // Navigate to the ProductDetail page with the clicked product ID
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  return (
    <div>
      <Banner />
      <Row gutter={16}>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <Card className="flex flex-row" style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'start' }}>
              <div className="w-24 mb-5">
                {productImages.length > 0 ? (
                  <img
                    alt="Product"
                    src={productImages[0]} // Display the first image
                    style={{ maxWidth: '200%', height: 'auto' }}
                  />
                ) : (
                  <img
                    alt="Placeholder"
                    src="https://via.placeholder.com/200"
                    style={{ maxWidth: '200%', height: 'auto' }}
                  />
                )}
              </div>
              <Card hoverable type="inner" style={{ marginLeft: '120px' }}>
                <div className="basis-5/7 ml-4">
                  <Title level={3} style={{ fontSize: '20px' }}>Thương hiệu: {product?.brand?.name}</Title>
                  <Title level={4} style={{ fontSize: '10px' }}>Loại sản phẩm: {product?.type?.name}</Title>

                  <Title level={1}>{product?.name}</Title>
                  <Paragraph>SKU: {product?.sku}</Paragraph>
                  <Paragraph>{product?.description}</Paragraph>
                  <Card>
                    <Paragraph className="object-cover line-through" style={{ fontSize: '20px' }}>
                      Giá: {product ? formatCurrency(product.price) : 'N/A'}
                    </Paragraph>
                    <Paragraph className="object-cover text-rose-600 font-semibold" style={{ fontSize: '20px' }}>
                      Giảm giá: {product ? formatCurrency(product.discount) : 'N/A'}
                    </Paragraph>
                  </Card>
                  <div className="mt-4">
                    <Input
                      addonBefore={<SearchOutlined />}
                      defaultValue="1"
                      type="number"
                      min="1"
                      style={{ width: '100px' }}
                    />
                    <div style={{ display: 'flex' }}>
                      <Button style={{ marginTop: '10px' }} type="primary" icon={<ShoppingCartOutlined />}>
                        Thêm vào giỏ hàng
                      </Button>
                      <Button style={{ marginTop: '10px', marginLeft: '10px' }} type="primary" icon={<ShoppingCartOutlined />}>
                        Mua ngay
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
              <div style={{ display: 'block' }} >
                <Card style={{ marginLeft: '10px' }} cover={<div style={{ overflow: "hidden", height: "100px" }}>
                  <img
                    alt="example"
                    style={{ height: "fit" }}
                    src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFRcVFRcVFxUVFRUVFRUWFxUVFRUYHSggGB0lHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8NFSsZFRktLjctLS0rKysrLS0tLS0tNystLSsrKysrNystLS03KzcrKystNzctLTcrKys3LTc3Lf/AABEIAJEBXAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAACAQADBAUG/8QAHBABAQEBAQADAQAAAAAAAAAAAAERAhIxQcET/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwUE/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAEREv/aAAwDAQACEQMRAD8A/c8O0c+HTlye9XSHyMODFKHAhRWKRSDDkGKpRIUVmlFgylKMFFRhklHViorIoMmKoDiHiUNDFwsYNGxpCxIDYypQSwSRFHGLGwUUw0xV1zsGx0o2I1K52J5OxMGtCxMNsF1zsGx1xpBdcLE8u95S8ovT53LrzHPl05iO1Pk4nJwYrSFGhSKxVhwZCkVirFiRRkpVlDVlDD1Q1tGcPV0NWUMOLBhQZqxWiqy2Ji4wJiri4JoY1hYmCpg4VZAbBOoqozWIKqMgJRpVKjUBKSDSMrCpjYuMA2IVEV83iOvLnzHXmMvopSFEhxWKvJRIUGKUJIsVlWaKMjWlWiik0qLIosKDDgzVhyJIciudXFxooymKsjCJjQsTAbBsNKAalq4lFRmYVsSwkooVLSojUSpVo6itjVmFRCqUVsRqlBKGr2Fo3I8fMdeQkOMu1PkoMJWKUOAUozThBDisVWZcGUGx0xsDXOQpC8lIFqSHI0hSDFrSFI0hSKxa0WIUEZo0URmZhExFoislhamijjE1F0Uw8SwNc6DrYNg1K5oVSxG0RUFZGQVqNpVz7osC1GtHUdI4R0gQ4jdKQoMIZpQoMPlWaUhRIqsUosiSlBmrIUiQxi0cKRiipqYuKsGdaRmURlZhGVGoNrMlBh1RwWMqVsFKUnNdEw8Sp6b0GJQsO1KLHOhXShRuAlIajaItoddDUjWudrWpUbkSprURqOXJxzlPlF10hxzh8jJQ+RhRWaetBkKDJSHyMPlWKUhyDIUGKUbWiqy0XGiyCIrKIjMwMysCIqAiYSSCtI2KsgDjYSUBsGw6NFgWp6KwKNxr0NrUKjUhWha10MGpGtCnYNG4I0qNRRqNRo05cukcZXTmia6w458nBnXTkoEpiFhQeVis10hwOacGafJSJzDiudaEkKUYqYraoiMzAzMwMzMCMrYKiKwMzMDIujRUqVaIsShSo0bg1KQ1GhxKtSijRpjRoKFOhRdChSojWvPzXbiuPLrBjXWUtDmnBNPmkEWBrpKcrj6KCO/J81x5rpKM11nRSuUpSqzjrCjlKUozY6aoLozhMmsIrI2grIoMyKKjMwMyMDCtG0aaitEVKla1NGkSsgraNWpRRtGkFF1KFKhRdGgVBF1y4jpzHDjt356VjTh8hKUE0xtS0L0Gukp8OErrz0GvRD5rzf0KdjL0eilcOacojvKUrjOjnQOulK5SlKMumrrnKUqotZtbQZUYF1kYFRNa0GS1tTRWtTUtS1Fa0a1o0VbUtTUoa1TW1BdbUqamhrUKVoWi6NGlaHQujRq0BdeXl14Zhl35+IbMII9KwNDZgKLGYHTn9dazCHyTMMlC5VlEn6bMIsZmAkrMIqVmBmZhQv2jMDCzCjWZgG/Q1mFC/KT4ZhW6TlmAekZhQoMwodDyzIP/2Q==' // Display brand image
                  />
                </div>}>
                  <div className="basis-5/7 ml-4">
                    <div className="flex items-left gap-4">
                      <img className="w-10 h-10 rounded-full" src={product?.brand?.imageUrl || 'https://via.placeholder.com/200'} alt="" />
                      <div className="font-medium dark:text-black">
                        <a href={`/brand-name/${product?.brand?.id}`}>
                          <div>{product?.brand?.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Xem cửa hàng</div>
                        </a>
                      </div>
                    </div>
                  </div >
                </Card>
              </div>
            </div>
          </Card>
          <Card style={{ marginTop: '10px' }}>
            <Title level={3}>Các sản phẩm khác</Title>
            <Paragraph>
              <section className="bg relative">
                <div className="mx-auto">
                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <Slider {...settings}>
                        {relatedProducts.map((relatedProduct) => (
                          <div key={relatedProduct.id} className="product-slide">
                            <Card
                              hoverable
                              cover={
                                <img
                                  alt={relatedProduct.name}
                                  src={relatedProduct.image}
                                  style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover', // Ensure the image covers the container while maintaining aspect ratio
                                    margin: '0 auto',
                                    display: 'block',
                                  }}
                                />
                              } actions={[
                                <a href="#" onClick={() => handleProductClick(relatedProduct.id)}>
                                  <ShoppingCartOutlined className="hover:text-pink-500" style={{ fontSize: '25px' }} />
                                </a>,
                              ]}
                            >
                              <Card.Meta
                                title={<a href="#" className="hover:text-pink-500" onClick={() => handleProductClick(relatedProduct.id)}>{relatedProduct.name}</a>}
                                description={<span className="text-sm text-pink-500">{relatedProduct.price} VND</span>}
                              />
                            </Card>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </section>
            </Paragraph>
          </Card>
          <Card style={{ marginTop: '10px', padding: '20px' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '0 auto',
              }}>
                <caption style={{ fontSize: '1.5em', marginBottom: '10px', textAlign: 'center' }}>Thông tin chi tiết</caption>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}></th>
                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Tên sản phẩm</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product?.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Thương hiệu</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product?.brand?.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Nơi sản xuất</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product?.brand?.brandOrigin}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Trọng lượng sản phẩm</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product?.weight}g</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Nhà cung cấp</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product?.brand?.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}>Hướng dẫn sử dụng</td>
                    <td style={{ padding: '8px' }}>{product?.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;