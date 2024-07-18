import React from 'react';

interface CartItemProps {
  imgSrc: string;
  title: string;
  price: number;
  quantity: number;
  discountPrice?: number;
  discountText?: string;
}

const CartItem: React.FC<CartItemProps> = ({ imgSrc, title, price, quantity, discountPrice, discountText }) => {
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
          <button className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md">-</button>
          <input type="text" value={quantity} className="w-12 text-center mx-2 border rounded-md" readOnly />
          <button className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md">+</button>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-24"> {/* Added pt-24 for padding-top */}
    <title>Cart</title>
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <p className="text-gray-600 mt-2">
            Đăng nhập để hưởng ưu đãi dành riêng cho thành viên <a href="#" className="text-blue-500">Đăng nhập ngay</a>
          </p>
        </div>
        <div>
          <CartItem
            imgSrc="https://via.placeholder.com/50"
            title="Sữa Friso Gold Pro số 4 800g 3 - 6 tuổi"
            price={595000}
            quantity={1}
          />
          <CartItem
            imgSrc="https://via.placeholder.com/50"
            title="Xúc Xích Tiệt Trùng Goldkids Gà & Cá"
            price={37800}
            quantity={1}
            discountPrice={42000}
            discountText="Giảm 10% Xúc xích Gà và Cá"
          />
          <CartItem
            imgSrc="https://via.placeholder.com/50"
            title="Similac Mom Hương Vani, 400g"
            price={235000}
            quantity={1}
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Tạm tính</p>
            <p className="font-semibold">872.000₫</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Giảm giá sản phẩm</p>
            <p className="font-semibold">-4.200₫</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Tiền tích lũy</p>
            <p className="font-semibold">+868₫</p>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <p>Tổng tiền</p>
            <p className="text-pink-500">867.800₫</p>
          </div>
          <button className="w-full bg-pink-500 text-white py-3 mt-4 rounded-md">Đăng nhập ngay để mua hàng</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
