const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  // Everthing under startTransaction and commitTransaction either everything runs or nothing will run, nothing will run partially
  session.startTransaction();
  try{
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction(); // to stop the session in between
        console.log(account.balance);
        return res.status(400).json({
        message: "Insufficient balance",
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
        message: "invalid account",
        });
    }
    //Perfom the transfer
    await Account.updateOne(
        {
        userId: req.userId,
        },
        {
        //decrease
        $inc: { balance: -amount },
        }
    ).session(session);
    await Account.updateOne(
        {
        userId: to,
        },
        {
        //increase
        $inc: { balance: amount },
        }
    ).session(session);

    //comit the transaction
    await session.commitTransaction();
    res.json({
        message:"Transfer succesful"
    });
}catch(err){
    await session.abortTransaction();
    console.log(err);
    return res.json({
            messgae:"somthing went wrong"
    })
}

});
module.exports = router;
