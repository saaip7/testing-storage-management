const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const router = require("../../src/routes/routes");
const Item = require("../../src/models/models");

const app = express();
app.use(express.json());
app.use('/api', router);

beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
});

afterEach(async () => {
    await Item.deleteMany(); // Kosongkan koleksi setelah setiap test
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Optional: bersihkan database
    await mongoose.connection.close();
});

describe('Integration Tests - Item API', () => {
    it('should create an item successfully (valid data)', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ name: 'Sabun', quantity: 10 });
  
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Item created');
      expect(res.body.item.name).toBe('Sabun');
      expect(res.body.item.quantity).toBe(10);
    });
  
    it('should fail to create item (missing name)', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ quantity: 5 });
  
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/Nama barang wajib diisi/);
    });
  
    it('should return latest 10 items', async () => {
        const now = new Date();
        const items = Array.from({ length: 15 }, (_, i) => ({
          name: `Item ${i}`,
          quantity: i,
          createdAt: new Date(now.getTime() + i * 1000) // 1 detik beda-beda
        }));
        await Item.insertMany(items);
        
  
      const res = await request(app).get('/api/items');
  
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(10);
      expect(res.body[0].name).toBe('Item 14'); // Karena diurutkan desc
    });
  
    it('should return all items', async () => {
        await Item.create({ name: 'Item A', quantity: 1 });
        await new Promise(resolve => setTimeout(resolve, 10));
        await Item.create({ name: 'Item B', quantity: 2 });
        await new Promise(resolve => setTimeout(resolve, 10));
        await Item.create({ name: 'Item C', quantity: 3 });
        
  
      const res = await request(app).get('/api/items/all');
  
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body[0].name).toBe('Item C'); // Descending
    });

    // test endpoint /api/items/:id

    // case 1: berhasil terhapus
    it('should delete an item successfully', async () => {
      // create 1 item utk keperluan test
      const createRes = await request(app)
          .post('/api/items')
          .send({ name: 'Contoh', quantity: 1 });
      // id item tsb
      const itemId = createRes.body.item._id;

      // kirim request delete item
      const deleteRes = await request(app).delete(`/api/items/${itemId}`);

      // memastikan responnya 200 OK
      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.body.message).toBe("Item berhasil dihapus");

      // memastikan item sudah benar-beanr terhapus dan tidak ada di database
      const itemInDb = await Item.findById(itemId);
      expect(itemInDb).toBeNull();
    });

    // case 2: ID tidak ditemukan (format id valid)
    it('should return 404 if item not found', async () => {
        // membuat id palsu yang pasti tidak ada di db
        const fakeId = new mongoose.Types.ObjectId();
        // request delete
        const res = await request(app).delete(`/api/items/${fakeId}`);
        // memastikan responnya 404 NOT FOUND
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Item tidak ditemukan");
    });
});

