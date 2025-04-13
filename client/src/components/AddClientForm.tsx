import React, { useState } from 'react';
import { createClient } from '../index';
import { Client } from '../types';
import { useApiRequest } from '../hooks/useApiRequest';

interface AddClientFormProps {
  onClientAdded?: (client: Client) => void;
}

/**
 * Компонент форми для додавання нового клієнта
 * @param onClientAdded - Функція, яка викликається після успішного додавання клієнта
 */
export const AddClientForm: React.FC<AddClientFormProps> = ({ onClientAdded }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { loading, error, executeRequest, clearError } = useApiRequest<Client>();
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валідація форми
    if (!name.trim()) {
      return;
    }
    
    if (!phone.trim()) {
      return;
    }
    
    const newClient: Client = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined
    };
    
    const result = await executeRequest(() => createClient(newClient));
    
    if (result) {
      // Очищення форми після успішного додавання
      setName('');
      setPhone('');
      setEmail('');
      setSuccess(true);
      
      // Сховати повідомлення про успіх через 3 секунди
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
      // Викликати функцію зворотного виклику, якщо вона передана
      if (onClientAdded) {
        onClientAdded(result);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Додати нового клієнта</h2>
      
     
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Клієнта успішно додано!</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ім'я *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Додавання...' : 'Додати клієнта'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClientForm;
