const validateItem = (req, res, next) => {
    const {name, quantity} = req.body;

    // cek body kosong
    if(!name && quantity === undefined) {
        return res.status(400).json({error: "Data tidak boleh kosong. Nama dan jumlah barang wajib diisi"});
    }

    //cek nama harus string
    if(typeof name !== "string") {
        return res.status(400).json({error:"Nama harus berupa string"});
    }

    if (!isNaN(name)) {
        return res.status(400).json({ error: "Nama barang tidak boleh berupa angka saja" });
    }

    // cek nama
    if(!name || name.trim() === '') {
        return res.status(400).json({error: "Nama barang wajib diisi"});
    }


    if(name.length > 100) {
        return res.status(400).json({error: "Nama barang maksimal 100 karakter"});
    }

    //cek quantity apakah null atau tidak
    if (quantity === undefined) {
        return res.status(400).json({error: "Jumlah barang wajib diisi"});
    }

    //validasi jumlah angka harus positif (tapi boleh 0)
    if(typeof quantity !== 'number' || quantity <=0) {
        return res.status(400).json({error: "Jumlah barang harus berupa angka positif"});
    }
    next();
};  

module.exports = validateItem;