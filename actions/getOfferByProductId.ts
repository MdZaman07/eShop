import prisma from "@/libs/prismadb";

export default async function getOfferByProductId(productId: string) {
  try {
    const offer = await prisma.offer.findMany({
      where: {
        productId: productId,
      },
    });
    return offer;
  } catch (error: any) {
    throw new Error(error);
  }
}
