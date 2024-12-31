import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartReducerInitialState } from '@/types/reducer-types';

// Sample country and state data (you'd typically fetch this from an API)
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'IN', name: 'India' }
];

const statesByCountry = {
  'US': [
    { code: 'CA', name: 'California' },
    { code: 'NY', name: 'New York' },
    { code: 'TX', name: 'Texas' }
  ],
  'CA': [
    { code: 'ON', name: 'Ontario' },
    { code: 'BC', name: 'British Columbia' }
  ],
  'IN': [
    { code: 'MH', name: 'Maharashtra' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'DL', name: 'Delhi' }
  ]
};

interface AddressFormData {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}

const Shipping: React.FC = () => {

  const { cartItems } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AddressFormData>({
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: ''
  });

  const [availableStates, setAvailableStates] = useState<{ code: string, name: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Special handling for country to update available states
    if (name === 'country') {
      const states = statesByCountry[value as keyof typeof statesByCountry] || [];
      setAvailableStates(states);
      
      // Reset state when country changes
      setFormData(prev => ({
        ...prev,
        [name]: value,
        state: '' // Reset state when country changes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace with your actual backend endpoint
      const response = await axios.post('/api/submit-address', formData);
      
      // Handle successful submission
      console.log('Submission successful', response.data);
      alert('Address submitted successfully!');
    } catch (error) {
      // Handle submission error
      console.error('Submission error', error);
      alert('Failed to submit address');
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  return (
    <div className="relative  bg-gradient-to-r from-blue-800 via-blue-950 to-gray-900 border border-black ">
      <button className="absolute top-5 left-5 text-white text-lg hover:text-gray-300 transition-all" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
      <div className="max-w-md mx-auto mt-12 p-8 bg-gray-900 text-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Shipping Address</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-2 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-2 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-300">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-2 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>{country.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-300">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              disabled={!formData.country}
              className="mt-2 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 transition-all"
            >
              <option value="">Select State</option>
              {availableStates.map((state) => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pinCode" className="block text-sm font-medium text-gray-300">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
              pattern="\d{5,6}"
              className="mt-2 block w-full border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Submit Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
