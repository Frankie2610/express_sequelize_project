import { log } from "console";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js"

const conn = initModels(sequelize)

// API likeList based on user
const getLikedUserList = async (req, res) => {
    let { userId } = req.params;
    try {
        let data = await conn.users.findOne({
            include: [
                {
                    model: conn.like_res,
                    as: "like_res"
                }
            ],
            where: {
                user_id: userId
            }

        })
        if (!data) {
            res.status(404).send("The user does not exist!")
            return
        }
        res.send(data);
    } catch (error) {
        res.send(`BE error: ${error}`)

    }
}

// API rateList based on user
const getRatedUserList = async (req, res) => {
    let { userId } = req.params;
    try {
        let data = await conn.users.findOne({
            include: [
                {
                    model: conn.rate_res,
                    as: "rate_res"
                }
            ],
            where: {
                user_id: userId
            }
        })
        if (!data) {
            res.status(404).send("The user does not exist!")
            return
        }
        res.send(data)
    } catch (error) {
        res.send(`BE error: ${error}`)
    }
}

// API user like
const createLike = async (req, res) => {
    let { userId, resId } = req.params
    try {
        let data = await conn.like_res.findOne({
            where: {
                user_id: userId,
                res_id: resId
            }
        })
        if (!data) {
            let newLike = {
                user_id: userId,
                res_id: resId,
                date_like: new Date()
            }
            await conn.like_res.create(newLike);
            res.status(201).send("Your like has recorded successfully!")
        } else {
            res.status(400).send("You have already like this restaurant!")
        }

    } catch (error) {
        res.send(`BE error: ${error}`)
    }
}

// API user unlike
const deleteLike = async (req, res) => {
    let { userId, resId } = req.params
    try {
        let data = await conn.like_res.findOne({
            where: {
                user_id: userId,
                res_id: resId
            }

        })
        if (data) {
            await conn.like_res.destroy(
                {
                    where: {
                        user_id: userId,
                        res_id: resId
                    }
                }
            )
            res.send("Your like has deleted successfully!")
        } else {
            res.status(400).send("You have already unliked this restaurant!")
        }
    } catch (error) {
        res.send(`BE error: ${error}`)
    }
}

// API user rate
const createRate = async (req, res) => {
    let { userId, resId } = req.params
    let { amount } = req.body
    if (amount <= 0 || !amount) {
        res.status(400).send("You haven't entered the amount of this rate!!")
        return
    }
    try {
        let data = await conn.rate_res.findOne({
            where: {
                user_id: userId,
                res_id: resId
            }
        })
        if (!data) {
            let newRate = {
                user_id: userId,
                res_id: resId,
                amount: +amount,
                date_rate: new Date()
            }
            await conn.rate_res.create(newRate);
            res.status(201).send("Your rate has recorded successfully!")
        } else {
            res.status(400).send("Sorry, you have already rated this restaurant!")
        }

    } catch (error) {
        res.send(`BE error: ${error}`)
    }
}

// API user order
const orderFood = async (req, res) => {
    let { userId, foodId } = req.params
    let { amount } = req.body
    if (amount <= 0 || !amount) {
        res.status(400).send("You haven't entered the amount of this order!!")
        return
    }
    try {
        let newOrder = {
            user_id: userId,
            food_id: foodId,
            amount: amount,
            food_code: "FC" + (Math.floor(Math.random() * 20) + 1).toString().padStart(3, '0'),
            arr_sub_id: "ASID" + (Math.floor(Math.random() * 20) + 1).toString().padStart(3, '0')
        }
        await conn.order_food.create(newOrder)
        res.status(201).send("Your order is preparing!")
    } catch (error) {
        res.send(`BE error: ${error}`)
    }
}

export {
    getLikedUserList,
    getRatedUserList,
    createLike,
    deleteLike,
    createRate,
    orderFood
}