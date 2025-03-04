import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import NMContainer from "@/components/ui/core/NMContainer";

const CartPage = () => {
  return (
    <NMContainer>


      <div className="grid grid-cols-12 gap-8 my-10">
        <CartProducts />
        <Address />
        <PaymentDetails />

      </div>

    </NMContainer>
  );
};

export default CartPage;
