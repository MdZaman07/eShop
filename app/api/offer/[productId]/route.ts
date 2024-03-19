import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const offer = await prisma.offer.findFirst({
    where: {
      productId: params.productId,
    },
  });

  return NextResponse.json(offer);
}
