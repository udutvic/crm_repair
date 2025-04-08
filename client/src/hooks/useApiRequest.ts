import { useState, useCallback } from 'react';

/**
 * Хук для виконання API-запитів з обробкою стану завантаження та помилок
 */
export function useApiRequest<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Виконує API-запит з обробкою стану завантаження та помилок
   * @param apiCall - Функція, яка виконує API-запит
   * @returns Результат API-запиту або undefined у випадку помилки
   */
  const executeRequest = useCallback(async (apiCall: () => Promise<T>): Promise<T | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      console.error('Помилка API-запиту:', err);
      setError(err instanceof Error ? err : new Error('Невідома помилка'));
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Очищає помилку
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, executeRequest, clearError };
}
