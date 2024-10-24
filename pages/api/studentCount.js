import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Get the count of users from the database
      const userCount = await prisma.user.count(); // Fetch only the count
      return res.status(200).json({ count: userCount }); // Respond with the count
    } catch (error) {
      console.error("Error fetching user count:", error);
      return res.status(500).json({ error: "Error fetching user count" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
