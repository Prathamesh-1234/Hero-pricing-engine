import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function CycleManager() {
  const [cycles, setCycles] = useState([]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newCycle, setNewCycle] = useState({
    name: '',
    description: '',
    components: [{ partId: '', quantity: 1 }],
  });

  useEffect(() => {
    loadCycles();
    loadParts();
  }, []);

  const loadCycles = async () => {
    setLoading(true);
    try {
      const data = await api.getCycles();
      setCycles(data);
    } catch (err) {
      setError('Failed to load cycles');
    } finally {
      setLoading(false);
    }
  };

  const loadParts = async () => {
    try {
      const data = await api.getParts();
      setParts(data);
    } catch (err) {
      setError('Failed to load parts');
    }
  };

  const handleComponentChange = (index, field, value) => {
    const updated = [...newCycle.components];
    updated[index][field] = field === 'quantity' ? parseInt(value) : value;
    setNewCycle({ ...newCycle, components: updated });
  };

  const addComponent = () => {
    setNewCycle({
      ...newCycle,
      components: [...newCycle.components, { partId: '', quantity: 1 }],
    });
  };

  const removeComponent = (index) => {
    const updated = newCycle.components.filter((_, i) => i !== index);
    setNewCycle({ ...newCycle, components: updated });
  };

  const handleCreateCycle = async (e) => {
    e.preventDefault();
    try {
      await api.createCycle(newCycle);
      setNewCycle({ name: '', description: '', components: [{ partId: '', quantity: 1 }] });
      await loadCycles();
    } catch (err) {
      setError('Failed to create cycle');
    }
  };

  if (loading) return <p>Loading cycles...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Cycle Configurations</h2>

      {/* Create Cycle Form */}
      <form onSubmit={handleCreateCycle} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h3>Create New Cycle</h3>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={newCycle.name}
            onChange={(e) => setNewCycle({ ...newCycle, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={newCycle.description}
            onChange={(e) => setNewCycle({ ...newCycle, description: e.target.value })}
          />
        </div>

        <h4>Components</h4>
        {newCycle.components.map((comp, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select
              value={comp.partId}
              onChange={(e) => handleComponentChange(idx, 'partId', e.target.value)}
              required
            >
              <option value="">Select Part</option>
              {parts.map(p => (
                <option key={p._id} value={p._id}>{p.name} (₹{p.currentPrice})</option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={comp.quantity}
              onChange={(e) => handleComponentChange(idx, 'quantity', e.target.value)}
              required
            />
            <button type="button" onClick={() => removeComponent(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addComponent}>Add Component</button>
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Create Cycle</button>
      </form>

      {/* List Cycles */}
      <h3>Existing Cycles</h3>
      <ul>
        {cycles.map(cycle => (
          <li key={cycle._id}>
            <strong>{cycle.name}</strong> – {cycle.description || 'No description'}
            <ul>
              {cycle.components.map((comp, idx) => (
                <li key={idx}>
                  {comp.partId?.name || 'Unknown'} × {comp.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}