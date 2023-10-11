import { getConnection, getShopById } from "@/utils/airtable";
import { createError } from "@/utils/errors";
import { isEmpty } from "@/utils/object.utils";


/**
 *
 * @param {Request} req must be POST method
 * @param {Response} res
 */
export default async function createStore(req, res) {
  // check if post
  if (req.method !== "POST")
    return res
      .status(405)
      .json(createError(405, "Wrong Method, Please change to POST"));

  // we are sure it is POST

  /// we can get data
  const payload = req.body;
  // if body empty return error
  if (isEmpty(payload) || !payload.id)
    return res
      .status(400)
      .json(createError(400, "Empty object, please add data to body."));

  // first lets check if such object (coffee shop) exists in database
  /// if yes then we dont create it
  const id = payload.id;
  try {
    const fromDatabase = await getShopById(id);
    if (fromDatabase.length > 0)
      return res.status(200).json(fromDatabase[0].fields);

    //else we need to create it
    getConnection().create([
      {
        fields: {
          ...payload,
        },
      },
    ]);
    return res.status(200).json(payload);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json(createError(500, "Server error"));
  }
}
