import { NextResponse } from "next/server";

import { z } from "zod";
import bcrypt from "bcryptjs"

import { dbConnect } from "@/libs/dbConnect";
import Admin from "@/models/Admin.modal";

const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
  });

export async function POST(req: Request){
    try {
       await dbConnect()

       const body = await req.json();
        const {email, password} = UserSchema.parse(body)

        const username = email.split("@")[0];

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword
        })

        await newAdmin.save();

        return NextResponse.json({
            message: "Admin Created", 
            username
        }, {status: 201})

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
          }
          console.error('Error creating user:', error);
          return NextResponse.json({ message: 'Error while creating Admin' }, { status: 500 });
        }
    }