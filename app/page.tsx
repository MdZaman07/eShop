import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { useState } from "react";
import OfferChoice from "./components/OfferChoice";
import { Image, Offer, Review } from "@prisma/client";

interface HomeProps {
  searchParams: IProductParams;
}
// export type Product = {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   brand: string;
//   category: string;
//   inStock: boolean;

//   images: Image[];
//   reviews: Review[];
//   offer?: Offer;
// };

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title="Oops! No products found,Click 'All' to clear filters" />
    );
  }
  //Fisher-Yates shuffle algorithm

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const shuffledProducts = shuffleArray(products);
  const options = [
    { label: "All Items", value: "all" },
    { label: "Offers", value: "offers" },
  ];
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="flex justify-center mb-8">
          <OfferChoice products={shuffledProducts} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return (
              <div key={product.id}>
                <ProductCard data={product} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
