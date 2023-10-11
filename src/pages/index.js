import HeaderSection from "@/components/header-section/header.section.component";
import ShopsContainer from "@/components/shop-container/shop.container.components";
import { ShopContext, actions } from "@/context/ShopContext";
import { fetchCoffeeShops } from "@/utils/coffee.shop.data.fetch";
import { useUserLocation } from "@/hooks/user.location.hook";
import { Fragment, useContext, useEffect, useState } from "react";
import { createAction } from "@/utils/context.utils";
import Image from "next/image";

export async function getStaticProps() {
  const shopsList = await fetchCoffeeShops();
  return { props: { shopsList } };
}

export default function Home({ shopsList }) {
  const { state, dispatch } = useContext(ShopContext);
  
  const { isLocationFetching, errorMessage, locationFetchHandler } =
    useUserLocation();
  const [nearShops, setNearShops] = useState([]);

  useEffect(() => {
    const mechanic = async () => {
      
      const data = await fetchCoffeeShops(state.location);
      dispatch(createAction(actions.SET_SHOPS, data));
    };
    if (!isLocationFetching && !errorMessage && state.location) {
      mechanic();
    }
  }, [state.location]);

  useEffect(() => {
    setNearShops(state.shops);
  }, [state.shops]);

  const headerBtnHandler = () => {
    locationFetchHandler();
  };
  return (
    <Fragment>
      <Image
        alt="Hero image"
        width={1000}
        height={600}
        src="/hero.svg"
        style={{ position: "fixed" }}
      />
      <HeaderSection
        buttonClickHandler={headerBtnHandler}
        buttonText={isLocationFetching ? "...Loading" : "Find stores near me"}
      />
      {nearShops.length !== 0 && (
        <ShopsContainer shops={nearShops} header={"Shops near you"} key={1} />
      )}
      <ShopsContainer shops={shopsList} header={"Chicago shops"} key={2} />
    </Fragment>
  );
}
