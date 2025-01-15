import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/configs/FirebaseConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { userEmail, userName } = await req.json();
    
    if (!userEmail || !userName) {
        return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }

    try {
        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("User exists:", docSnap.data());
            return NextResponse.json(docSnap.data());
        } else {
            const data = {
                name: userName,
                email: userEmail,
                credits: 20,
                createdAt: new Date().toISOString()
            };
            
            await setDoc(doc(db, "users", userEmail), data);
            console.log("New user created:", data);
            return NextResponse.json(data);
        }
    } catch (e) {
        console.error("Firebase error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}