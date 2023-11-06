import express from 'express';
import { Create, deleteUser, getAll, getOne, update } from '../controller/userController.js';

const router = express.Router();

router.post("/create", Create);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteUser);

export default router;

