import Url from "../models/Url.js";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const length = 10;

const generateId = async (id = "") => {
  if (id.length >= length) {
    const isValid = await validateId(id);

    if (isValid.length != 0)
      return generateId(id = "");

    return id;
  }

  const index = Math.floor(Math.random() * characters.length);

  return generateId(id += characters.charAt(index));
}

const validateId = async (id) => await Url.find({ shortener: id });

export default generateId;