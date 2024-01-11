import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";


const app = express();
const port = 8081;

app.use(express.json()); // middleware dùng để parse body string thành body json
app.use(rootRoutes);


app.listen(port, () => {
    console.log(`BE is starting with port ${port}`);
})