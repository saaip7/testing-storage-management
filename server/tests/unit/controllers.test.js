const {createItem, getLatestItems, getAllItems, deleteItem} = require("../../src/controllers/controllers");
const Item = require("../../src/models/models");

jest.mock("../../src/models/models");

describe("Item Controllers - Unit Test", () => {
    afterEach(() => jest.clearAllMocks());

    it("should create an item successfully", async () => {
        const req = {body: {name: "Baygon", quantity: 5}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        const saveMock = jest.fn();
        Item.mockImplementation(() => ({save: saveMock.mockResolvedValueOnce()}));

        await createItem(req, res);

        expect(saveMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({message: "Item created", item: expect.any(Object)});
    });

    it("should return latest 10 items", async () => {
        const req = {};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        const mockItems = Array(10).fill({name: "Baygon", quantity: 1});
        Item.find.mockReturnValue({sort: () => ({limit: () => Promise.resolve(mockItems)})});

        await getLatestItems(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it("should return all items", async () => {
        const req = {};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        const mockItems = Array(3).fill({name: "Baygon", quantity: 1});
        Item.find.mockReturnValue({sort: () => Promise.resolve(mockItems)});

        await getAllItems(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    describe("deleteItem", () => {
        // case 1: berhasil terhapus
        it("should delete item successfully", async () => {
            // contoh id valid
            const req = { params: { id: "663e98c51228c2a7b3d2b59e" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            const deletedMockItem = { _id: req.params.id, name: "Baygon", quantity: 1 };
            Item.findByIdAndDelete.mockResolvedValue(deletedMockItem);

            await deleteItem(req, res);

            expect(Item.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Item berhasil dihapus!", item: deletedMockItem});
        });

        // case 2: ID tidak ditemukan (format id valid)
        it("should return 404 if item not found", async () => {
            const req = { params: { id: "663e98c51228c2a7b3d2b000" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // jika fungsi find return null --> item tidak ditemukan
            Item.findByIdAndDelete.mockResolvedValue(null);

            await deleteItem(req, res);

            expect(Item.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Item tidak ditemukan!" });
        });
    });

    // test case untuk error handling
    describe("Item Controllers - Error Handling", () => {
        let req, res;

        beforeEach(() => {
            req = { body: {}, params: {} };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

        Item.find = jest.fn();
        Item.findByIdAndDelete = jest.fn();
        });

        it("should return 400 if error occurs while creating item", async () => {
            req.body = { name: "Baygon", quantity: 5 };
            Item.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error("Bad Request"))
            }));

            await createItem(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Bad Request" });
        });

        it("should return 500 if error occurs while get latest items", async () => {
            Item.find.mockImplementation(() => ({
                sort: () => ({
                    limit: () => Promise.reject(new Error("Internal Server Error"))
                })
            }));

            await getLatestItems(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });

        it("should return 500 if error occurs while get all items", async () => {
            Item.find.mockImplementation(() => ({
                sort: () => Promise.reject(new Error("Internal Server Error"))
            }));

            await getAllItems(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });

        it("should return 500 if error occurs while deleting item", async () => {
            req.params.id = "663e98c51228c2a7b3d2b59e";
            Item.findByIdAndDelete.mockRejectedValue(new Error("Internal Server Error"));

            await deleteItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });
    });
});