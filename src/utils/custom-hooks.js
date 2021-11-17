import * as react from "react";

/******************************************
 * Simple input manager.
 * @param {string} name
 * @returns {object}
 *   {string} value
 *   {function} onChange
 *   {name} name
 */
export const useInput = (name) => {
  const [value, setValue] = react.useState("");

  const onChange = ({ target: { value } }) => setValue(value);

  return { value, onChange, name };
};
