import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const navigate=useNavigate()

  const [formData, setFormData] = useState<AddressFormData>({
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: ''
  });

  const [availableStates, setAvailableStates] = useState<{code: string, name: string}[]>([]);

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

  return (
    <div className='relative'>
         <button className='absolute top-3 left-10' onClick={()=>navigate(-1)} >Back</button>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg relative">

       
        <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            disabled={!formData.country}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          >
            <option value="">Select State</option>
            {availableStates.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
            Pin Code
          </label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
            pattern="\d{5,6}"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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