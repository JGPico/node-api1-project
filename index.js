const express = require('express');

const server = express();

// middleware
server.use(express.json());

// endpoints

let users = [
    {
        id: 1,
        name: "William",
        bio: "Fought for liberty, shot an apple off of his son's head"
    },
    {
        id: 2,
        name: "George",
        bio: "Fought for liberty, created greatest nation ever"
    },
    {
        id: 3,
        name: "William",
        bio: "Fought for liberty, got drawn and quartered by Longshanks"
    },
    {
        id: 4,
        name: "Neshbya",
        bio: "Fought for liberty, evaded government taxes"
    }
];

server.get('/', (req, res) => {
    res.json({ api: "running. . ."});
});

server.get('/api/users', (req, res) => {
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The information could not be retrieved"});
    }
});

server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(el => el.id === id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json("A user with the specified id does not exist");
    }
});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if ( !userInfo.name || !userInfo.bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user"});
    } else if (userInfo) {
        users.push(userInfo);
        res.status(201).json(users);
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database"});
    }

});

const port = 5000;
server.listen(port, () => console.log(`\n Server listening on port ${port}\n`));