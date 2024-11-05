const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { email, username, password } = req.body;
  // Validasi Email
  if (email == "")
    return res.status(400).json({ message: "Email tidak boleh kosong!" });
  // Validasi Username
  if (username == "")
    return res.status(400).json({ message: "Username tidak boleh kosong!" });
  // Validasi Password
  if (password == "")
    return res.status(400).json({ message: "Password tidak boleh kosong!" });

  if (password.length < 8)
    return res.status(400).json({
      message: "Password  harus lebih dari 8 karakter!",
    });

  const validationPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!validationPassword.test(password))
    return res.status(400).json({
      message: "Password  harus mengandung angka, huruf, dan simbol!",
    });

  try {
    // Check Email
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail)
      return res.status(409).json({ message: "Email sudah terdaftar!" });
    // Check Username
    const checkUsername = await User.findOne({ username: username });
    if (checkUsername)
      return res.status(409).json({ message: "Username sudah terdaftar!" });

    // Hashing Password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // Save Password
    await User.create({
      email: email,
      username: username,
      password: hashPassword,
      token: null,
    });

    return res.status(201).json({ message: "User berhasil terdaftar!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (username == "")
    return res.status(400).json({ message: "Username tidak boleh kosong!" });
  if (password == "")
    return res.status(400).json({ message: "Password tidak boleh kosong!" });

  try {
    // Check Username
    const checkUsername = await User.findOne({ username: username });
    if (!checkUsername)
      return res.status(404).json({ message: "Username tidak ditemukan!" });
    // Match Password
    const match = await bcrypt.compare(password, checkUsername.password);
    if (!match)
      return res.status(401).json({ message: "Password anda salah!" });

    // Generete Token
    const userId = checkUsername.id;
    const email = checkUsername.email;
    const name = checkUsername.username;

    const token = jwt.sign({ userId, email, name }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    await User.findOneAndUpdate({ id: userId }, { token: token });

    // Save Token To Cookies
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const response = {
      userId: checkUsername._id,
      token: token,
    };

    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { id } = req.params;
    // Check Token Dalam Database
    const checkToken = await User.findById(id);
    if (!checkToken)
      return res.status(404).json({ message: "User tidak di temukan!" });

    await User.findByIdAndUpdate(id, { token: null });

    // Clear Cookies
    res.clearCookie("token");
    return res.status(200).json({ message: "Berhasil logout!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, logout };
