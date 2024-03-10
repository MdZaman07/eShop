import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getUsers from "@/actions/getUsers";
import getOrders from "@/actions/getOrders";
import Container from "../components/Container";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} users={users} orders={orders} />
      </Container>
    </div>
  );
};

export default Admin;
