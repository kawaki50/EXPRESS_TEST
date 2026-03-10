require('dotenv').config();

const express = require('express');
const errorMiddleware = require('./middleware/error.middleware');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json());
app.use(errorMiddleware);

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});