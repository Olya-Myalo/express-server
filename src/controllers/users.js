const User = require('../models/user');

const getUsers = (request, response) => {
    return User.find({}).then(
        (data) => { response.status(200).send(data) }
    ).catch(error => response.status(500).send(error.massage))
};

const getUser = (request, response) => {
    const { user_id } = request.params;
    return User.findById(user_id).then((user) => { 
        if (!user) {
            response.status(404).send("User not found");
        } else {
            response.status(200).send(user);
        }
    }).catch(error => response.status(500).send(error.massage))
};

const createUser = (request, response) => {
    return User.create({ ...request.body }).then(
        (user) => { response.status(201).send(user) }
    ).catch(error => response.status(500).send(error.massage))
};

const updateUser = (request, response) => {
    const { user_id } = request.params;
    return User.findByIdAndUpdate(user_id, { ...request.body })
        .then((user) => {
            if (!user) {
                response.status(404).send("User not found");
            } else {
                response.status(200).send(user);
            }
        })
        .catch((error) => {
            response.status(500).send(error.message);
        });
};

const deleteUser = (request, response) => {
    const { user_id } = request.params;
    return User.findByIdAndDelete(user_id)
        .then((user) => {
            if (!user) {
                response.status(404).send("User not found");
            } else {
                response.status(200).send("Success");
            }
        })
        .catch((error) => {
            response.status(500).send(error.message);
        });
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};