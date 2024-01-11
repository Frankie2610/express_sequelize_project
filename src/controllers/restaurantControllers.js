import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js"

const conn = initModels(sequelize)

// API likeList based on restaurant
const getLikedResList = async (req, res) => {
    let { restaurantId } = req.params;
    try {
        let data = await conn.restaurant.findOne({
            include: [
                {
                    model: conn.like_res,
                    as: "like_res"
                }
            ],
            where: {
                res_id: restaurantId
            }
        })
        res.send(data);
    } catch (error) {
        res.send(`BE error: ${error}`)

    }
}

// API rateList based on restaurant
const getRatedResList = async (rep, res) => {
    let { restaurantId } = req.params;
    try {
        let data = await conn.restaurant.findOne({
            include: [
                {
                    model: conn.rate_res,
                    as: "rate_res"
                }
            ],
            where: {
                res_id: restaurantId
            }
        })
        res.send(data)
    } catch (error) {
        res.send(`BE error: ${error}`)
    }
}

export {
    getLikedResList, getRatedResList
}