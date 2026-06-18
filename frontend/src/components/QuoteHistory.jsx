import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function QuoteHistory() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const data = await api.getQuotes();
      setQuotes(data);
      setError('');
    } catch (err) {
      setError('Failed to load quotes');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading quotes...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Quote History</h2>
      {quotes.length === 0 ? (
        <p>No quotes yet.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Quote ID</th>
              <th>Customer</th>
              <th>Cycle</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map(quote => (
              <tr key={quote._id}>
                <td>{quote._id.slice(-6)}</td>
                <td>{quote.customerName}</td>
                <td>{quote.cycleId?.name || 'N/A'}</td>
                <td>₹{quote.totalPrice}</td>
                <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
                <td>
                  <details>
                    <summary>Show items</summary>
                    <ul>
                      {quote.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity} @ ₹{item.unitPrice} = ₹{item.subtotal}
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}