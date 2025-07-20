// src/components/AddGoalForm.js
import React, { useState } from 'react';
import './AddGoalForm.css';

function AddGoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGoal(formData);
    // Reset form
    setFormData({
      name: '',
      targetAmount: '',
      category: '',
      deadline: ''
    });
  };

  return (
    <div className="add-goal-form">
      <h2>Create New Savings Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Vacation to Japan"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Target Amount ($)</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            placeholder="e.g., 5000"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Electronics">Electronics</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Retirement">Retirement</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}

export default AddGoalForm;