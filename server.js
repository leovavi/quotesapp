const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient

let db;
let port = 3000;

MongoClient.connect("mongodb://user:clave123@ds111492.mlab.com:11492/quotesapp", (err, client) =>{
	if(err) return console.log(err);

	db = client.db("quotesapp");

	app.listen(port,function(){
		console.log("Server Started on Port: "+port);
	});
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) =>{
	db.collection("quotes").find().toArray(function(err, results){
		if(err) return console.log(err);

		res.render("index.ejs", {quotes: results});
	});
	//res.sendFile(__dirname+"/index.html");
});

app.post("/quotes", (req, res) =>{
	db.collection("quotes").save(req.body, (err, result) =>{
		if(err) return console.log(err);

		console.log("Saved to DB");
		res.redirect("/");
	});
});

app.put("/quotes", (req, res) => {
	db.collection("quotes").findOneAndUpdate(
		{name: req.body.name}, 
		{
			$set: {
				name: req.body.name,
				quote: req.body.quote
			}
		},
		{
			sort:{_id: -1},
			upsert: true
		},
		(err, result) =>{
			if(err) return res.send(err);
			res.send(result);
		}
	);
});

app.delete("/quotes", (req, res) =>{
	db.collection("quotes").findOneAndDelete(
		{name: req.body.name},
		(err, result) => {
			if(err) return res.send(500, err);
			res.send({message: req.body.name+"'s Last quote got deleted"});
		}
	);
});