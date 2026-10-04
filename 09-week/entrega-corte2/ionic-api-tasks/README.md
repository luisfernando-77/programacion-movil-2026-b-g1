# Ionic React Tasks App

Application developed with Ionic React and an Express REST API to manage tasks.

## Technologies

- Ionic React
- React
- TypeScript
- Express
- Node.js
- Fetch API
- React Router
- CORS

## Project structure

```text
ionic-api-tasks
├── api
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── app
│   ├── src
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   └── TaskDetail.tsx
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

## Run the API

Open a terminal inside the `api` folder:

```bash
cd api
node server.js
```

The API runs at:

```text
http://localhost:3000
```

## Run the Ionic app

Open another terminal inside the `app` folder:

```bash
cd app
ionic serve
```

The application runs at:

```text
http://localhost:8100
```

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Returns all tasks |
| GET | `/api/tasks/{id}` | Returns one task by ID |
| POST | `/api/tasks` | Creates a new task |

## Architecture

The backend is implemented with Express and exposes REST endpoints using JSON.
The `GET /api/tasks` endpoint returns the complete list of tasks.
The `GET /api/tasks/:id` endpoint returns the details of a specific task.
The `POST /api/tasks` endpoint receives JSON data and creates a new task.
The Ionic React application consumes these endpoints using the Fetch API.
The Home screen uses `useState` to manage tasks, form values, and error messages.
The application also handles network errors when the Express API is unavailable.
React Router is used to navigate from the task list to the task detail screen.

## Main features

- List tasks from the Express API.
- Create new tasks from Ionic React.
- Use `useState` to manage application state.
- Consume the API with `fetch`.
- Handle network errors.
- Navigate to a task detail screen.

## Example task

```json
{
  "title": "Create Ionic app",
  "description": "Build the task list screen"
}
```

## Tests

The API was tested using Postman.

A successful POST request returned:

```text
201 Created
```

The Ionic application was tested by creating a task directly from the form.

The navigation to the task detail screen was verified successfully.

Network error handling was tested by stopping the Express API and confirming the following message:

```text
Could not connect to the API
```