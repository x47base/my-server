const express = require('express');
const sessions = require('express-session')
const { createHash } = require('node:crypto')
const router = express.Router();

function sha256(content) {
    return createHash('sha256').update(content).digest('hex')
};

function generateHash(length) {
    var charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var hash = '';
    for (var i = 0; i < length; i++) {
        var ranpos = Math.floor(Math.random() * charset.length);
        hash += charset.substring(ranpos, ranpos + 1);
    }
    return hash;
};

var apikeys = [
    'f9712714bd4be6a6f7bf88a47b894920ad08a4ba20d1a421b4154980668be760'
]

function generateKey() {
    const hs = generateHash(32)
    const sh = sha256(hs);
    return { key: hs, secured: sh }
}

function LOG(name, action, description) {
    console.log(`[${name}] ${action} => \n\t${description}`)
}

router.get('/apikey/check/:apikey', (req, res) => {
    const { apikey } = req.params;
    if (apikeys.includes(sha256(apikey))){
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
});

router.post('/apikey/create/:apikey', (req, res) => {
    const { apikey } = req.params;
    if (apikeys.includes(sha256(apikey))){
        const newkey = generateKey()
        const data = { authorization: apikey, key: newkey.key }

        apikeys.push(newkey.secured)

        LOG("INFO","created apikey",`Authorized by: ${sha256(apikey)}\n\tApiKey: ${newkey.key}\n\tHashed ApiKey: ${newkey.secured}`)

        res.send(JSON.stringify(data))
    } else {
        res.sendStatus(403);
    }
});

router.delete('/apikey/delete/:apikey', (req, res) => {
    const { apikey } = req.params;
    const { apikey2 } = req.body;
    if (apikeys.includes(sha256(apikey))){
        if (apikey2 != null){
            apikeys.pop(apikey2);

            LOG("INFO","del apikey",`Authorized by: ${sha256(apikey)}\n\tDeleted ApiKey: ${sha256(apikey2)}`)
        } else {
            res.send(400)
        }

        res.send(JSON.stringify({ success : true }));
    } else {
        res.sendStatus(403)
    }
});

module.exports = router
