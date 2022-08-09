exports.user = (req,res) => {
    res.status(200).send({status :"success", message : "Hello User, welcome!, " + req.user.email })
}

exports.staff = (req,res) => {
    res.status(200).send({status :"success", message : "Hello staff good to have you here!, " + req.user.email })
}

exports.managers = (req,res) => {
    res.status(200).send({status :"success", message : "welcome to Manager section!, " + req.user.email })
}

exports.admin = (req,res) => {
    res.status(200).send({status :"success", message : "Hello Admin, Welcome!, " + req.user.email })
}