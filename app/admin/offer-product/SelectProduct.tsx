"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateOfferForm from "./create-offer/[productId]/CreateOfferForm";

interface ProductCardProps {
  data: any;
}
const SelectProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter();
  const [isProductSelected, setIsProductSelected] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const productRating =
    data.reviews.reduce((accum: number, item: any) => item.rating + accum, 0) /
    data.reviews.length;
  const handleProductClick = (productId: String) => {
    setIsProductSelected(true);
    router.push(`/admin/offer-product/create-offer/${productId}`);
  };
  return (
    <div
      onClick={() => handleProductClick(data.id)}
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
            alt={data.name}
            src={data.images[0].image}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default SelectProductCard;
