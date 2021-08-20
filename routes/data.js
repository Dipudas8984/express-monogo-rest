const express = require('express')

const router = express.Router()
const Data = require('../models/dataModel')

router.get('/',async (req,res)=>{
    try{
        const data = await Data.find()
        res.json(data)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})


router.get('/:id',getData, (req,res)=>{
    res.send(res.data)
})


router.post('/',async (req,res)=>{
    const data = new Data({
        name: req.body.name,
        age: req.body.age,
        location: req.body.location,
        email: req.body.email,
    })
    try{
        const newData = await data.save()
        res.status(200).json(newData)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})



router.patch('/:id',getData,async (req,res)=>{
    if(req.body.name != null){
        res.data.name = req.body.name
    }
    if(req.body.age != null){
        res.data.age = req.body.age
    }
    if(req.body.location != null){
        res.data.location = req.body.location
    }
    if(req.body.email != null){
        res.data.email = req.body.email
    }
    try{
        const updateData = await res.data.save()
        res.json(updateData)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})



router.delete('/:id',getData, async (req,res)=>{
    try {
        await res.data.remove()
        res.json({message: "Data Deleted"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getData(req,res, next){
    let data
    try {
        data = await Data.findById(req.params.id)
        if (data == null){
            return res.status(404).json({message: 'Cannot find data'})
        }
    } catch(err){
        return res.status(500).json({message: err.message})
    }

    res.data = data;
    next()
}

module.exports = router