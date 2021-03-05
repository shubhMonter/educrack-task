const Rent = require("../Model/rent");
const User = require("../Model/user");

const create = async (req, res) => {
    try {
        const {
            name,
            rentPrice,
            manufactureDate,
            actualCost,
            user
        } = req.body;
        const newRent = new Rent({
            user,
            name,
            rentPrice,
            manufactureDate,
            actualCost
        });

        newRent.save(err => {
            if (err) {
                console.log(err);
                return res.status(203).send({
                    status: false,
                    message: "Something Went Wrong",
                    errors: err
                });
            }
            return res.send({
                status: true,
                message: 'Rent Data Added SuccessFully!'
            });
        })

    } catch (err) {
        console.log(err);
        return res.status(203).send({
            status: false,
            message: "Something Went Wrong",
            errors: err
        });
    }
}

const edit = async (req, res) => {

    try {
        const {
            id,
            user
        } = req.body;
        const userExist = await User.findById(user);
        const rentExist = await Rent.findById(id);
        if (userExist && rentExist) {
            if (userExist._id == rentExist.user) {
                Rent.findOneAndUpdate({
                    _id: id
                }, {
                    $set: req.body
                }, {
                    new: true
                }).then(newData => {

                    res.send({
                        status: true,
                        message: "Rent Data is Updated",
                        rent: newData
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(203).send({
                        status: false,
                        message: "something went wrong!!",
                        errors: err
                    });
                });
            } else {
                return res.status(203).send({
                    status: false,
                    messgae: 'created user can edit this Rent'
                });
            }
        } else {
            return res.status(203).send({
                status: false,
                message: 'user or rent Not Exist'
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(203).send({
            status: false,
            message: 'something went wrong',
            errors: err
        });
    }

}

const del = async (req, res) => {
    try {
        const {
            id,
            user
        } = req.params;
        const userExist = await User.findById(user);
        const rentExist = await Rent.findById(id);
        if (userExist && rentExist) {
            if (userExist._id == rentExist.user) {
                if (!rentExist.Taken) {
                    return res.status(404).send({
                        status: false,
                        message: 'Rent Can\'t be delete if its Rented'
                    });
                }
                const del = await Rent.findOneAndDelete({
                    _id: id
                });
                if (del) {
                    return res.send({
                        status: true,
                        messgae: 'rent deleted!!'
                    })
                }
            } else {
                return res.status(203).send({
                    status: false,
                    messgae: 'created user can delete this Rent'
                });
            }
        } else {
            return res.status(203).send({
                status: false,
                message: 'user or rent Not Exist'
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(203).send({
            status: false,
            message: 'something went wrong',
            errors: err
        });
    }
}

const taken = async (req, res) => {


    try {
        const {
            id,
            user
        } = req.body;
        const userExist = await User.findById(user);
        const rentExist = await Rent.findById(id);
        if (userExist && rentExist) {
            if (userExist._id == rentExist.user) {
                if (!rentExist.Taken) {
                    rentExist.Taken = true
                } else {
                    rentExist.Taken = false
                }
                rentExist.save(err => {
                    if (err) {
                        console.log(err);
                        return res.status(203).send({
                            status: false,
                            message: 'something went wrong!!'
                        });
                    }
                    return res.send({
                        status: true,
                        message: 'rent is taken is updated'
                    });
                })
            } else {
                return res.status(203).send({
                    status: false,
                    messgae: 'created user can update Taken this Rent'
                });
            }
        } else {
            return res.status(203).send({
                status: false,
                message: 'user or rent Not Exist'
            });
        }

    } catch (err) {
        console.log(err);
        return res.status(203).send({
            status: false,
            message: 'something went wrong',
            errors: err
        });
    }
}

const rentlist = async (req,res) =>{
    Rent.find().then(rents=>{
        res.send({status:true,RentList:rents});
    }).catch(err=>{
        console.log(err);
        res.status(203).send({status:false,message:"somwthing went wrong"});
    })
}

const rentById = async(req,res) =>{
    Rent.findById(req.params.id).then(rent=>{
        res.send({status:true,Rent:rent});
    }).catch(err=>{
        console.log(err);
        res.status(203).send({status:false,message:"somwthing went wrong"});
    })
}

module.exports = {
    create,
    edit,
    del,
    taken,
    rentlist,
    rentById
}