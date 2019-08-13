import express from "express";
import { generate } from "./generate";
const app: any = express;
const router = new app.Router();

router.get("/conversation/:id", async (req: express.Request, res: express.Response) => {
  console.log()
  try {
    const data = await generate(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

export default router;
