import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
  hasOffer?: boolean;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm, hasOffer } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (category) {
      query.category = category;
    }
    // if (searchString) {
    //   query.name = {
    //     contains: searchString,
    //     mode: "insensitive",
    //   };
    // }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
        offer: params.hasOffer
          ? {
              isNot: null,
            }
          : undefined,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
        offer: true,
      },
    });
    console.log("query", query);
    console.log("searchTerm", searchTerm);
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
