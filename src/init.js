import "dotenv/config";
import "./db";
import app from "./server";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
