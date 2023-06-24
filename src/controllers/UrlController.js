import NotFoundError from "../error/NotFoundError.js";
import RequestError from "../error/RequestError.js";
import Url from "../models/Url.js";
import generateId from "../utils/generateId.js";

class UrlController {
  async list(req, res, next) {
    try {
      const urlList = await Url.find();

      if (urlList.length == 0)
        throw new NotFoundError("URL not found.");

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

      await Url.create({ value: url, shortener: id, timestamp: Date.now() });

      const shortener = `http://localhost:3000/${id}`;

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

      if (!id)
        throw new RequestError("Invalid URL.");

      const url = await Url.find({ shortener: id });

      if (url.length == 0)
        throw new NotFoundError("URL not found.");

      return res.status(200).json({ url: url[0].value });
      // return res.status(200).redirect(url[0].value);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    const { id } = req.params;

    try {
      if (!id)
        throw new RequestError("Invalid ID.");

      const result = await Url.findOneAndDelete({ shortener: id });

      return res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }
}

export default new UrlController();