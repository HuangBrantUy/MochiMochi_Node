const express = require("express");
const app = express();

exports.checking = (req, res, next)=> {
    if (req.body.id){
        console.log(req.body);
        next();
    }else{
        res.send("no id no entry")
    }
}

// cookie checker
exports.cookieMonster = (req, res, next) => {           
    const biscuit = req.cookies.user
    if (biscuit){
        res.redirect('/');
        
    } else {
        next();
    }
}


//checks for user id
exports.guardSaTC = (req, res, next) => {
    const id = req.cookies.user
    if(id){
        next();
    }else{
        res.redirect('/login');
    }
}