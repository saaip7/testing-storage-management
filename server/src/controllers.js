const Item = require("./models");

exports.createItem = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const newItem = new Item({name, quantity});
        await newItem.save();
        res.status(201).json({message:"Item created", item: newItem});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.getLatesItems = async (req, res) => {
    try {
        const items = await Item.find().sort({createdAt: -1}).limit(10);
        res.status(200).json(items);
    } catch(error) {
        res.status(500).json({error:error.message});
    }
}

