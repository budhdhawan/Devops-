//jshint esversion:6

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
const multer = require("multer");
const path = require("path");
// const upload = multer({'./uploads'});
mongoose.connect("mongodb+srv://admin:admin@cluster0.id7ruxe.mongodb.net/login", {useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname));

const customerSchema = {
  name: String,
  number: Number,
  email: String,
  password: String,
  data: String
};
const vendorSchema = {
    gender:Number,
    q3:Number,
    q4:Number,
    feedback:String
};
const Customer = mongoose.model('Customer', customerSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
var displayName = "Sign Up/Sign In";
var message = "";
var imagepath=[];
var i=0;
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('Images',5);

app.get("/feedback", function(req, res) {
  res.render("feedback");
});
app.get("/signup", function(req, res) {
  res.render("signup");
});
app.post("/feedback",function(req,res){
  const feedback = new Vendor({
    gender: req.body.gender,
    q3:req.body.q3,
    q4:req.body.q4,
    feedback:req.body.feedback
  })
  console.log("Data saved successfully");
  res.redirect("/");
});
app.post("/signup", function(req, res) {
  const customerInfo = new Customer({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
    password: req.body.password
  });
  Customer.findOne({
    email: req.body.email
  }, function(err, foundCustomer) {
    if (!err) {
      if (foundCustomer == null) {
         customerInfo.save();
         message = "You Signed Up...";
      } else {
        message = " email already exists in our record... ";
      }
    }
    res.render("message",{message:message});
  });
});
app.post("/signin", function(req, res) {
  Customer.findOne({
    email: req.body.email1
  }, function(err, foundCustomer) {
    if (!err) {
      if (foundCustomer.name != {} && foundCustomer.password === req.body.password1) {
        displayName = foundCustomer.name.substring(0, 11) + "...";
      }
    }
    res.redirect("/");
  });
});



app.get("/", function(req, res) {
  res.render("index", {
    displayName: displayName
  });
});
app.post("/message", function(req, res) {
  res.redirect("/");
});

app.get("/vendor-signup", function(req, res) {
  res.render("vendor-signup");
});

app.get("/vendor-signup", function(req, res) {
  res.render("vendor-signup");
});
app.get("/features", function(req, res) {
  res.render("features");
});
app.get("/product", function(req, res) {
  res.render("product");
});
app.post("/vendor-signup", upload ,function(req, res) {
for(i=0;i<req.files.length;i++){
  imagepath[i]=req.files[i].filename;
}

  const vendorInfo = new Vendor({
    ServiceName: req.body.ServiceName,
    BusinessName: req.body.BusinessName,
    OwnerName: req.body.OwnerName,
    OwnerEmail: req.body.OwnerEmail,
    Refno: req.body.Refno,
    Address: req.body.Address,
    State: req.body.state,
    City: req.body.city,
    OpeningTime: req.body.OpeningTime,
    ClosingTime: req.body.ClosingTime,
    Discription: req.body.Discription,
    Amount: req.body.Amount,
    Payment: req.body.Payment,
    Image: imagepath
  });
  Vendor.findOne({
    OwnerEmail: req.body.OwnerEmail
  }, function(err, foundVendor) {
    if (!err) {
      if (foundVendor== null) {
         vendorInfo.save();
         message = "You Signed Up...";
         console.log(vendorInfo);
      } else {
        message = " email already exists in our record... ";
      }
    }
    res.render("message",{message:message});
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running at 3000");
});