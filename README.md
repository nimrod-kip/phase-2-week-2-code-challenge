
# Smart Goal Planner 

## Overview
The Smart Goal Planner is a financial management tool that allows users to create, track, and manage multiple savings goals. Users can allocate deposits across different goals, monitor progress, and get an overview of their savings activity.

## Features

### Core Functionality
- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for savings goals
- **Progress Tracking**: Visual representation of progress toward each goal
- **Deposit Management**: Ability to add deposits to specific goals
- **Comprehensive Overview**: Dashboard showing all savings activity

### Specific Features
- **Add New Financial Goals**
  - Set name, target amount, category, and deadline
  - Automatic persistence to database

- **Track Goal Progress**
  - Progress bar visualization
  - Remaining amount calculation
  - Deadline tracking with warnings

- **Make Deposits**
  - Add funds to specific goals
  - Automatic progress updates

- **Goal Management**
  - Edit goal details (name, target, category, deadline)
  - Delete goals when no longer needed

- **Overview Dashboard**
  - Total goals count
  - Aggregate savings across all goals
  - Completed goals tracking
  - Deadline warnings (30-day threshold)
  - Overdue goal identification

## Technical Implementation

### Backend
- **json-server**: Simulates a REST API
- **Database**: `db.json` file with goals data structure

#### Endpoints:
- `GET /goals` - Fetch all goals
- `POST /goals` - Create new goal
- `PATCH/PUT /goals/:id` - Update existing goal
- `DELETE /goals/:id` - Remove goal

### Frontend
- **React-based application**
- **State management using React hooks**
- **Component-based architecture**

## Data Structure

Goals are stored with the following fields:

```json
{
  "id": "unique-id",
  "name": "Goal name",
  "targetAmount": number,
  "savedAmount": number,
  "category": "string",
  "deadline": "YYYY-MM-DD",
  "createdAt": "YYYY-MM-DD"
}
```

## Setup Instructions

### Prerequisites
- Node.js installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start json-server (run in separate terminal):
```bash
json-server --watch db.json --port 3000
```
4. Start the React application:
```bash
npm start
```

## Usage

### View Goals Dashboard
- All goals are displayed on the main page
- Progress bars show completion status
- Deadline indicators highlight urgency

### Add New Goal
- Click "Add New Goal" button
- Fill in goal details
- Submit to create and persist the goal

### Make Deposit
- Select a goal from the list
- Enter deposit amount
- Submit to update the goal's saved amount

### Edit Goal
- Click edit button on a goal card
- Modify any field
- Save changes to update the database

### Delete Goal
- Click delete button on a goal card
- Confirm removal
- Goal is permanently deleted from the database

## Project Structure

```
/src
  /components
    GoalCard.js       # Individual goal display component
    GoalForm.js       # Form for adding/editing goals
    DepositForm.js    # Form for making deposits
    ProgressBar.js    # Visual progress indicator
    Overview.js       # Dashboard summary component
  App.js             # Main application component
  index.js           # Entry point
/db.json             # Database file
```

## API Endpoints

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | /goals         | Retrieve all goals      |
| POST   | /goals         | Create new goal         |
| PUT    | /goals/:id     | Fully update a goal     |
| PATCH  | /goals/:id     | Partially update a goal |
| DELETE | /goals/:id     | Remove a goal           |

## Testing

The application can be tested by:
- Adding new goals and verifying persistence
- Making deposits and checking progress updates
- Editing goal details to ensure proper updates
- Deleting goals to confirm removal
- Checking deadline warnings and overdue statuses

## Future Enhancements

- User authentication
- Goal categories with icons
- Savings projections and forecasting
- Mobile-responsive design
- Export/import functionality
- Recurring deposit options

## Author

Nimrod Kipngetich

## License
This project is open-source and available under the MIT License.