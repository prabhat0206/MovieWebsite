import express from "express";

const router = express.Router();

router.get("/" , (res,req)=>{
    res.json([])
})

export default router;