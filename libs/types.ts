import { Image, Offer, Review } from "@prisma/client";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;

  images: Image[];
  reviews: Review[];
  offer?: Offer;
};
