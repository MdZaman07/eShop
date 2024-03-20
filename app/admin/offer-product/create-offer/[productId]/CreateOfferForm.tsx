"use client";
import getOfferByProductId from "@/actions/getOfferByProductId";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { Product } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import prisma from "@/libs/prismadb";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateOfferForm = ({ product }: { product: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOfferCreated, setIsOfferCreated] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      discount: 0,
      startDate: new Date().toISOString().split("T")[0] + "T12:00:00Z",
      endDate: new Date().toISOString().split("T")[0] + "T12:00:00Z",
      productId: "",
    },
  });
  useEffect(() => {
    if (isOfferCreated) {
      reset();

      setIsOfferCreated(false);
    }
  }, [isOfferCreated]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    let offer = { ...data, productId: product.id };

    axios
      .post("/api/offer", offer)
      .then(() => {
        toast.success("Offer created");
        // setIsOfferCreated(true);
        // router.refresh();
      })
      .catch((error) => {
        toast.error("Error creating offer");
      })
      .finally(async () => {
        const offered = await axios.get(`/api/offer/${product.id}`);
        console.log(offered.data);

        await axios
          .put("/api/product", {
            id: product.id,
            offerId: offered.data.id,
          })
          .then(() => {
            toast.success("Product added to offer");

            setIsOfferCreated(true);
            router.refresh();
          })
          .catch((error) => {
            toast.error("Error adding Product to offer");
          })
          .finally(() => {
            setIsLoading(false);
            setTimeout(() => {
              router.push("/admin/offer-product");
            }, 1000);
            //here
          });
      });

    //add offer to product
  };
  return (
    <>
      <Heading title="Create Offer" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="discount"
        label="Discount"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="startDate"
        label="Start Date"
        type="date"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="endDate"
        label="End Date"
        type="date"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Create Offer"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default CreateOfferForm;

// axios
// .put("/api/product", {
//   id: product.id,
//   offer: offered,
// })
// .then((res) => {
//   toast.success("Product offer has changed");
//   router.refresh();
// })
// .catch((err) => {
//   toast.error("Oops!Something went wrong");
//   console.log(err);
// });
