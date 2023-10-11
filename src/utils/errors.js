/**
 * creates object
 * @param {number} status status number
 * @param {string} msg msg content
 */
export const createError = (status, msg) => {
  return {
    status,
    msg,
  };
};
