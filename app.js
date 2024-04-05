let express = require('express');
let app = express();
let mongoose = require('mongoose');
let Listing = require('./models/listing');
let path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/mp');
}
main().then(
    ()=>{console.log("success")}
).catch(
    ()=>{console.log("err")}
);

app.listen(8080,()=>{
    console.log(`app is listening`)
})

// app.get('/',async (req,res)=>{
   
//     let sample1 = new Listing({
//         title:"ayush",
//         price:12000,
//         location :"chennai"
// //     });

//  await sample1.save();

//  res.send("file saved");


// });



app.get("/",async  (req,res)=>{
 let allListings =   await Listing.find({});
//  res.send("hellow world");
 res.render("./listings/index.ejs",{allListings});
});

app.get("/listings/:id",(req,res)=>{
    
    let {id} = req.params;
   Listing.findById(id).then(
    (data)=>{
        res.render("./listings/aalone.ejs",{data})
    }
   );

})



app.get("/listings/edit/:idEdit",(req,res)=>{
let {idEdit} = req.params;
let x;
Listing.findById(idEdit).then(
    (data)=>{
     
res.render('./listings/edit.ejs',{data});
    }
);

});


app.get("/update/:id",(req,res)=>{
    let {id} = req.params
    let {title,description,image,price,location } = req.query;

    Listing.findByIdAndUpdate(id,{title,description,image,price,location},{new:true}).then();
    Listing.find({}).then((data)=>{
        res.render("./listings/index.ejs",{allListings:data})
    })

})



app.get("/add",(req,res)=>{
    res.render("./listings/add.ejs");
});


app.get("/addnew",(req,res)=>{
    let {title,description,image,price,location} = req.query;
    let newListing = new Listing({title,description,image,price:Number(price),location});
    newListing.save().then((data)=>{
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    });

    Listing.find({}).then((data)=>{
        res.render("./listings/index.ejs",{allListings:data})
    })
})