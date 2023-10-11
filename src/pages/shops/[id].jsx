import { fetchCoffeeShops } from "@/utils/coffee.shop.data.fetch";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/context/ShopContext";
import { isEmpty } from "@/utils/object.utils";
import { createPayload } from "@/utils/airtable";
import StoreDetails from "@/components/store-details/store.details.component";

//props that will be used to generate static pages (eg. predefinied)
export async function getStaticProps(props) {
  const {
    params: { id },
  } = props;
  const data = await fetchCoffeeShops();
  const foundStore = data.find((el) => el.id === id);
  return {
    props: { store: foundStore ? foundStore : {} },
  };
}

//static paths eg. paths that will be created on build , all other will go to fallback which will try context then try datbase
export async function getStaticPaths() {
  const data = await fetchCoffeeShops();
  const paths = data.map((el) => {
    return {
      params: {
        id: el.id,
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
}

// COMPONENT
export default function ({ store }) {
  const router = useRouter();
  /* this if is providing with fallback page (eg. page that will be shown while server is fetching new data)
  //     but with it all content is CRS
  //     and without is even if store is empty then "basic" content is pre-rendered
  // */
  // // if (router.isFallback) {
  // //   return <Loading />;
  // // }

  const id = router.query.id;

  const { state } = useContext(ShopContext);

  const [currentStore, setCurrentStore] = useState(store || {});

  if (isEmpty(currentStore) && state.shops.length > 0) {
    //if no store then try to get one from context
    const foundShop = state.shops.find((el) => el.id === id);
    if (foundShop) setCurrentStore(foundShop);
  }

  const persistStoreToDatabase = async (store) => {
    // create payload
    const payload = createPayload(
      store.id,
      store.name,
      0,
      JSON.stringify(store.address),
      JSON.stringify(store.categories)
    );
    // send request
    const res = await fetch("/api/createStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  const getStoreFromDatabase = async (id) => {
    // send request
    const storeResponse = await fetch(`/api/getStoreById?id=${id}`);
    // get data
    const store = await storeResponse.json();
    const deserialized = {
      ...store,
      address: JSON.parse(store.address),
      categories: JSON.parse(store.categories),
    };
    // set store
    setCurrentStore(deserialized);
  };
  const upvoteUpdate = async () => {
    await fetch("/api/updateStore", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };

  useEffect(() => {
    if (!isEmpty(currentStore)) {
      //create store
      persistStoreToDatabase(currentStore);
    } else if (id) {
      //try to get store from database
      getStoreFromDatabase(id);
    }
  }, [currentStore, id]);
  

  return <StoreDetails {...currentStore} handleUpVote={upvoteUpdate} />;
}
