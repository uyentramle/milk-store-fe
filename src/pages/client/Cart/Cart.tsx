import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode, { jwtDecode } from 'jwt-decode';

interface CartItemProps {
  id: number;
  productId: string;
  imgSrc: string;
  title: string;
  price: number;
  quantity: number;
  discountPrice?: number;
  discountText?: string;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemoveItem: (id: number) => void;
}

interface CartItem {
  id: number;
  productId: string;
  quanity: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
}

const CartItem: React.FC<CartItemProps> = ({ 
  id, 
  productId, 
  imgSrc, 
  title, 
  price, 
  quantity, 
  discountPrice, 
  discountText, 
  onQuantityChange,
  onRemoveItem
}) => {
  const updateQuantity = async (newQuantity: number) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:44329/api/Cart/UpdateCartByID/update-cart/${id}`,
        { 
          productId: productId,
          quanity: newQuantity 
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        if (newQuantity === 0) {
          onRemoveItem(id);
        } else {
          onQuantityChange(id, newQuantity);
        }
      } else {
        console.error('Failed to update cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  return (
    <div className="flex items-center justify-between border-b pb-4 mb-4">
      <div className="flex items-center">
        <img src={imgSrc} alt={title} className="w-16 h-16 rounded-lg" />
        <div className="ml-4">
          <p className="font-semibold">{title}</p>
          {discountText && <p className="text-sm text-red-500">{discountText}</p>}
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">
          {discountPrice && <span className="line-through text-gray-500">{discountPrice}₫</span>} {price}₫
        </p>
        <div className="flex items-center mt-2">
          <button 
            className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md" 
            onClick={() => updateQuantity(quantity - 1)}
          >
            -
          </button>
          <input type="text" value={quantity} className="w-12 text-center mx-2 border rounded-md" readOnly />
          <button 
            className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md"
            onClick={() => updateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [vouchers, setVouchers] = useState<any[]>([]);
const [selectedVoucher, setSelectedVoucher] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('You need to be logged in to view your cart');
        setIsLoading(false);
        return;
      }

      try {
        const decodedToken: any = jwtDecode(token);
        const accountId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

        const [cartResponse, pointsResponse, addressesResponse, vouchersResponse] = await Promise.all([
          axios.get('https://localhost:44329/api/Cart/GetCartByAccountID/get-by-account-id', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get(`https://localhost:44329/api/Point/GetTotalPointsByAccountId?accountId=${accountId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get(`https://localhost:44329/api/Address/GetAddressByUserId?userId=${accountId}&pageIndex=0&pageSize=10`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          
        axios.get('https://localhost:44329/api/Voucher/GetVouchers?pageIndex=0&pageSize=10', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        ]);

        if (cartResponse.data.success) {
          setCartItems(cartResponse.data.data);
          await fetchProductDetails(cartResponse.data.data, token);
        } else {
          setError('Failed to fetch cart items');
        }

        if (pointsResponse.data.success) {
          setTotalPoints(pointsResponse.data.data);
        } else {
          setError('Failed to fetch points');
        }

        if (addressesResponse.data.success) {
          setAddresses(addressesResponse.data.data.items);
          if (addressesResponse.data.data.items.length > 0) {
            setSelectedAddress(addressesResponse.data.data.items[0].addressId.toString());
          }
        } else {
          setError('Failed to fetch addresses');
        }
        if (vouchersResponse.data.success) {
          setVouchers(vouchersResponse.data.data.items);
        } else {
          setError('Failed to fetch vouchers');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching your data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const fetchAddresses = async (token: string, userId: string) => {
    try {
      const response = await axios.get(`https://localhost:44329/api/Address/GetAddressByUserId?userId=${userId}&pageIndex=0&pageSize=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        setAddresses(response.data.data.items);
        if (response.data.data.items.length > 0) {
          setSelectedAddress(response.data.data.items[0].addressId.toString());
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const fetchProductDetails = async (items: CartItem[], token: string) => {
    const productDetails: { [key: string]: Product } = {};
    for (const item of items) {
      try {
        const response = await axios.get(`https://localhost:44329/api/Product/GetProductById?id=${item.productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          productDetails[item.productId] = response.data.data;
        }
      } catch (error) {
        console.error(`Error fetching product details for id ${item.productId}:`, error);
      }
    }
    setProducts(productDetails);
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quanity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const { subtotal, finalTotal, remainingPoints } = useMemo(() => {
    const subtotal = cartItems.reduce((total, item) => {
      const product = products[item.productId];
      if (product) {
        const discountedPrice = product.price * (1 - product.discount / 100);
        return total + discountedPrice * item.quanity;
      }
      return total;
    }, 0);

    if (usePoints) {
      const pointDiscount = Math.min(totalPoints.totalPoints * 1000, subtotal);
      const finalTotal = Math.max(subtotal - pointDiscount, 0);
      const remainingPoints = Math.max(totalPoints.totalPoints - Math.floor(pointDiscount / 1000), 0);
      return { subtotal, finalTotal, remainingPoints };
    } else {
      return { subtotal, finalTotal: subtotal, remainingPoints: totalPoints.totalPoints };
    }
  }, [cartItems, products, usePoints, totalPoints]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return;
    }

    try {
      const pointsUsed = usePoints ? totalPoints.totalPoints - remainingPoints : 0;
      const selectedAddressObj = addresses.find(addr => addr.addressId.toString() === selectedAddress);
      const shippingAddress = selectedAddressObj 
        ? `${selectedAddressObj.addressLine}, ${selectedAddressObj.ward}, ${selectedAddressObj.district}, ${selectedAddressObj.city}`
        : "Default Address";

      const checkoutData = {
        cartIds: cartItems.map(item => item.id),
        shippingAddress: shippingAddress,
        discount: 0,
        totalAmount: finalTotal,
        type: "Standard",
        status: "Pending",
        paymentMethod: "Credit Card",
        paymentStatus: "Pending",
        pointUsed: pointsUsed,
        pointSaved: Math.floor(finalTotal / 100),
        createdAt: new Date().toISOString(),
        accountId: jwtDecode<any>(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        voucherCode: selectedVoucher,

      };

      const response = await axios.post(
        'https://localhost:44329/api/orders/add-to-cart',
        checkoutData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        console.log('Checkout successful');
        const [orderId, paymentUrl] = response.data.data.split(' ');
        console.log(`Order ID: ${orderId}`);
        
        // Navigate to the payment URL
        window.location.href = paymentUrl;
      } else {
        setError('Checkout failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('An error occurred during checkout');
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-24">
      <title>Cart</title>
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <div>
          {cartItems.map((item) => {
            const product = products[item.productId];
            if (!product) return null;
            const discountedPrice = product.price * (1 - product.discount / 100);
            return (
              <CartItem
                key={item.id}
                id={item.id}
                productId={item.productId}
                imgSrc={product.image || "https://via.placeholder.com/50"}
                title={product.name}
                price={discountedPrice}
                quantity={item.quanity}
                discountPrice={product.discount > 0 ? product.price : undefined}
                discountText={product.discount > 0 ? `Giảm ${product.discount}%` : undefined}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
              />
            );
          })}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Tạm tính</p>
            <p className="font-semibold">{subtotal}₫</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Sử dụng điểm: {totalPoints.totalPoints}</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={() => setUsePoints(!usePoints)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          {usePoints && (
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Điểm còn lại</p>
              <p>{remainingPoints}</p>
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
    <p className="text-gray-600">Voucher</p>
    <select 
      value={selectedVoucher} 
      onChange={(e) => setSelectedVoucher(e.target.value)}
      className="border rounded-md p-2"
    >
      <option value="">Select a voucher</option>
      {vouchers.map((voucher) => (
        <option key={voucher.id} value={voucher.code}>
          {voucher.code} - {voucher.description}
        </option>
      ))}
    </select>
  </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Địa chỉ giao hàng</p>
            <select 
              value={selectedAddress} 
              onChange={(e) => setSelectedAddress(e.target.value)}
              className="border rounded-md p-2"
            >
              {addresses.map((address) => (
                <option key={address.addressId} value={address.addressId}>
                  {`${address.addressLine}, ${address.ward}, ${address.district}, ${address.city}`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <p>Tổng tiền</p>
            <p className="text-pink-500">{finalTotal.toFixed(2)}₫</p>
          </div>
          <button 
            className="w-full bg-pink-500 text-white py-3 mt-4 rounded-md"
            onClick={localStorage.getItem('accessToken') ? handleCheckout : () => {/* Redirect to login */}}
          >
            {localStorage.getItem('accessToken') ? 'Tiến hành thanh toán' : 'Đăng nhập ngay để mua hàng'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
