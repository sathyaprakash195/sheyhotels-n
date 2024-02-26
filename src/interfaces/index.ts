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

export interface LotteryType {
  _id: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  drawDateTime: string;
  ticketPrice: number;

  prizes: {
    position: number;
    prizeType: "cash" | "item";
    amount: number;
    itemName: string;
  }[];

  media: string[];

  isActive: boolean;
  winnersDeclared: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TicketType {
  _id: string;
  user: UserType;
  lottery: LotteryType;
  ticketPrice: number;
  ticketNumber: number;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WinnerType {
  _id: string;
  lottery: LotteryType;
  user: UserType;
  ticket: TicketType;
  ticketNumber: number;
  position: number;
  createdAt: string;
  updatedAt: string;
}
