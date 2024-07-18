import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import cities from './data/provinces.json';
import districts from './data/districts.json';
import wards from './data/wards.json';
import { Select } from 'antd';

const useData = () => {
    const [data, setData] = useState<{
      cities: { name: string; slug: string; type: string; name_with_type: string; code: string; }[];
      districts: { name: string; slug: string; type: string; name_with_type: string; code: string; parent_code: string}[];
      wards: { name: string; slug: string; type: string; name_with_type: string; code: string; parent_code: string}[];
    }>({
      cities: [],
      districts: [],
      wards: []
    });
    
    useEffect(() => {
      setData({
        cities: cities as { name: string; slug: string; type: string; name_with_type: string; code: string; }[],
        districts,
        wards
      });
    }, []);
  
    return data;
  };

  const { Option } = Select;

  interface AddressFormProps {
    // selectedCity: string | undefined;
    // selectedDistrict: string | undefined;
    selectedCity?: string;
    selectedDistrict?: string;
    onCityChange: (value: string) => void;
    onDistrictChange: (value: string) => void;
}

  const AddressForm: React.FC<AddressFormProps> = ({ selectedCity, selectedDistrict, onCityChange, onDistrictChange }) => {
    const { cities, districts, wards } = useData();

    const handleCityChange = (value: string) => {
      onCityChange(value); // Gọi hàm xử lý sự kiện từ props
  };

  const handleDistrictChange = (value: string) => {
      onDistrictChange(value); // Gọi hàm xử lý sự kiện từ props
  };
    
    // const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    // const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
    
    // const handleCityChange = (value: string) => {
    //   setSelectedCity(value);
    //   setSelectedDistrict(undefined);
    // };
  
    // const handleDistrictChange = (value: string) => {
    //   setSelectedDistrict(value);
    // };
  
  //   const getCityName = (code: string) => cities.find(city => city.code === code)?.name || '';
  // const getDistrictName = (code: string) => districts.find(district => district.code === code)?.name || '';
  
    return (
      <div style={{ display: 'flex', gap: '6px' }}>
        <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành phố' }]}
                    style={{ flex: 1, textAlign: 'center' }}
                >
        <Select 
          placeholder="Chọn Tỉnh/Thành phố"
          onChange={handleCityChange}
          value={selectedCity}
        >
          {cities.map((city) => (
            <Option key={city.code} value={city.code}>{city.name}</Option>
          ))}
        </Select>
        </Form.Item>
        <Form.Item
                    label="Quận/Huyện"
                    name="district"
                    rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện' }]}
                    style={{ flex: 1, textAlign: 'center'  }}>
        <Select 
          placeholder="Chọn Quận/Huyện"
          onChange={handleDistrictChange}
          value={selectedDistrict}
          disabled={!selectedCity}
        >
          {districts
            .filter((district) => district.parent_code === selectedCity)
            .map((district) => (
              <Option key={district.code} value={district.code}>{district.name}</Option>
            ))}
        </Select>
        </Form.Item>

        <Form.Item
                    label="Phường/Xã"
                    name="ward"
                    rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã' }]}
                    style={{ flex: 1, textAlign: 'center' }}>
        <Select 
          placeholder="Chọn Phường/Xã"
          value={selectedDistrict ? undefined : undefined}
          disabled={!selectedDistrict}
        >
          {wards
            .filter((ward) => ward.parent_code === selectedDistrict)
            .map((ward) => (
              <Option key={ward.code} value={ward.code}>{ward.name}</Option>
            ))}
        </Select>
        </Form.Item>
      </div>
    );
  };
  
  export default AddressForm;





