// src/components/GoalDashboard.js
import React, { useState, useEffect } from 'react';
import GoalOverview from './GoalOverview';
import GoalList from './GoalList';
import AddGoalForm from './AddGoalForm';
import './GoalDashboard.css';

const API_URL = 'http://localhost:3000/goals';

function GoalDashboard() {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch goals from the API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch goals');
        }
        const data = await response.json();
        setGoals(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  // Add a new goal
  const addGoal = async (newGoal) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newGoal,
          savedAmount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add goal');
      }
      
      const addedGoal = await response.json();
      setGoals([...goals, addedGoal]);
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update an existing goal
  const updateGoal = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
      
      const updatedGoal = await response.json();
      setGoals(goals.map(goal => goal.id === id ? updatedGoal : goal));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Add a deposit to a goal
  const addDeposit = async (id, amount) => {
    try {
      const goal = goals.find(g => g.id === id);
      if (!goal) return;
      
      const newSavedAmount = parseFloat(goal.savedAmount) + parseFloat(amount);
      
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add deposit');
      }
      
      const updatedGoal = await response.json();
      setGoals(goals.map(g => g.id === id ? updatedGoal : g));
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading goals...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="goal-dashboard">
      <GoalOverview goals={goals} />
      
      <div className="dashboard-controls">
        <button 
          className="add-goal-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Goal'}
        </button>
      </div>
      
      {showAddForm && <AddGoalForm onAddGoal={addGoal} />}
      
      <GoalList 
        goals={goals} 
        onUpdateGoal={updateGoal} 
        onDeleteGoal={deleteGoal} 
        onAddDeposit={addDeposit} 
      />
    </div>
  );
}

export default GoalDashboard;