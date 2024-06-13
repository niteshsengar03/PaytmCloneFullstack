const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const { userSchema, updateuserSchema } = require("../type");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

router.post("/signup", async (req, res) => {
    
  const createPayload = req.body;
  const parsePayload = userSchema.safeParse(createPayload);
  if (!parsePayload.success)
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  const { username, firstName, lastName, password } = req.body;
  const existinguser = await User.findOne({ username });
  if (existinguser)
    return res.status(411).json({
      message: "User already taken",
    });
  const user = await User.create({
    username,
    firstName,
    lastName,
    password,
  });
  const userId = user._id;
  const token = jwt.sign({userId},JWT_SECRET);
   return res.status(200).json({
    message:"User created successfully",
    token: token
  })
});

router.post("/signin", async (req,res)=>{
const createPayload = req.body;
  const parsePayload = userSchema.safeParse(createPayload);
  if (!parsePayload.success)
    return res.status(411).json({
      message: "Incorrect inputs",
    });
    const username = req.body.username;
    const password = req.body.password;
    const userexist = await User.findOne({username,password})
    if(!userexist)
        return res.status(411).json({
            message:"Error while loggin in"
        })
     else {
        const userid = userexist._id;
        const token = jwt.sign({userid},JWT_SECRET);
        return res.status(200).json({
            token: token
        })
     }  
})

router.put("/",authMiddleware,async(req,res)=>{
    const createPayload = req.body;
  const parsePayload = updateuserSchema.safeParse(createPayload);
  if (!parsePayload.success)
    return res.status(411).json({
      message: "Incorrect inputs",
    });
    const userId = req.userId;
    const newpassword = req.body.newpassword;
    const newfirstName = req.body.newfirstName;
    const newlastName = req.body.newlastName;
    console.log(newlastName);

    try {await User.updateOne({
        _id: userId
    },
    {
        "$set":{
            password:newpassword,
            firstName:newfirstName,
            lastName:newlastName
        }
    })
    console.log("update");
}
catch (er){
    console.log(er);
}
    // if(newpassword<10)
    //     return req.status(411).json({
    //         message:"Error while updating information"
    //     })
    return res.status(200).json({
        message:"Updated succesfully"
    })
})
module.exports = router;
