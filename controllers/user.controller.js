const bcrypt = require('bcrypt');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

var User = require('../models/user.model');



exports.login = (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, async(error, user) => {
        if(error){
            res.json(error);
        } else{
            if(!user){
                res.status(401).send({message : 'Invalid email, please sign up'})
            } else{
                try {
                    if(await bcrypt.compare(userData.password, user.password)) {
                        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET)
                        res.status(200).send({token});
                    } else {
                        res.status(401).send({message : 'Invalid password, please try again'})
                    }
                  } catch (err){
                    res.send(err)
                  }
            }
        }
    })
};


exports.singup = async(req, res) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role
        });

        console.log(newUser);
        await newUser.save((err, resp) => {
            if(err){
                res.status(400).send(err);
            }
            else if (resp){
                res.statusCode = 200;
                let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET)
                res.status(200).send({token});
            }

        });
    }
    catch(error){
            res.status(400).send(error);
        }
};