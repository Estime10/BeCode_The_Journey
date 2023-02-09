import { pool } from "./Client.mjs"


export const dbConnect = () => {
    pool.connect((err) => {
        if (err) {
          console.error("failed to connect", err.stack);
          pool.end()
        } else {
          console.log("connected");
        }
      });
}

