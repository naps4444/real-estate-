import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { firstname, lastname, email, password } = req.body;

        // Validate input fields
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log('Firstname:', firstname, 'Lastname:', lastname);

        try {
            console.log("Connecting to database...");
            await dbConnect();
            console.log("MongoDB connected successfully");

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            // Hash the password with a higher salt round
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Creating new user...");

            const newUser = await User.create({ firstname, lastname, email, password: hashedPassword });
            console.log("New User Created", newUser);

            res.status(201).json({
                message: "User registered successfully",
                user: { firstname, lastname, email } // Return without password for security
            });

        } catch (error) {
            console.error("Error details", error);
            res.status(500).json({
                message: "Internal server error",
                error: process.env.NODE_ENV === "development" ? error.message : undefined
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
