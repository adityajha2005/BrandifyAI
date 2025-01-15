import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/configs/FirebaseConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userEmail, userName } = await req.json();
        
        if (!userEmail || !userName) {
            return NextResponse.json(
                { error: "Email and name are required" }, 
                { status: 400 }
            );
        }

        const docRef = doc(db, "users", userEmail);
        
        try {
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("User exists:", docSnap.data());
                return NextResponse.json(docSnap.data());
            } else {
                const userData = {
                    name: userName,
                    email: userEmail,
                    credits: 20,
                    createdAt: new Date().toISOString()
                };
                
                await setDoc(docRef, userData);
                console.log("New user created:", userData);
                return NextResponse.json(userData);
            }
        } catch (firebaseError) {
            console.error("Firebase operation failed:", firebaseError);
            return NextResponse.json(
                { error: "Database operation failed" }, 
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Request processing failed:", error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}