import getProductsById from "@/actions/getProductById";
import ProductCard from "@/app/components/products/ProductCard";
import React from "react";
import CreateOfferForm from "./CreateOfferForm";

interface IParams {
  productId?: string;
}

const CreateOffer = async ({ params }: { params: IParams }) => {
  const product = await getProductsById(params);

  return (
    <div className="p-8">
      <div className="flex justify-center items-center w-80 h-80">
        <ProductCard data={product} />

        <CreateOfferForm product={product} />
      </div>
    </div>
  );
};

export default CreateOffer;
