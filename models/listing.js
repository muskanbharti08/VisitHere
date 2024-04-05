 let mongoose = require('mongoose');
 let Schema = mongoose.Schema;  

 let listingSchema = new Schema(
    {
        title : {
            type:String,
            required :true
        }, 
        description:String,
        image : {
            type : String,
            default : "https://unsplash.com/photos/a-trail-in-the-middle-of-a-forest-with-lots-of-trees-PsK4jh88Smw",
            set : v=>
                    v === ""? "https://unsplash.com/photos/a-trail-in-the-middle-of-a-forest-with-lots-of-trees-PsK4jh88Smw" :v,
            
        },
        price :Number,
        location : String,
        Country : String

    }
 );


 let Listing = mongoose.model("Listing",listingSchema);

 module.exports = Listing;