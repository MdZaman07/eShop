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
    <div
      onClick={() => router.push(`/product/${data.id}`)}
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
        {data.offer && (
          <div className="font-bold text-green-500 bg-gray-100 rounded-md px-2 py-1 inline-block">
            Offer!!
          </div>
        )}
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
        <div
          className={`font-semibold ${
            data.offer ? "line-through text-red-500" : ""
          }`}
        >
          {formatPrice(data.price)}
        </div>
        {data.offer && (
          <div className="font-semibold text-green-500">
            {formatPrice(data.price - data.offer.discount)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
