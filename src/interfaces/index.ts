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
  address: string;
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
  roomType: string;
  rentPerDay: number;
  hotel: string | HotelType;
  createdBy: string | UserType;
  isActive: boolean;
  media: string[];
  createdAt: string;
  updatedAt: string;
}