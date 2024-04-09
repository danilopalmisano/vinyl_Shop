import express from "express";
import { router as productApi } from "./routes/product.routes";
import { router as cartApi } from './routes/cart.routes';

export const app = express();
//configure the middleware for body requests
app.use(express.json());
app.get('/', (req, res) => {
	res.json({ message: 'Server is online' });
});

app.use('/api/products', productApi);
app.use('/api/cart', cartApi);