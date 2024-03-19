import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, description, discount, startDate, endDate, productId } = body;
  console.log(body);

  const offer = await prisma.offer.create({
    data: {
      name,
      description,
      discount: parseFloat(discount),
      startDate: startDate + "T12:00:00Z",
      endDate: endDate + "T12:00:00Z",
      productId: productId,
    },
  });
  return NextResponse.json(offer);
}
