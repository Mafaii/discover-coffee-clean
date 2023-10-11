import { getConnection, getShopById } from "@/utils/airtable";
import { createError } from "@/utils/errors";
import { isEmpty } from "@/utils/object.utils";


/**
 * updates store vote
 * @param {Request} req shoud be PUT
 * @param {Response} res
 */
export default async function updateStoreVote(req, res) {
  // check if it is PUT
  if (req.method !== "PUT")
    return res
      .status(405)
      .json(createError(405, "Wrong Method. Please Use PUT"));

  // check payload and if id provided
  const payload = req.body;
  if (isEmpty(payload) || !payload.id)
    return res
      .status(400)
      .json(
        createError(
          400,
          "Request body cannot be empty, please specify id(required"
        )
      );
  // for provided id update vote by +1
  const fromDatabase = await getShopById(payload.id);
  if (fromDatabase.length === 0)
    return res.status(404).json(createError("404", "Coffee Shop not found"));
  
  // read fields
  const data = fromDatabase[0].fields;

  const newVote = data.votes + 1;

  //update
  try {
    const result = await getConnection().update(fromDatabase[0].id, {
      votes: newVote,
    });
    return res.json(result.fields);
  } catch (error) {
    console.log("error",error);
    res.status(500).json(createError(500, "Server error"));
  }
}
