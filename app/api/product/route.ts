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
  const { name, description, price, brand, category, inStock, images } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      brand,
      category,
      inStock,
      images,
      price: parseFloat(price),
    },
  });
  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, inStock, offerId } = body;
  console.log(body);
  let updatedProduct;
  if (offerId) {
    // Update the product's offer field if an offer is provided
    updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        offer: { connect: { id: offerId } }, // Connect the Offer to the Product
      },
    });
    console.log(updatedProduct);
  } else {
    updatedProduct = await prisma.product.update({
      where: { id: id },
      data: { inStock },
    });
  }
  console.log(updatedProduct);
  return NextResponse.json(updatedProduct);
}
