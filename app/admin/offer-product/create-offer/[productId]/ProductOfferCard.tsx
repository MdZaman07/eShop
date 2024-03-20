"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}
const ProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter();
  const productRating =
    data.reviews.reduce((accum: number, item: any) => item.rating + accum, 0) /
    data.reviews.length;
  return (
    <div className=" col-span-1 border-[1,2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition text-center text-sm ">
      <div
        className="
      flex
      flex-col
      items-center
   
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

export default ProductCard;
