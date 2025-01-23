import { NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  // Extract and parse the Authorization header for username and password
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Decode Basic Auth credentials
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  // Validate credentials
  const isValidUser = verifyCredentials(username, password);

  if (!isValidUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch analytics data from Sanity
  try {
    const salesByCategory = await client.fetch(`
      *[_type == "orders"] {
        "name": items[0].product->category->title,
        "value": sum(items[].price * items[].quantity)
      } | group by name | { name, value: sum(value) }
    `);

    const ordersByMonth = await client.fetch(`
      *[_type == "orders"] {
        "month": dateTime(createdAt).month + "-" + dateTime(createdAt).year
      } | group by month | { name: month, orders: count() } | order(name asc)
    `);

    return NextResponse.json({
      salesByCategory,
      ordersByMonth,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
