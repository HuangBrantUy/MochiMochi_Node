//models 
const product = require("../models/product");
const account = require("../models/account");
const order = require("../models/order");
const bcrypt = require("bcryptjs");
const connection = require("../connection");
const { QueryTypes, where } = require('sequelize');
const { query } = require("express");
const saltRounds = 10;
const maxAge = 3 * 24 * 60 * 60;

//end of models

exports.index_get = async (req, res)=>{

    const cookie = req.cookies.user;
    const query = "Select * from products ";
    var product = await connection.sequelize.query(query, { type: QueryTypes.SELECT });

    res.render('StartPage',{product:product});
}

exports.shop_get = async (req, res)=>{

    const query = "Select * from products ";
    var product = await connection.sequelize.query(query, { type: QueryTypes.SELECT });

    res.render('Shop',{product:product});
 
}

exports.howtoOrder_get = (req, res)=>{
    res.render('HowtoOrder');
}

exports.sizeChart_get = (req, res)=>{
    res.render('SizeChart');
}

exports.contactUs_get = (req, res)=>{
    res.render('Contact');
}

exports.about_get = (req, res)=>{
    res.render('Aboutus');
}

exports.cart_get = async(req, res)=>{

    // const userid = req.body.userid;
    var user = req.cookies.user
    const query = "Select * from orders where uid = "+ user +" and stat = 0";
    var product = await connection.sequelize.query(query, { type: QueryTypes.SELECT });

    res.render('Cart',{product:product});
}

exports.productDetail_get = async (req, res)=>{
    const query = "Select * from products where id = "+req.param('id');
    var product = await connection.sequelize.query(query, { type: QueryTypes.SELECT });
    res.render('ProductDetail',{product:product});
}

exports.checkout_get = async (req, res)=>{
    const cookie = req.cookies.user;
    let data = await account.model.findAll({
        
        where: {
            id: cookie
            
        }
        
    });
    res.locals.users = data;
    const query = "Select * from orders where uid = "+cookie+" and stat = 0";
    var product = await connection.sequelize.query(query, { type: QueryTypes.SELECT });
    res.render('Checkout',{product:product});
}

exports.profile_get = async (req, res)=>{

    const cookie = req.cookies.user;
    let data = await account.model.findAll({
        
        where: {
            id: cookie
            
        }
        
    });
    res.locals.users = data;
    res.render('Profile');
}

exports.editProfile_get = (req, res)=>{

    res.render('EditProfile');
}

exports.checkoutConfirm_get = async (req, res)=>{

    var user = req.cookies.user;
    const query = "Update orders set stat = 1 where uid = "+user;
    await connection.sequelize.query(query, { type: QueryTypes.UPDATE});
    res.render('AfterCheckout');
}

exports.register_get = (req, res) => {
    res.render('register');
}


exports.logout_get = (req,res) =>{
    res.cookie('user', '', {maxAge: 1});
    res.redirect('/Login');
}

//admin get routes
exports.admin_get = (req, res)=>{
    res.render('Adminlogin');
}

exports.adminHome_get = async (req, res)=>{

    if(req.body.user == "admin" && req.body.password == "admin"){
        
        res.redirect('/admin/homeget');
    }else{
        res.redirect('/admin');
    }
    
}

exports.adminHome = async (req, res)=>{

  
        let data = await product.model.findAll();
        const query = "Select * from orders where stat= 1";
        let orders =  await connection.sequelize.query(query, { type: QueryTypes.SELECT});
        let stock = 0, totalsales = 0;
        const query2 = "Select * from orders where stat= 2";
        let orders2 =  await connection.sequelize.query(query2, { type: QueryTypes.SELECT});

        data.forEach(element => {
            stock += element.xs + element.s + element.m + element.l + element.xl + element.xl_2;
        });

        orders2.forEach(element => {
            totalsales += element.total;
        });
     
        // res.locals.products = data;
        res.render('AdminHome', {products: data, orders:orders.length, stock:stock,totalsales:totalsales});
    
    
}

exports.adminOrders_get = async (req, res)=>{
    const query = "Select orders.id,accounts.name,accounts.email, products.productName,orders.size, orders.total, orders.quantity from orders inner join accounts on orders.uid = accounts.id inner join products on orders.productid = products.id where stat =1 order by stat ASC";
    var orders = await connection.sequelize.query(query, { type: QueryTypes.SELECT });
    res.render('Orders',{orders:orders});
}

exports.adminImages_get = (req, res)=>{
    res.render('Adminimages');
}

exports.adminProducts_get = async (req, res)=>{
    const query = "Select * from products ";
    var product = await connection.sequelize.query(query, { type: QueryTypes.SELECT });
    res.render('AdminProducts',{products:product});
}
//end of admin get routes

exports.login_get = (req, res)=>{
    res.render('Login');
}



//post requests
exports.login_post = async(req,res) => {
    let data = await account.model.findOne({
        where: {
            email: req.body.email
        },
        raw: true
    });

    if (bcrypt.compareSync(req.body.password, data.password) && data.password != ""){
        res.cookie('user', data.id, {httpOnly: true, maxAge: maxAge*1000});
        console.log(data);
        
        res.redirect("/");
    }else{
        res.send({code: 400});
    }

    console.log(data)
}

exports.register_post = async (req, res) => {

    if(req.body.password === req.body.confirmpassword){

    //encryption of password
    var salt = bcrypt.genSaltSync(saltRounds);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    //end of encryption
 
    req.body.code = generateCode(); //I think the code is cookies
    req.body.accountType = "consumer";
    let data = await account.model.create(
        req.body
    )
    res.cookie('user', req.body.code, {httpOnly: true, maxAge: maxAge*1000});
    console.log(data);
    res.redirect('/');

    }

}

exports.addProduct_post = async(req, res)=>{

    if(req.body.prodid ==-1){
        req.body.code = generateCode();
        let data = await product.model.create(
            req.body
        );
    }else{
        const query = "Update products set productName='"+req.body.productName+"',xs="+req.body.xs+",s="+req.body.s+",m="+req.body.m+",l="+req.body.l+",xl="+req.body.xl+",xl_2="+req.body.xl_2+" where id="+req.body.prodid;
        await connection.sequelize.query(query, { type: QueryTypes.UPDATE });
    }
   

    res.redirect('/admin/products');
}

exports.addOrder = async(req, res)=>{


    req.body.uid = req.cookies.user;
    req.body.total = parseInt( req.body.quantity) * 500;
    req.body.stat = 0;
    let data = await order.model.create(
      req.body
    )

    console.log(data);
    res.redirect('/cart');
}

exports.deleteProduct = async(req, res)=>{

    const query = "Delete from products where id="+req.param('id');
    await connection.sequelize.query(query, { type: QueryTypes.DELETE });
    res.redirect('/admin/products');
   
}

exports.markasdone= async(req, res)=>{

    const query = "Update orders set stat=2 where id="+req.param('id');
    await connection.sequelize.query(query, { type: QueryTypes.UPDATE});
    res.redirect('/admin/orders');
   
}





//middleware functions
generateCode = () => {
    let generate = "";
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    for ( var i = 0; i < length; i++ ) {
        generate += char.charAt(Math.floor(Math.random() * char.length));
    }
    return generate;
}