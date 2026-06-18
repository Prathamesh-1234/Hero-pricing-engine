import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function PartManager() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newPart, setNewPart] = useState({ name: '', category: 'frame', currentPrice: 0 });
  const [updatingId, setUpdatingId] = useState(null);
  const [updatePrice, setUpdatePrice] = useState('');
  const [updateReason, setUpdateReason] = useState('');

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    setLoading(true);
    try {
      const data = await api.getParts();
      setParts(data);
      setError('');
    } catch (err) {
      setError('Failed to load parts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPart = async (e) => {
    e.preventDefault();
    try {
      await api.createPart(newPart);
      setNewPart({ name: '', category: 'frame', currentPrice: 0 });
      await loadParts();
    } catch (err) {
      setError('Failed to create part');
    }
  };

  const handleUpdatePrice = async (id) => {
    try {
      await api.updatePartPrice(id, parseFloat(updatePrice), updateReason || 'manual');
      setUpdatingId(null);
      setUpdatePrice('');
      setUpdateReason('');
      await loadParts();
    } catch (err) {
      setError('Failed to update price');
    }
  };

  if (loading) return <p>Loading parts...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Parts Management</h2>

      {/* Add Part Form */}
      <form onSubmit={handleAddPart} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Part Name"
          value={newPart.name}
          onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
          required
        />
        <select
          value={newPart.category}
          onChange={(e) => setNewPart({ ...newPart, category: e.target.value })}
        >
          <option value="frame">Frame</option>
          <option value="tyre">Tyre</option>
          <option value="gear">Gear</option>
          <option value="seat">Seat</option>
          <option value="brake">Brake</option>
          <option value="handle">Handle</option>
          <option value="chain">Chain</option>
          <option value="pedal">Pedal</option>
        </select>
        <input
          type="number"
          placeholder="Price (INR)"
          value={newPart.currentPrice}
          onChange={(e) => setNewPart({ ...newPart, currentPrice: parseFloat(e.target.value) || 0 })}
          required
        />
        <button type="submit">Add Part</button>
      </form>

      {/* Parts List */}
      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price (INR)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part._id}>
              <td>{part.name}</td>
              <td>{part.category}</td>
              <td>
                {updatingId === part._id ? (
                  <div>
                    <input
                      type="number"
                      value={updatePrice}
                      onChange={(e) => setUpdatePrice(e.target.value)}
                      placeholder="New price"
                    />
                    <input
                      type="text"
                      value={updateReason}
                      onChange={(e) => setUpdateReason(e.target.value)}
                      placeholder="Reason (optional)"
                    />
                    <button onClick={() => handleUpdatePrice(part._id)}>Save</button>
                    <button onClick={() => { setUpdatingId(null); setUpdatePrice(''); setUpdateReason(''); }}>Cancel</button>
                  </div>
                ) : (
                  <span>₹{part.currentPrice}</span>
                )}
              </td>
              <td>
                {updatingId !== part._id && (
                  <button onClick={() => { setUpdatingId(part._id); setUpdatePrice(part.currentPrice.toString()); }}>
                    Update Price
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}