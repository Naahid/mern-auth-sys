const router = require("express").Router();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth");





router.post('/register', async(req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // validation 
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                errorMessage: 'Please enter all required fields'
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                errorMessage: 'Please enter a password of at least 6 characters.'
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                errorMessage: 'Please enter the same password twice.'
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                errorMessage: 'An account with this email already exist'
            })
        }

        // hash the password
        const salt = await bcrypt.genSalt()
        const passHash = await bcrypt.hash(password, salt)


        // save to db
        const user = new User({
            username,
            email,
            password: passHash
        })
        await user.save()

        return res.json({ msg: 'User register successfully' })

    } catch (err) {

        res.status(400).send('Something went wrong, try again')
    }
})


router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // validate
        if (!username || !password) {
            return res.status(400).json({
                errorMessage: 'Please enter all required fields.'
            })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ errorMessage: "Wrong email or password." })
        }

        const passCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!passCorrect) {
            return res.status(400).json({ errorMessage: "Wrong email or password." })
        }

        const token = jwt.sign({
                    _id: user._id,
                },
                process.env.JWT_SECRET, {
                    expiresIn: '1h'
                }

            )
            //return user and token to client, exclude hashed password
        user.password = undefined
            // res.status(200).json({
            //         user,
            //         token
            //     })
            //send token in cookie
        res.cookie('token', token, {
                httpOnly: true,
                secure: true, // only works on https
                sameSite: 'none'
            }).send()
            // res.json(user)

    } catch (err) {
        console.log(err)
        res.status(400).send("Something missing. Try again.")
    }
})


router.get('/loggedIn', (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false)

        jwt.verify(token, process.env.JWT_SECRET)

        res.send(true)
    } catch (err) {
        res.json(false)
    }
})

router.get('/current-user', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password").exec();
        // console.log('current user', user);
        return res.json(user)

    } catch (err) {
        console.log(err)
    }
})

router.get('/logout', (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        expires: new Date(0),
        // secure: true,
        // sameSite: 'none'
    }).send()
})

router.patch('/:id', auth, async(req, res) => {
    try {
        const { id: _id } = req.params;
        const user = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('Id does not match')
        }
        const updateUser = await User.findByIdAndUpdate(_id, {...user, _id }, { new: true })
        res.json(updateUser)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router