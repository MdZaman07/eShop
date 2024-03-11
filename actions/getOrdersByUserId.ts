import prisma from "@/libs/prismadb";

export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
      where: {
        userId: userId,
        // status: "completed",
      },
    });
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
