"use client";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import React, { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/dist/client/components/navigation";
import queryString from "query-string";
import { Product } from "@/libs/types";

const OfferChoice = ({ products }: { products: Product[] }) => {
  const [selectedOption, setSelectedOption] = useState("all");
  const offeredProducts = products.filter((product) => product.offer);
  const router = useRouter();
  const params = useSearchParams();

  const options = [
    { label: "All Items", value: "all" },
    { label: "Offers", value: "offers" },
  ];

  const handleOptionChange = (event: SelectButtonChangeEvent) => {
    setSelectedOption(event.value);
    if (event.value === "all") {
      router.push("/");
    }
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    if (event.value === "offers") {
      const updatedQuery: any = {
        ...currentQuery,
        hasOffer: true,
      };
      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );
      router.push(url);
    }
  };

  return (
    <div className="mt-5 mb-10 card flex justify-content-center">
      <SelectButton
        value={selectedOption}
        options={options}
        onChange={handleOptionChange}
        className="p-button-rounded p-button-outlined"
      />
    </div>
  );
};

export default OfferChoice;
