const {createItem, getLatestItems, getAllItems} = require("../../src/controllers/controllers");
const Item = require("../../src/models/models");

jest.mock("../../src/models/models");

describe("Item Controllers - Unit Test", () => {
    afterEach(() => jest.clearAllMocks());

    it("should create an item successfully", async () => {
        const req = {body: {name: "Test Item Detergen", quantity: 5}};
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

        const mockItems = Array(10).fill({name: "Item", quantity: 1});
        Item.find.mockReturnValue({sort: () => ({limit: () => Promise.resolve(mockItems)})});

        await getLatestItems(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it("should return all items", async () => {
        const req = {};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        const mockItems = Array(3).fill({name: "Item", quantity: 1});
        Item.find.mockReturnValue({sort: () => Promise.resolve(mockItems)});

        await getAllItems(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockItems);
    });
});