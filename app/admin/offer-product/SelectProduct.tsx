"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
// import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/libs/types";
import CreateOfferForm from "./create-offer/[productId]/CreateOfferForm";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}
const SelectProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const productRating =
    product.reviews.reduce(
      (accum: number, item: any) => item.rating + accum,
      0
    ) / product.reviews.length;
  const handleProductClick = (product: any) => {
    if (product.offer) {
      toast.error("Product already has an offer");
      return;
    }
    setIsProductSelected(true);
    router.push(`/admin/offer-product/create-offer/${product.id}`);
  };
  return (
    <div
      onClick={() => handleProductClick(product)}
      className="col-span-1 cursor-pointer border-[1,2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm "
    >
      <div
        className="
      flex
      flex-col
      items-center
      w-full
      gap-1"
      >
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            alt={product.name}
            src={product.images[0].image}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(product.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{product.reviews.length} reviews</div>
        <div
          className={`font-semibold ${
            product.offer ? "line-through text-red-500" : ""
          }`}
        >
          {formatPrice(product.price)}
        </div>
        {product.offer && (
          <div className="font-semibold text-green-500">
            {formatPrice(product.price - product.offer.discount)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectProductCard;
