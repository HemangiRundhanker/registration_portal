// pages/api/register.js
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, phoneNumber, email, university, purpose, referral, github } =req.body;
    try {
      // Create user in the database
      const user = await prisma.user.create({
        data: {
          name,
          phoneNumber,
          email: email,
          University:university,
          purpose:purpose,
          referralCode:referral,
          githubProfile:github
        },
      });
      return res.status(201).json(user); // Respond with the created user
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
