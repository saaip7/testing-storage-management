const Item = require("../models/models");

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

// get 10 latest items
exports.getLatestItems = async (req, res) => {
    try {
        const items = await Item.find().sort({createdAt: -1}).limit(10);
        res.status(200).json(items);
    } catch(error) {
        res.status(500).json({error:error.message});
    }
}

// get all latest items 
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().sort({createdAt: -1});
        res.status(200).json(items);
    } catch(error) {
        res.status(500).json({error:error.message});
    }
}

// delete item
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        // delete item
        const deletedItem = await Item.findByIdAndDelete(id);

        // jika item sudah dihapus sebelumnya --> pesan error
        if (!deletedItem) {
            return res.status(404).json({ error: "Item tidak ditemukan!" });
        }
        // jika id ditemukan di db --> hapus item
        res.status(200).json({ message: "Item berhasil dihapus!", item: deletedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
