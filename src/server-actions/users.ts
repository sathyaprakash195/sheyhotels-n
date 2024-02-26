"use server";
import { connectMongoDB } from "@/config/db";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs";

connectMongoDB();

export const GetCurrentUserFormMongoDB = async () => {
  try {
    // if the user is already present in the database, return the user
    const clerkUserData = await currentUser();
    const user = await UserModel.findOne({ clerkUserId: clerkUserData?.id });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    // if the user is not present in the database, create a new user

    let newUser = new UserModel({
      name: clerkUserData?.firstName + " " + clerkUserData?.lastName,
      email: clerkUserData?.emailAddresses[0].emailAddress,
      clerkUserId: clerkUserData?.id,
      isActive: true,
      isAdmin: false,
    });

    const savedUser = await newUser.save();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(savedUser)),
    };
  } catch (error: any) {
    return {
      error: error.message,
      success: false,
    };
  }
};
