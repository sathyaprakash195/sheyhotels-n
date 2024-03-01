export interface UserType {
  _id: string;
  name: string;
  email: string;
  clerkUserId: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HotelType {
  _id: string;
  name: string;
  location: string;
  email: string;
  phoneNumber: string
  createdBy: string | UserType;
  isActive: boolean;
  media: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomType {
  _id: string;
  name: string;
  type: string;
  rentPerDay: number;
  bedrooms: number;
  maxCapacity: number;
  hotel:  HotelType;
  createdBy: string | UserType;
  isActive: boolean;
  media: string[];
  createdAt: string;
  updatedAt: string;
}