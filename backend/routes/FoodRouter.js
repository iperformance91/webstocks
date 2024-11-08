const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();

router.get('/displayFood' , async (req, res)=>{
    try{
        res.send({"food_items" : global.fooditems})
    }catch(err){
        console.log(err)
        res.json({success : false});
    }
} )

router.post('/getOrderedItems', async (req, res) => {
    try {
        const email = req.body.email;
        // Assuming you have already imported the Order model
        const orderedData = await Order.find({ email });

        // Check if any orders are found for the given userId
        if (orderedData.length === 0) {
            return res.status(404).json({ message: "No orders found for the specified user." });
        }

        // If orders are found, return them
        return res.status(200).json({ orders: orderedData });
    } catch (err) {
        // Handle any errors
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
});

router.post('/addOrderedItems', async (req, res) => {
    try {
        const { email, data , order_date} = req.body;
        await data.splice(0 , 0 , {Order_date : order_date})
        console.log(data);
        let exists  = await Order.findOne({'email' : email});
        if(exists === null){
            try{
                await Order.create({
                    email : email , 
                    order_data : [data]
                }).then(()=>{
                    res.json({success : true})
                })
            }
            catch(err){
                res.send("internal Server Error" , err.message)
            }
        }else{
            try{
                await Order.findOneAndUpdate({email: email} , 
                    {$push : {order_data : data}}).then(()=>{
                        res.json({success : true})
                    })
                
            }catch(err){
                console.log(err.message)
                res.send("Server Error" , err.message)

            }
        }

    }catch(err){
        console.log(err);
        res.send("server Error" ,err.message)
    } })


module.exports = router;
