import { images } from "../../next.config";
import { simplifyObject } from "./context.utils";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

/**
 * create link for places near specified location
 * @param {{query:string,langLat:string,limit:number}} param - object with query params
 * @returns url to foursquare places api
 */
export function createUrlList({ query, langLat, limit }) {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${langLat}&limit=${limit}`;
}

/**
 * create link for images api of foursquares.
 * @param {string} fsq_id id from response from places api
 * @returns {string} url to foursquare places api
 */
export function createUrPhoto(fsq_id) {
  return `https://api.foursquare.com/v3/places/${fsq_id}/photos`;
}
/**
 * reads photoData and then it creates links (array) to image.
 * In this api images are created as: prefix +'original'+suffix
 * @param {[photoData]} photos - array of photos from foursquare api
 * @returns {string[]}
 */
function createImagesArray(photos) {
  return photos.map(
    (photoData) => `${photoData.prefix}original${photoData.suffix}`
  );
}

export async function fetchCoffeeShops(langLat = "41.8781,-87.6298") {
  try {
    const response = await fetch(
      createUrlList({ query: "coffee", limit: 10, langLat }),
      options
    );
    const data = await response.json();
    const convertedData = data.results.map((el) => simplifyObject(el));

    return convertedData;
  } catch (err) {
    console.log("error", err);
  }
}

export async function fetchImageForShop(shopId) {
  try {
    const url = createUrPhoto(shopId);
    const response = await fetch(url, options);
    const data = await response.json();

    const images = createImagesArray(data);
    return images;
  } catch (err) {
    console.log("error", err);
  }
}
