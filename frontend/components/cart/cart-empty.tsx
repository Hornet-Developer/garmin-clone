import { useRouter } from "next/router";
import { Button } from "./styles";

const CartEmpty = () => {
  const router = useRouter();
  return (
    <div className="p-4 max-w-[960px] mx-auto">
      <h2 className="my-4 text-2xl font-medium tracking-wide">
        Your Cart is Empty
      </h2>
      <Button
        color="black"
        border="black"
        bg="white"
        onClick={() => router.push("/")}
      >
        start shopping
      </Button>
    </div>
  );
};

export default CartEmpty;
