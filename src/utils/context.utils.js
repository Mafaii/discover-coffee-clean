export const createAction = (type, payload) => {
  return { type, payload };
};

export const simplifyObject = (rawObject) => {
  return {
    id: rawObject.fsq_id,
    name: rawObject.name,
    categories: rawObject.categories,
    timezone: rawObject.timezone,
    address: rawObject.location
  }
}