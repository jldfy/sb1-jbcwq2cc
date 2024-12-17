import { User } from '../types';
import { mockUsers } from '../data/mockUsers';

export async function login(email: string, password: string): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  return user;
}

export async function logout(): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
}