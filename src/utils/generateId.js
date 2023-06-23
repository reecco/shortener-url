import Url from "../models/Url.js";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const length = 10;

const generateId = async (sequence = "") => {
  if (sequence.length >= length) {
    const isValid = await validateId(sequence);
    
    if (isValid.length != 0)
      return generateId(sequence += characters.charAt(index));

    return sequence;
  }

  const index = Math.floor(Math.random() * characters.length);

  return generateId(sequence += characters.charAt(index));
}

const validateId = async (id) => await Url.find({ shortener: id });

export default generateId;