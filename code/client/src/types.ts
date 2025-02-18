export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    notes?: Note[];
}

export interface Note {
    id: number;
    content: string;
    createdAt: string;
  }
