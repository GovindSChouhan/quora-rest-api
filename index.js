const express = require("express");//Imports the Express module.
const app = express();//Creates an Express application.
const port = 8080;

const path = require("path");
//random no gen ko import 
const { v4:uuidv4 } = require('uuid');


app.use(express.urlencoded({extended : true}));

app.set("view engine" ,"ejs");//Use EJS as the template engine."
app.set("views", path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
    res.send("serving working well");
})

//creat a POST 
let posts = [
    {
        id : uuidv4(),
        username : "Govind",
        content : "placed prep"
    },
     {
        id : uuidv4(),
        username : "singh",
        content : "placed prep final"
    },
     {
        id : uuidv4(),
        username : "chouhan",
        content : "placed prep do or die situation"
    },
];
app.get("/posts" , (req, res) => {
    res.render("index.ejs" , {posts});
});
//app.get ===API
app.get("/posts/new", (req, res) => {
    res.render("form.ejs")
});
//POST API
//followinf mean POST /posts = form ka data receive karo, array/database me save karo, fir posts page par redirect karo.
app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    //jb new post bany tho vha id bhi add karengy.
    let id = uuidv4();

    posts.push({id, username, content});//need to push all 3
    res.redirect("/posts");
    
    //console.log(req.body);
    //res.send("post request working");

});

 //GET/POST/:ID
    app.get("/posts/:id", (req, res) => {
        let{id} = req.params;
        
        console.log(id);
       // res.send("request working");
       let post = posts.find((p) => id ===p.id);//post ka p 
     //  console.log(post);
        res.render("show.ejs" , {post});
       

    });

    //app.Patch/post/:id ==API
    app.patch("/posts/:id", (req, res) => {
        let {id} = req.params;
        let newContent = req.body.content;
        console.log(newContent);
        res.send("patch request working");
        //res.render("show.ejs",{post});
    });

    

app.listen(port, () => {
    console.log("listening to port : 8080");
});





