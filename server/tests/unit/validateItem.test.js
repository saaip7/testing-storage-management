const validateItem = require('../../middleware/validateItem');

describe('Middleware validateItem - Unit Test', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    // ada 16 case:
    // 1. name valid, quantity valid
    it('should call next() if name and quantity are valid', () => {
        req.body = { name: 'Baygon', quantity: 5 };

        validateItem(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    // 2. name valid, quantity null
    it('should return 400 if quantity is missing', () => {
        req.body = { name: 'Baygon' };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringMatching(/jumlah/i) }));
    });

    // 3. name valid, tipe data quantity bukan int 
    it('should return 400 if quantity is not a number', () => {
        req.body = { name: 'Baygon', quantity: 'sepuluh' };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringMatching(/angka/i) }));
    });

    // 4. name valid, quantity < 0
    it('should return 400 if quantity is negative', () => {
        req.body = { name: 'Baygon', quantity: -1 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringMatching(/positif/i) }));
    });

    // 5. name null, quantity valid
    it('should return 400 if name is missing and quantity is valid', () => {
        req.body = { quantity: 5 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 6. name null, quantity null
    it('should return 400 if both name and quantity are missing', () => {
        req.body = {};

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringMatching(/tidak boleh kosong/i) }));
    });

    // 7. name null, tipe data quantity bukan int
    it('should return 400 if name is missing and quantity is not a number', () => {
        req.body = { quantity: "sepuluh" };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 8. name null, quantity < 0
    it('should return 400 if name is missing and quantity is negative', () => {
        req.body = { quantity: -10 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 9. tipe data name bukan string, quantity valid
    it('should return 400 if name is not a string and quantity is valid', () => {
        req.body = { name: 1234, quantity: 5 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 10. tipe data name bukan string, quantity null
    it('should return 400 if name is not a string and quantity is missing', () => {
        req.body = { name: 1234 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 11. tipe data name bukan string, tipe data quantity bukan int
    it('should return 400 if name is not a string and quantity is not a number', () => {
        req.body = { name: 1234, quantity: "sepuluh" };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 12. tipe data name bukan string, quantity < 0
    it('should return 400 if name is not a string and quantity is negative', () => {
        req.body = { name: 1234, quantity: -5 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 13. panjang name > 100 chars, quantity valid
    it('should return 400 if name is too long and quantity is valid', () => {
        req.body = { name: 'a'.repeat(101), quantity: 5 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringMatching(/maksimal/i) }));
    });

    // 14. panjang name > 100 chars, quantity null
    it('should return 400 if name is too long and quantity is missing', () => {
        req.body = { name: 'a'.repeat(101) };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 15. panjang name > 100 chars, tipe data quantity bukan int
    it('should return 400 if name is too long and quantity is not a number', () => {
        req.body = { name: 'a'.repeat(101), quantity: "sepuluh" };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // 16. panjang name > 100 chars, quantity < 0
    it('should return 400 if name is too long and quantity is negative', () => {
        req.body = { name: 'a'.repeat(101), quantity: -1 };

        validateItem(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    //17. if name contains only numbers
    it('should return 400 if name contains only numbers', () => {
        req.body = { name: '123456', quantity: 1 };
    
        validateItem(req, res, next);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Nama barang tidak boleh berupa angka saja" });
    });
    
});
