import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartTotalDiscount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, SetCartTotalAmount] = useState(0);
  const [cartTotalDiscount, setCartTotalDiscount] = useState(0);
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        console.log("hello");
        updatedCart = [...prev, product];
      } else {
        console.log("hi");
        updatedCart = [product];
      }

      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      console.log(updatedCart);
      return updatedCart;
    });
    toast.success("Product added to cart");
  }, []);

  useEffect(() => {
    const getTotals = () => {
      let totalDiscount = 0;
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            if (item.offeredPrice && item.discount) {
              const itemTotal = item.offeredPrice * item.quantity;
              acc.total += itemTotal;
              totalDiscount += item.discount * item.quantity;
              acc.qty += item.quantity;
            } else {
              const itemTotal = item.price * item.quantity;
              acc.total += itemTotal;
              acc.qty += item.quantity;
            }

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalDiscount(totalDiscount);
        setCartTotalQty(qty);
        SetCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProducts);
        toast.success("Product removed");
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );
  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 99) {
        return toast.error("Ooops! Maximum reached");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex !== -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        console.log("hii");
        console.log(updatedCart);
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleCartQtyDecrease = (product: CartProductType) => {
    let updatedCart;
    if (product.quantity === 1) {
      return toast.error("Ooops! Minimum reached");
    }
    if (cartProducts) {
      updatedCart = [...cartProducts];
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex !== -1) {
        updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
          .quantity;
      }
      setCartProducts(updatedCart);
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
    }
  };

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback((value: string | null) => {
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(value));
  }, []);
  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartTotalDiscount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };
  return <CartContext.Provider value={value} {...props} />;
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
