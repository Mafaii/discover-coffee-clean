import { fetchCoffeeShops } from "@/utils/coffee.shop.data.fetch";
import { createError } from "@/utils/errors";

/**
 * fetch data for position
 * @param {Request} req
 * @param {Response} res
 */
export default async function (req, res) {
  if (req.method !== "GET")
    return res.status(405).json(createError(405, "Incorrect method"));
  try {
    const { langLat } = req.query;
    const results = await fetchCoffeeShops(langLat);
    res.json(results);
  } catch (error) {
    res.status(500).json(createError(500, "Server error"));
  }
}
