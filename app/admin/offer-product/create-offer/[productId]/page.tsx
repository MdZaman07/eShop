import getProductsById from "@/actions/getProductById";
import ProductCard from "@/app/components/products/ProductCard";
import React from "react";
import CreateOfferForm from "./CreateOfferForm";
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import ProductOfferCard from "./ProductOfferCard";

interface IParams {
  productId?: string;
}

const CreateOffer = async ({ params }: { params: IParams }) => {
  const product = await getProductsById(params);

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <ProductOfferCard data={product} />

          <CreateOfferForm product={product}></CreateOfferForm>
        </FormWrap>
      </Container>
    </div>
  );
};

export default CreateOffer;
