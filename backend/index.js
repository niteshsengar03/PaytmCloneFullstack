const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes/index');
const userRouter = require('./routes/user');
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use('/api/v1',rootRouter);
app.use('/api/v1/user',userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


