import express from 'express'
import { getLikedResList, getRatedResList } from '../controllers/restaurantControllers.js';

const restaurantRoutes = express.Router();

restaurantRoutes.get("/get-like-restaurant/:restaurantId", getLikedResList)
restaurantRoutes.get("/get-rate-restaurant/:restaurantId", getRatedResList)

export default restaurantRoutes