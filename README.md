# Task Manager

This is a Task Manager application built with React.js and Supabase. It allows users to sign up, log in, and manage their tasks.

## Features

- User authentication (sign up and log in)
- Create, edit, and delete tasks
- Search tasks
- Responsive design

## Requirements

- Node.js
- Supabase account and project

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/umairism/TaskManager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

- Create a Supabase account at [supabase.io](https://supabase.io)
- Create a new project
- Get your Supabase URL and API key from the project settings

### 4. Configure environment variables

Create a `.env` file in the root of the project and add your Supabase credentials:

```env
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Run the application

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

### Sign Up

- Go to the sign-up page and create a new account.
- You will receive a confirmation email. Confirm your email to activate your account.

### Log In

- Go to the login page and enter your credentials.
- After logging in, you will be redirected to the dashboard.

### Manage Tasks

- Create, edit, and delete tasks from the dashboard.
- Use the search bar to filter tasks by title.

## Note

This application requires access to a backend database (Supabase) to function correctly. Ensure you have set up and configured your Supabase project as described above.

## License

This project is licensed under the MIT License.
"# Task_manager" 
