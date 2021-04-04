const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use('/tutors', (req, res) => {

var body = []
var dummyInfo = {
    name: 'John Wicker',
    degree: 'B.S.',
    major: 'Computer Science',
    school: 'Columbia University',
    tag: ['CS', 'algorithm'],
    email: 'example@email.com'
    }
for (var i=0; i<10; i++){
    dummyInfo.email = 'example' + String(i) + '@email.com'
    body.push(JSON.parse(JSON.stringify(dummyInfo)))
}
var resp = {
    'statusCode': 200,
    'body': JSON.stringify(
        {'results': body}
    )
}


res.send(resp);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/tutors'));