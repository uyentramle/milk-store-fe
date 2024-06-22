import React from 'react';
// import { Input } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const { Search } = Input;

const Banner: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="bg relative">
      <div className="mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <Slider {...settings}>
              <div>
                <img src="https://cdn1.concung.com/img/adds/2024/05/1716870126-1960x640.png" alt="Banner" />
              </div>
              <div>
                <img src="https://cdn1.concung.com/img/adds/2024/05/1716870126-1960x640.png" alt="Banner" />
              </div>
              <div>
                <img src="https://cdn1.concung.com/img/adds/2024/05/1716870126-1960x640.png" alt="Banner" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {/* <div className="search_outer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-4 rounded">
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={(value) => console.log(value)}
          style={{ width: '500px' }}
          className='p-4'
        />
      </div> */}
    </section>
  );
};

export default Banner;