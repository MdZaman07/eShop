import Container from "@/app/components/Container";

import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductsById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}
const Product = async ({ params }: { params: IParams }) => {
  const user = await getCurrentUser();
  const product = await getProductsById(params);

  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;

  // const product = products.find((item) => item.id === params.productId);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
          <div> {product.offer?.name}</div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
