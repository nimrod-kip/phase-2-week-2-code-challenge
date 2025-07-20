import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GoalDashboard from './components/GoalDashboard'
import './App.css'

function App() {
  return (
  <div className="App">
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
        <p>Track and achieve your financial goals</p>
      </header>
      <main>
        <GoalDashboard />
      </main>
      <footer>
        <p>© 2025 FinTech Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
