export const regularExps = {
  // email
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  // phone
  phone: /^[0-9]{9,9}$/,
  //row
  row: /^[A-Z]{1,1}$/,
  //dateTime (ISO 8601 format)
  isoDate: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z?$/,
  movieStatus: /^(active|inactive)$/,
};
