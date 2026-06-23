const Product = require("../models/Product");

const getProductAnalysis = async (req, res) => {
    console.log("analysis")
    try {
        const result = await Product.aggregate([
            {
                $match: {
                    category: "Electronic"
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$price"
                    },
                    averagePrice: {
                        $avg: "$price"
                    },
                    maxProductPrice: {
                        $max: "$price"
                    },
                    minProductPrice: {
                        $min: "$price"
                    }
                }
            },
            {
                $project : {
                _id : 0 , 
                totalRevenue : 1,
                averagePrice : 1,
                maxProductPrice : 1,
                minProductPrice : 1,
                priceRange : {
                     $subtract : ["$maxProductPrice" , "$minProductPrice"],
                }
            }
            }
           
        ])

        res.status(200).json({
            success: true,
            data: result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "internal error occured"
        })
    }
}

const getProductStats = async (req, res) => {
    try {
        // console.log("hi")
        const result = await Product.aggregate([
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 100,
                    },
                },
            },
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
        ])
        // console.log("result" , result);
        res.status(200).json({
            success: true,
            data: result
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}

const insertSampleProducts = async (req, res) => {
    try {
        const SampleProducts = [
            {
                name: "Laptop",
                category: "Electronic",
                price: 1200,
                inStock: true,
                tags: ["computer", "tech"]
            },
            {
                name: "Smartphone",
                category: "Electronic",
                price: 800,
                inStock: true,
                tags: ["mobile", "gadget"]
            },
            {
                name: "Headphones",
                category: "Electronic",
                price: 150,
                inStock: false,
                tags: ["audio", "music"]
            },
            {
                name: "Office Chair",
                category: "Furniture",
                price: 250,
                inStock: true,
                tags: ["chair", "office"]
            },
            {
                name: "Book",
                category: "Education",
                price: 50,
                inStock: true,
                tags: ["reading", "knowledge"]
            },
            {
                name: "Coffee Mug",
                category: "Kitchen",
                price: 20,
                inStock: false,
                tags: ["drinkware", "home"]
            },
            {
                name: "Running Shoes",
                category: "Sports",
                price: 120,
                inStock: true,
                tags: ["fitness", "footwear"]
            },
            {
                name: "Backpack",
                category: "Accessories",
                price: 90,
                inStock: true,
                tags: ["travel", "storage"]
            }
        ];

        const result = await Product.insertMany(SampleProducts);
        res.status(201).json({
            success: true,
            data: `Insert ${result.length} sample product`
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "some error occured"
        })
    }
}

module.exports = { insertSampleProducts, getProductStats, getProductAnalysis }
