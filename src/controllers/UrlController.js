import NotFoundError from "../error/NotFoundError.js";
import RequestError from "../error/RequestError.js";
import UnauthorizedError from "../error/UnauthorizedError.js";
import Url from "../models/Url.js";
import { generateDate, verifyDateExpires } from "../utils/expirationDate.js";
import generateId from "../utils/generateId.js";

class UrlController {
  async list(req, res, next) {
    try {
      const urlList = await Url.find();

      return res.status(200).json({ url_list: urlList, code: 200 });
    } catch (error) {
      next(error);
    }
  }

  async generate(req, res, next) {
    try {
      const { url } = req.body;

      if (!url)
        throw new RequestError("Invalid URL.");

      const id = await generateId();

      const date = generateDate();

      await Url.create({ 
        value: url, 
        shortener: id, 
        created_at: date.created_at, 
        expires_in: date.expires_in
      });

      const shortener = `http://localhost:3000/v1/${id}`;

      return res.status(201).json({
        message: "URL successfully generated.",
        code: 201,
        url: shortener
      });
    } catch (error) {
      next(error);
    }
  }

  async access(req, res, next) {
    try {
      const { id } = req.params;

      if (id.length !== 10)
        throw new RequestError("Invalid URL.");

      const url = await Url.find({ shortener: id });

      if (url.length == 0)
        throw new NotFoundError("URL not found.");

      if (verifyDateExpires(url[0].expires_in)) {
        await Url.findByIdAndDelete(url[0].id);

        throw new UnauthorizedError("Expired URL.");
      }

      return res.status(200).json({
        url: url[0].value,
        code: 200
      });
      // return res.status(200).redirect(url[0].value);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;

      if (id.length !== 10)
        throw new RequestError("Invalid ID.");

      const deleted = await Url.findOneAndDelete({ shortener: id });

      if (!deleted)
        throw new NotFoundError("URL not found.");

      return res.status(200).json({
        message: "URL deleted successfully.",
        deleted,
        code: 200
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UrlController();