import React, { useEffect, useState } from 'react';
import { getClients } from '../index';
import { Client } from '../types';
import { useApiRequest } from '../hooks/useApiRequest';


/**
 * Компонент для відображення списку клієнтів
 */
export const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const { loading, executeRequest } = useApiRequest<Client[]>();

  useEffect(() => {
    const fetchClients = async () => {
      const result = await executeRequest(() => getClients());
      if (result) {
        setClients(result);
      }
    };

    fetchClients();
  }, [executeRequest]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Клієнти</h1>     
     
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {clients.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Клієнтів не знайдено
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ім'я
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Телефон
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{client.email || '-'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientList;
