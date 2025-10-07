require('dotenv').config()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { json } = require('express')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: 'User already exists' });

        const hash = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            name,
            email,
            password: hash
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not registered" });

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(400).json({ error: "Incorrect password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" })

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        });

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -__v");
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}