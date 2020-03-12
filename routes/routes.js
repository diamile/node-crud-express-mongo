const Post = require('../models/Model') ;
const express = require('express');
const router = express.Router();


router.get("/",(req,res)=>{
  res.render('employee/form');
});


router.get("/list",async(req,res)=>{
   try{
      const datas = await Post.find();
      res.render('employee/list',{datas});
   }catch(err){
       console.log(err)
   }
});

router.post('/',async(req,res)=>{
try{
    const posts = new Post({
        fullName:req.body.fullName,
        email:req.body.email
    })

    await posts.save();

    res.redirect('employee/list');

}catch(err){
    console.log(err);
}
});


router.get("/:id",(req,res)=>{
    
       Post.findById(req.params.id,(err,employee)=>{
           if(err){
               console.log(err);
           }else{
               res.render('employee/edit',
               {employee:employee,viewTitle:'Update form'});
              
           }
       });
    
});


router.get('/delete/:id', (req, res) => {
    Post.remove({_id:req.params.id}, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


router.post("/update/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        await Post.updateOne({ _id:id }, req.body);
        res.redirect('/employee/list');
    }catch(err){
        console.log(err);
    }
});
module.exports = router;