export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: number
          title: string
          description: string | null
          due_date: string | null
          owner_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          due_date?: string | null
          owner_id: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          due_date?: string | null
          owner_id?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}