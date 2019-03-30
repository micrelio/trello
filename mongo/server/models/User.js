const mongoose = require('mongoose');
//entre llaves puedes coger lo que necesites
const {
    pick
} = require('lodash');

const UserSchema = new mongoose.Schema({
    // _id,-lo pone solo
    //"tasks": [{
        id: {
            type: Number,
            required: true,
                },
        text: {
            type: String,
            required: true,
            minlength: 8,
            maclength: 50
        },
        complete: {
            type: Boolean,
            //unico
            //unique: true,
            //obligatorio
            required: true
        },
        color: {
            type: String,
            //required: true,
            
        },
        // password: {
        //     //string
        //     type: String,
        //     //obligatoria
        //     required: true,
        //     //minimo 8 caracteres
        //     minlength: 8


            //reglas de validacion
            //encriptada
      //  }
  //  }]

});

UserSchema.methods.toJSON = function () {
    //this, lo que hay dentro de UserSchema
    const user = this;
    return pick(user, ['_id', 'name', 'email']);
}

UserSchema.statics.findByCredentials = ({
    email,
    password
}) => {
    console.log(email, password);
    return User.findOne({
        email,
        password
    })
}

const User = mongoose.model('user', UserSchema);

module.exports = User;