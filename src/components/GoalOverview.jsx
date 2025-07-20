// src/components/GoalOverview.js
import React from 'react';
// import './GoalOverview.css';

function GoalOverview({ goals }) {
  // Calculate statistics
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + parseFloat(goal.savedAmount), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + parseFloat(goal.targetAmount), 0);
  const completedGoals = goals.filter(goal => 
    parseFloat(goal.savedAmount) >= parseFloat(goal.targetAmount)
  ).length;
  
  const progressPercentage = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  // Calculate goals with warnings
  const today = new Date();
  const warningGoals = goals.filter(goal => {
    if (parseFloat(goal.savedAmount) >= parseFloat(goal.targetAmount)) return false;
    
    const deadline = new Date(goal.deadline);
    const timeDiff = deadline - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    return daysLeft <= 30 && daysLeft > 0;
  });

  // Calculate overdue goals
  const overdueGoals = goals.filter(goal => {
    if (parseFloat(goal.savedAmount) >= parseFloat(goal.targetAmount)) return false;
    
    const deadline = new Date(goal.deadline);
    return deadline < today;
  });

  return (
    <div className="goal-overview">
      <h2>Financial Overview</h2>
      
      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        
        <div className="stat-card">
          <h3>Goals Completed</h3>
          <p>{completedGoals}</p>
        </div>
        
        <div className="stat-card warning">
          <h3>Goals Needing Attention</h3>
          <p>{warningGoals.length + overdueGoals.length}</p>
        </div>
      </div>
      
      <div className="overall-progress">
        <h3>Overall Progress</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          >
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
        </div>
        <div className="progress-labels">
          <span>${totalSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span>${totalTarget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}

export default GoalOverview;