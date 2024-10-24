// pages/api/download.js

import { PrismaClient } from "@prisma/client";
import xlsx from "xlsx";

// Initialize Prisma Client
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch all users from the database
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          referralCode: true,
          phoneNumber: true,
          githubProfile: true,
          linkedinProfile: true,
          purpose: true,
          University: true,
          createdAt: true,
        },
      });

      // Generate Excel file from users data
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(users);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Users");

      // Write Excel file to buffer (so you can send it to the frontend)
      const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

      // Set the response headers for file download
      res.setHeader("Content-Disposition", "attachment; filename=users_data.xlsx");
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      // Send the Excel file to the client
      res.status(200).send(buffer);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to generate Excel file" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
