/*
  # Create tasks table and security policies

  1. New Tables
    - `tasks`
      - `id` (serial primary key)
      - `title` (text, required)
      - `description` (text)
      - `due_date` (timestamp with time zone)
      - `owner_id` (uuid, references auth.users)
      - `status` (text, default: 'pending')
      - `created_at` (timestamp with time zone, default: now())

  2. Security
    - Enable RLS on `tasks` table
    - Add policies for:
      - Users can read their own tasks
      - Admins can read all tasks
      - Users can insert their own tasks
      - Users can update their own tasks
      - Users can delete their own tasks
      - Admins can manage all tasks
*/

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text,
  due_date timestamptz,
  owner_id uuid REFERENCES auth.users(id) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Admins can read all tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

CREATE POLICY "Users can insert own tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Admins can manage all tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );