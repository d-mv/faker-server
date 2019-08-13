import express from "express";
import { generate } from "./generate";
const app: any = express;
const router = new app.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const data = generate();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

export default router;
