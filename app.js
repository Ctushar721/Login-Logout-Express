let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const User = require('./model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let app = express();
JWT_SECRET = 'verwvbetryh';

mongoose.connect('mongodb://localhost:27017/28May', {useNewUrlParser: true});
var conn = mongoose.connection;

app.use('/', express.static(path.join(__dirname, 'static'))); 
// '/' isss level pe yeh static wala folder pada hoga
app.use(bodyParser.json());

app.post('/api/change-password', async (req,res) => {
    const { token, newpassword: plainTextPassword } = req.body;
    try {
		const user = jwt.verify(token, JWT_SECRET)
        console.log(user);
		const _id = user.id

		const hashedpassword = await bcrypt.hash(plainTextPassword, 10)

		await User.updateOne(
			{ _id },
			{
				$set: { password: hashedpassword }
			}
		)
		res.json({ status: 'ok' })
	} catch (error) {
		console.log('error')
		res.json({ status: 'error', error: ';))' })
	}
} )








app.post('/api/login', async (req,res) => {
    let {username, password}= req.body;
    const user = await User.findOne({ username }).lean();
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET);
        return res.json({ status: 'ok', data: token })
        
    }
    else {
        console.log('error')
    }

    res.json({status:'ok'});
})





app.post('/api/register',async (req, res) => {
    console.log(req.body)
    let {username, password: plainTextPassword }= req.body;
    let password = await bcrypt.hash(plainTextPassword,10);
    // req.body.password = await bcrypt.hash(password,10);
    // console.log(req.body)
    // console.log(password);
    
    // res.send({"hello":"caec"})
    try {
        const response = await User.create({username,password})
        console.log("Successful creation", response)
    } catch (error) {
        throw error
    }
    res.json({status:'ok'})
}
);


app.listen(3000, ()=> {console.log("server started at port 3000")});


//$2a$10$oasCBuKAD9FCtWxhjnBweuLoWIfKDNh3xkMiI3je7UH6meuFMwVyi
//$2a$10$oasCBuKAD9FCtWxhjnBweuLoWIfKDNh3xkMiI3je7UH6meuFMwVyi
//$2a$10$oasCBuKAD9FCtWxhjnBweuLoWIfKDNh3xkMiI3je7UH6meuFMwVyi