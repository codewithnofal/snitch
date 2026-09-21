import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.config.js";



const port = config.PORT;

await connectDB();

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})