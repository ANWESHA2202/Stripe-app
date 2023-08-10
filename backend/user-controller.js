const User = require("./UserSchema");
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

exports.signup = async(req, res) => {
    const { username, email, password } = req.body;
    let mailExist;
    try {
        mailExist = await User.findOne({ email: email });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (mailExist) {
        return res.status(400).json({ message: "User Already Exists Please Log in!" });
    }
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be atleast 6 characters long" });
    }

    const user = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10),
    });

    try {
        await user.save();
    } catch (err) {
        return res.status(500).json([{ message: err.message }]);
    }

    return res.status(200).json([{ message: "User created successfully", user: user }]);
}

exports.login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json([{ message: "All fields are required" }]);
    }
    let user;
    try {
        user = await User.findOne({ email: email });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if (!user) {
        return res.status(400).json({ message: "User doesn't exist Please Sign Up" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Password is incorrect" });
    }


    return res.status(200).json({ message: "Login successful" });

    // return res.status(200).json([{ message: "Login successful", token: generatedToken }]);
}

exports.payment = async(req, res) => {

    let { amount, id, user, plan_name, purchase_date, expire_date } = req.body;
    let validUser;
    try {
        validUser = await User.findOne({ email: user });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

    if (!validUser) return res.status(400).json({ message: 'Invalid User' })

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "INR",
            description: "Stripe Payment",
            payment_method: id,
            confirm: true
        })

        validUser.activeplan = plan_name;
        validUser.purchasedate = purchase_date;
        validUser.expirationdate = expire_date;
        await validUser.save({ session })
        await session.commitTransaction();

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Payment Failed" })
    }
    return res.status(200).json({ message: "Payment Successfull" })
}