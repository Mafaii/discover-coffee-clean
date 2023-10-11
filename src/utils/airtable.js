import Airtable from "airtable";

export function getConnection() {
  //set connection
  const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESKEY }).base(
    "appFasork8iBmVKZJ"
  );
  //connect to table
  const table = base(process.env.TABLE_NAME);
  return table;
}
export async function getShopById(id) {
  const reponses = await getConnection()
    .select({
      filterByFormula: `{id}='${id}'`,
    })
    .firstPage();
  return reponses;
}

export const createPayload = (id, name, votes, address, categories) => {
  return {
    id,
    name,
    votes,
    address,
    categories,
  };
};
