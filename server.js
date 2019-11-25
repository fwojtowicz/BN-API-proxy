const express = require('express');
const app = express();
const axios = require('axios')
const port = process.env.PORT || 2002;
const BN_URL = "http://data.bn.org.pl/api/bibs.json"

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next()
})

app.get('/', (req, res) => {
    res.json({
        message: 'BN API proxy'
    });
})

app.get('/books', (req, res) => {
    const isbn = req.query.isbn
    axios.get(BN_URL, {
        params: {
            isbnIssn: isbn
        }
    })
        .then(response => {
            console.log(response)
            res.json(response.data)
        })
        .catch(Error => {
            console.log(Error)
        })

});

app.listen(port, () => console.log(`http://localhost:${port}`));


