// src/components/GoalItem.js
import React, { useState } from 'react';
// import './GoalItem.css';

function GoalItem({ 
  goal, 
  isEditing, 
  isDepositing, 
  onStartEditing, 
  onCancelEditing, 
  onUpdate, 
  onDelete,
  onStartDeposit,
  onCancelDeposit,
  onDeposit
}) {
  const [editForm, setEditForm] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline
  });
  
  const [depositAmount, setDepositAmount] = useState('');
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onUpdate(goal.id, editForm);
  };
  
  const handleSubmitDeposit = (e) => {
    e.preventDefault();
    if (depositAmount && parseFloat(depositAmount) > 0) {
      onDeposit(goal.id, depositAmount);
      setDepositAmount('');
    }
  };
  
  // Calculate progress
  const progress = (parseFloat(goal.savedAmount) / parseFloat(goal.targetAmount)) * 100;
  const remaining = parseFloat(goal.targetAmount) - parseFloat(goal.savedAmount);
  
  // Calculate deadline status
  const today = new Date();
  const deadlineDate = new Date(goal.deadline);
  const timeDiff = deadlineDate - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  let status = '';
  let statusClass = '';
  
  if (progress >= 100) {
    status = 'Completed!';
    statusClass = 'completed';
  } else if (daysLeft < 0) {
    status = 'Overdue!';
    statusClass = 'overdue';
  } else if (daysLeft <= 30) {
    status = `Only ${daysLeft} days left!`;
    statusClass = 'warning';
  } else {
    status = `${daysLeft} days left`;
  }

  return (
    <div className={`goal-item ${statusClass}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSubmitEdit}>
          <div className="form-group">
            <label>Goal Name</label>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Target Amount ($)</label>
            <input
              type="number"
              name="targetAmount"
              value={editForm.targetAmount}
              onChange={handleEditChange}
              min="0.01"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
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
              value={editForm.deadline}
              onChange={handleEditChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancelEditing}>Cancel</button>
          </div>
        </form>
      ) : isDepositing ? (
        <form className="deposit-form" onSubmit={handleSubmitDeposit}>
          <h3>Make Deposit to {goal.name}</h3>
          <p>Current saved: ${parseFloat(goal.savedAmount).toFixed(2)}</p>
          <p>Remaining: ${remaining.toFixed(2)}</p>
          
          <div className="form-group">
            <label>Deposit Amount ($)</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              min="0.01"
              step="0.01"
              max={remaining}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit">Add Deposit</button>
            <button type="button" onClick={onCancelDeposit}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="goal-header">
            <h3>{goal.name}</h3>
            <span className={`status-badge ${statusClass}`}>{status}</span>
          </div>
          
          <div className="goal-details">
            <div className="detail">
              <span>Category:</span>
              <span>{goal.category}</span>
            </div>
            <div className="detail">
              <span>Target:</span>
              <span>${parseFloat(goal.targetAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="detail">
              <span>Saved:</span>
              <span>${parseFloat(goal.savedAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="detail">
              <span>Remaining:</span>
              <span>${remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="detail">
              <span>Deadline:</span>
              <span>{new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <span>{progress.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          
          <div className="goal-actions">
            <button onClick={() => onStartDeposit(goal.id)}>Add Deposit</button>
            <button onClick={() => onStartEditing(goal.id)}>Edit</button>
            <button onClick={() => onDelete(goal.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalItem;