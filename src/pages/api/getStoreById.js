import { getConnection, getShopById } from "@/utils/airtable";
import { createError } from "@/utils/errors";

/**
 * returns store by provided in query id
 * @param {Request} req should have query: '?id=[insert item id here]'
 * @param {Response} res
 * @returns Response
 */
export default async function getStoreById(req, res) {
  try {
    // get id from query
    const id = req.query.id;
    if (!id)
      return res
        .status(400)
        .json(createError(400, "No Query Param. Please add param as: ?id="));
    // select element with id
    const reponses = await getShopById(id);
    // if empty
    if (reponses.length === 0)
      return res.status(404).json(createError(404, "No Coffee Shop Found"));

    // if all ok return json with first object
    return res.json(reponses[0].fields);
  } catch (error) {
    console.log("error", error);
    // assume server error
    res.status(500);
    res.json(createError(500, "Internal Error"));
  }
}
