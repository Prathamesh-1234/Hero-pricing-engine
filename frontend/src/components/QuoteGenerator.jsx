import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function QuoteGenerator() {
  const [cycles, setCycles] = useState([]);
  const [selectedCycleId, setSelectedCycleId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [breakdown, setBreakdown] = useState(null);
  const [quoteResult, setQuoteResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCycles();
  }, []);

  const loadCycles = async () => {
    try {
      const data = await api.getCycles();
      setCycles(data);
    } catch (err) {
      setError('Failed to load cycles');
    }
  };

  const handlePreview = async () => {
    if (!selectedCycleId) {
      setError('Please select a cycle');
      return;
    }
    setLoading(true);
    try {
      const data = await api.getCyclePrice(selectedCycleId);
      setBreakdown(data);
      setError('');
    } catch (err) {
      setError('Failed to get price breakdown');
      setBreakdown(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuote = async () => {
    if (!selectedCycleId || !customerName.trim()) {
      setError('Please select a cycle and enter customer name');
      return;
    }
    setLoading(true);
    try {
      const quote = await api.createQuote(selectedCycleId, customerName.trim());
      setQuoteResult(quote);
      setBreakdown(null);
      setError('');
    } catch (err) {
      setError('Failed to create quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Quote</h2>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <select
          value={selectedCycleId}
          onChange={(e) => setSelectedCycleId(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="">Select a cycle</option>
          {cycles.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{ padding: '5px' }}
        />

        <button onClick={handlePreview} disabled={loading}>Preview Price</button>
        <button onClick={handleGenerateQuote} disabled={loading}>Create Quote</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Processing...</p>}

      {/* Breakdown preview */}
      {breakdown && (
        <div style={{ marginTop: '20px' }}>
          <h3>Price Breakdown</h3>
          <table border="1" cellPadding="5" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Part</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.unitPrice}</td>
                  <td>₹{item.subtotal}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4"><strong>Total</strong></td>
                <td><strong>₹{breakdown.total}</strong></td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setBreakdown(null)}>Clear Preview</button>
        </div>
      )}

      {/* Quote result */}
      {quoteResult && (
        <div style={{ marginTop: '20px', border: '1px solid green', padding: '15px' }}>
          <h3>✅ Quote Created</h3>
          <p><strong>Quote ID:</strong> {quoteResult._id}</p>
          <p><strong>Customer:</strong> {quoteResult.customerName}</p>
          <p><strong>Cycle:</strong> {quoteResult.cycleId?.name || 'N/A'}</p>
          <p><strong>Total Price:</strong> ₹{quoteResult.totalPrice}</p>
          <p><strong>Created:</strong> {new Date(quoteResult.createdAt).toLocaleString()}</p>
          <button onClick={() => setQuoteResult(null)}>Close</button>
        </div>
      )}
    </div>
  );
}