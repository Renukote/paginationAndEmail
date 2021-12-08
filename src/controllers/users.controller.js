const express = require("express");
const userModel = require('../models/users.model');
const mailer = require('../utils/send-mail');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 3;
        let skip = (page - 1) * size;
        console.log(size);

        let users = await userModel.find({}).skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await userModel.find().countDocuments()) / size)

        return res.status(200).send([users, `Total pages: ${totalPages}`]);
    }
    catch (e) {
        return res.status(500).send({ message: e.message, status: "failed" })
    }
});


router.post("/", async (req, res) => {
    try {
        let users = await userModel.create(req.body);

        mailer.sendMail("coder@masai.com", req.body.email, `Welcome to ABC system ${req.body.first_name}, ${req.body.last_name}`, `Hi ${req.body.first_name}, Please confirm your email address`,  `<h1>Hi ${req.body.first_name}, Please confirm your email address</h1>`);
        mailer.sendMailToAdmins("coder@masai.com",  `User ${req.body.first_name}, ${req.body.last_name} has registered with us`, `Please welcome ${req.body.first_name} ${req.body.last_name}`,  `<h1>Please welcome ${req.body.first_name} ${req.body.last_name}</h1>`);

        return res.status(200).send(users);
    }
    catch (e) {
        return res.status(500).send({ message: e.message, status: "failed" })
    }
});

module.exports = router;