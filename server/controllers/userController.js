const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");

const UserModal =require("../models/User.js");

const secret = 'test';

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(oldUser._id);
    const result ={
      _id: oldUser._id,
      name: oldUser.name,
      email: oldUser.email,
    }
    
    res.status(200).json({ result: result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const created = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = generateToken(oldUser._id);
    const result = {
      _id: created._id,
      name: created.name,
      email: created.email,
    }
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: '1h',
  })
}

module.exports = {
    signin,
    signup
}