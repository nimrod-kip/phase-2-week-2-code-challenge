// src/components/GoalList.js
import React, { useState } from 'react';
import GoalItem from './GoalItem';
// import './GoalList.css';

function GoalList({ goals, onUpdateGoal, onDeleteGoal, onAddDeposit }) {
  const [editingId, setEditingId] = useState(null);
  const [depositId, setDepositId] = useState(null);
  
  const startEditing = (id) => {
    setEditingId(id);
    setDepositId(null);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
  };
  
  const handleUpdate = (id, updatedData) => {
    onUpdateGoal(id, updatedData);
    setEditingId(null);
  };
  
  const startDeposit = (id) => {
    setDepositId(id);
    setEditingId(null);
  };
  
  const cancelDeposit = () => {
    setDepositId(null);
  };
  
  const handleDeposit = (id, amount) => {
    onAddDeposit(id, amount);
    setDepositId(null);
  };
  
  // Sort goals: completed first, then by deadline proximity
  const sortedGoals = [...goals].sort((a, b) => {
    const aCompleted = parseFloat(a.savedAmount) >= parseFloat(a.targetAmount);
    const bCompleted = parseFloat(b.savedAmount) >= parseFloat(b.targetAmount);
    
    if (aCompleted && !bCompleted) return -1;
    if (!aCompleted && bCompleted) return 1;
    
    const today = new Date();
    const aDeadline = new Date(a.deadline);
    const bDeadline = new Date(b.deadline);
    
    return aDeadline - bDeadline;
  });

  return (
    <div className="goal-list">
      <h2>Your Savings Goals</h2>
      
      {sortedGoals.length === 0 ? (
        <div className="empty-state">
          <p>No savings goals yet. Add your first goal to get started!</p>
        </div>
      ) : (
        <div className="goals-container">
          {sortedGoals.map(goal => (
            <GoalItem 
              key={goal.id}
              goal={goal}
              isEditing={editingId === goal.id}
              isDepositing={depositId === goal.id}
              onStartEditing={startEditing}
              onCancelEditing={cancelEditing}
              onUpdate={handleUpdate}
              onDelete={onDeleteGoal}
              onStartDeposit={startDeposit}
              onCancelDeposit={cancelDeposit}
              onDeposit={handleDeposit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalList;