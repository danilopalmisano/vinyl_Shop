import express from "express";

export const app = express();
//configure the middleware for body requests
app.use(express.json());
app.get("/", (req, res) => {
	res.json({ message: "Server is online" });
});
