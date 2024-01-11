import express from 'express'
import { createLike, createRate, deleteLike, getLikedUserList, getRatedUserList, orderFood } from '../controllers/userControllers.js'

const userRoutes = express.Router()

userRoutes.get("/get-like-user/:userId", getLikedUserList);
userRoutes.get("/get-rate-user/:userId", getRatedUserList);
userRoutes.post("/create-like-res/:userId/:resId", createLike)
userRoutes.delete("/delete-like-res/:userId/:resId", deleteLike)
userRoutes.post("/create-rate/:userId/:resId", createRate)
userRoutes.post("/create-order/:userId/:foodId", orderFood)

export default userRoutes