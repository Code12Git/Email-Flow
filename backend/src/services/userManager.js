const _ = require('lodash');
const { AppError } = require('../utils');
const {  CONFLICT, UNAUTHORIZED } = require('../utils/errors');
const { userModel } = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {fromEnv} = require('../utils')

const register = async (body) => {
  const { name, username, email, password} = body;
  try {
    const isUserExist = await userModel.findOne({email})
    if(isUserExist) throw new AppError({...CONFLICT,message:'User Already exists'})
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({name,username,email,password:hashedPassword,isVerified:true})
    return user
  } catch (err) {
    throw err;
  }
};

const login = async (body) => {
  const { email, password } = body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) throw new AppError({ ...UNAUTHORIZED, message: "Invalid email or password" });
    

     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) throw new AppError({ ...UNAUTHORIZED, message: "Invalid email or password" });
    

     const token = jwt.sign({ userId: user._id, email: user.email }, fromEnv('SECRET_KEY'), { expiresIn: "7d" });

    return { user , token };
  } catch (err) {
    throw err;
  }
};


module.exports = {register,login}