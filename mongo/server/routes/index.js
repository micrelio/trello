const router = require('express').Router();
const User = require('../models/User');
//console.log(User)
router.get('/', (req, res) => {
    res.send( /*'FUNCIONA WEY!!!'*/ process.env.NODE_ENV)
});
/**
 * User routes
 */
router.post('/users', (req, res) => {
    console.log(req.body);
    new User(req.body).save().then(user => {
        res.send(user);
    }).catch(err => {
        res.status(400).send(err);
    })
});

router.post('/users/auth', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body);
        if (!user) {
            return res.status(401).send('Wrong credentials');

        }
        res.send(user);

    } catch (err) {
        res.status(500).send(err);

    }

})

router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(err => {
        res.status(500).send(err)
    })
});
//lo de detras de  /users/: son los parametros de entrada (params)
router.get('/users/:user_id', (req, res) => {
    User.findById(req.params.user_id).then(users => {
        res.send(users)
    }).catch(err => {
        res.status(500).send(err)
    })
});

router.delete('/users/:user_id', (req, res) => {
    User.findByIdAndDelete(req.params.user_id).then(users => {
        res.send(users)
    }).catch(err => {
        res.status(500).send(err)
    })
});

router.patch('/users/:user_id', (req, res) => {
    User.findByIdAndUpdate(req.params.user_id, {
        ...req.body
    }, {
        new: true,
        runValidators: true
    }).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(400).send(err);
    })

})



//Lo dejamos que el profe no se entera
// router.put('/users/:user_id', (req, res) => {
//     User.findByIdAndUpdate(req.params.user_id, {
//         $set: {
//             ...req.body
//         }
//     }, {
//         new: true,
//         runValidators: true
//     }).then(user => {
//         res.send(user);
//     }).catch(err => {
//         res.status(400).send(err);
//     })

// })


module.exports = router;