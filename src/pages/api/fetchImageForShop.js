import { fetchImageForShop } from "@/utils/coffee.shop.data.fetch";
import { createError } from "@/utils/errors";

export default async function fetchImage(req, res) {
  if (req.method !== "GET")
    res.status(405).json(createError(405, "Incorrect Method"));
  try {
    const { id } = req.query;
    const response = await fetchImageForShop(id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(createError(500,"Server error"));
  }
}
