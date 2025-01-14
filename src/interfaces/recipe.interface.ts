export interface Recipe {
  id?: string;
  title: string;
  description: string;
  user_id: string;
  category: string;
  updatedAt?: Date;
  createdAt?: Date;
}
