import { ShopContext, actions } from "@/context/ShopContext";
import { createAction } from "@/utils/context.utils";
import { useContext, useState } from "react";


export const useUserLocation = () => {
  const [isLocationFetching, setIsLocationFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { dispatch } = useContext(ShopContext);

  //location fetch options
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //success handler
  function handleLocationFetchSuccess(pos) {
    const { latitude, longitude } = pos.coords;

    //dispatch action with setting state
    dispatch(createAction(actions.SET_LOCATION, `${latitude},${longitude}`));

    //set isLocationFetching to false => finished fetching
    setIsLocationFetching(false);
    setErrorMessage("");
  }

  //failre handler
  function handleLocationFetchFailure(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    //set isLocationFetching to false => finished fetching
    setIsLocationFetching(false);
    setErrorMessage("Couldn't fetch location");
  }

  function locationFetchHandler() {
    setIsLocationFetching(true);
    if (!navigator.geolocation) {
      setIsLocationFetching(false);
      setErrorMessage("Couldn't fetch location");
    } else {
      //location fetch
      const location = navigator.geolocation.getCurrentPosition(
        handleLocationFetchSuccess,
        handleLocationFetchFailure,
        options
      );
    }
  }

  return {
    isLocationFetching,
    errorMessage,
    locationFetchHandler,
  };
};
