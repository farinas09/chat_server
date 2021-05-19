const { response } = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        const emailExists = await User.findOne({email});
        if(emailExists) {
            return res.status(400).json({
                ok: false,
                message: "Email already exists"
            })
        }
        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        const token = await generateJWT(user.id);
        
        return res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        })
    }

};

const login = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                ok: false,
                error: "Invalid email or password",
            });
            
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                ok: false,
                error: "Invalid email or password",
            });
            
        }
        const token = await generateJWT(user.id);
        
        return res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        })
    }

};

const renewToken = async (req, res = response) => {
    try {
        const uid = req.uid
        const token = await generateJWT(uid);
        const user = await User.findById(uid);
        if(!user) {
            return res.status(400).json({
                ok: false,
                error: "Invalid user",
            });
            
        }
        return res.json({
            ok: true,
            user,
            token

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        })
    }

};

module.exports = {
    createUser, login, renewToken
}