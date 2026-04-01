Kanban Board (MEVN Stack)
A full-stack draggable Kanban Board built using MongoDB, Express.js, Vue.js 3, and Node.js.

 Features
- Add tasks with title & description
- Drag & Drop tasks between:
  - To Do
  - In Progress
  - Done
- Edit task (modal popup)
- Delete task
- Task count per column
- Data stored in MongoDB Atlas

 Tech Stack

- Frontend: Vue.js 3 (Composition API), Tailwind CSS, vuedraggable
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- HTTP Client: Axios

 Project Structure

 Kanban-board/
│
├── Backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── Frontend/
│ ├── src/
│ ├── App.vue
│ ├── api.js
│ ├── package.json
│
└── .gitignore
└── README.md

Backend Implementation
The backend of this application is built using **Node.js and Express.js**, and it connects to **MongoDB Atlas** using Mongoose.

 Server Setup
- Express is used to create the server
- Middleware used:
  - `cors` → to allow cross-origin requests
  - `express.json()` → to parse JSON request bodies
- Environment variables are managed using `.env`

The server connects to MongoDB using:
mongoose.connect(process.env.MONGO_URI)

Once connected, the server runs on the defined port.

 Database Schema (Mongoose)
A `Task` model is created with the following fields:

- `title` (String, required)
- `description` (String, optional)
- `status` (String: "todo", "inprogress", "done")

API Routes
All routes are defined in `routes/taskRoutes.js` and prefixed with `/api`.

1. Create Task
- **POST /api/tasks**
- Creates a new task in MongoDB

2. Get All Tasks
- **GET /api/tasks**
- Fetches all tasks from the database

3. Update Task
- **PATCH /api/tasks/:id**
- Updates task fields (used for:
  - editing task
  - drag & drop status change)

4. Delete Task
- **DELETE /api/tasks/:id**
- Deletes a task from MongoDB

 Backend Role in Drag & Drop
- When a task is dragged to another column:
  - Frontend sends a PATCH request with updated `status`
  - Backend updates the task in MongoDB
  - Updated data is returned to frontend

 Environment Variables
The backend uses a `.env` file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Notes
- MongoDB Atlas is used as a cloud database
- Error handling is implemented using try-catch blocks
- All APIs return JSON responses


Frontend Implementation
The frontend is built using **Vue.js 3 (Composition API)** with **Tailwind CSS** for styling and **vuedraggable** for drag-and-drop functionality.

 API Integration
Axios is used to communicate with the backend.
const API = axios.create({
baseURL: "http://localhost:5000/api",
});

All API requests (GET, POST, PATCH, DELETE) are made using this instance.

State Management (Composition API)
Vue 3 Composition API is used with `ref()` for managing state:
- `tasks` → stores all tasks
- `todoTasks`, `progressTasks`, `doneTasks` → categorized tasks
- `title`, `description` → form inputs
- `editTaskData` → data for editing
- `showEditModal` → modal visibility

 Data Fetching
- On component mount (`onMounted`), tasks are fetched from backend
- Tasks are filtered into 3 categories based on status:
  - `todo`
  - `inprogress`
  - `done`

 Create Task
- User enters title and description
- On clicking **Add**, a POST API is called: POST /tasks
- Task is stored in MongoDB and UI refreshes

Edit Task
- Clicking edit button opens a modal
- User updates title/description
- PATCH API is called: PATCH /tasks/:id

Delete Task
- Clicking delete button removes task
- DELETE API is called: DELETE /tasks/:id

Drag & Drop Functionality
- Implemented using **vuedraggable**
- Tasks can be moved between columns:
  - To Do
  - In Progress
  - Done

When a task is dropped:
- `onDrop()` function triggers
- Sends PATCH request to update task status
PATCH /tasks/:id
- UI is refreshed after update

UI & Styling
- Tailwind CSS is used for styling
- Responsive layout using grid system
- Glassmorphism UI design (blur, transparency)
- Dynamic task count displayed in each column

Responsiveness
- Works on both mobile and desktop
- Grid layout adapts based on screen size

Key Highlights
- Real-time UI updates after every operation
- Clean separation of concerns (API, UI, state)
- Reusable logic using Composition API
- Smooth drag-and-drop user experience
