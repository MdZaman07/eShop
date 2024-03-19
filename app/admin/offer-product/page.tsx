// "use client";
import getProducts, { IProductParams } from "@/actions/getProducts";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ProductCard from "@/app/components/products/ProductCard";
import React, { useState } from "react";
import SelectProductCard from "./SelectProduct";
import { useRouter } from "next/navigation";

interface OfferProductProps {
  searchParams: IProductParams;
}

const OfferProduct = async ({ searchParams }: OfferProductProps) => {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title="Oops! No products found,Click 'All' to clear filters" />
    );
  }

  return (
    <div className="p-8">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product: any) => {
            return (
              <div key={product.id}>
                <SelectProductCard data={product} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default OfferProduct;
