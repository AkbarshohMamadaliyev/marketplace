import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";
import { ProductValidation } from "../validations/product.validation";

// const mockData = [
//   {
//     name: { en: "Wireless Mouse", uz: "Simsiz sichqoncha" },
//     description: {
//       en: "Ergonomic wireless mouse with long battery life.",
//       uz: "Uzoq batareya ishlash muddatiga ega ergonomik simsiz sichqoncha.",
//     },
//     price: 25.99,
//     stock: 50,
//     minStock: 5,
//     images: ["https://source.unsplash.com/random/800x600?mouse"],
//     isActive: true,
//   },
//   {
//     name: { en: "Mechanical Keyboard", uz: "Mexanik klaviatura" },
//     description: {
//       en: "RGB backlit mechanical keyboard with blue switches.",
//       uz: "RGB yoritilgan mexanik klaviatura, ko'k tugmalar bilan.",
//     },
//     price: 59.99,
//     stock: 35,
//     minStock: 7,
//     images: ["https://source.unsplash.com/random/800x600?keyboard"],
//     isActive: true,
//   },
//   {
//     name: { en: "Gaming Monitor", uz: "O'yin monitori" },
//     description: {
//       en: "27-inch 144Hz Full HD gaming monitor.",
//       uz: "27 dyuymli 144Hz to‘liq HD o‘yin monitori.",
//     },
//     price: 199.99,
//     stock: 20,
//     minStock: 3,
//     images: ["https://source.unsplash.com/random/800x600?monitor"],
//     isActive: true,
//   },
//   {
//     name: { en: "USB-C Charger", uz: "USB-C zaryadlovchi" },
//     description: {
//       en: "Fast charging USB-C wall adapter, 30W.",
//       uz: "Tez zaryadlovchi USB-C adapteri, 30W.",
//     },
//     price: 18.50,
//     stock: 80,
//     minStock: 10,
//     images: ["https://source.unsplash.com/random/800x600?charger"],
//     isActive: true,
//   },
//   {
//     name: { en: "Bluetooth Speaker", uz: "Bluetooth karnay" },
//     description: {
//       en: "Portable waterproof Bluetooth speaker.",
//       uz: "Ko‘chma suvga chidamli Bluetooth karnay.",
//     },
//     price: 39.99,
//     stock: 60,
//     minStock: 6,
//     images: ["https://source.unsplash.com/random/800x600?speaker"],
//     isActive: true,
//   },
//   {
//     name: { en: "Smart Watch", uz: "Aqlli soat" },
//     description: {
//       en: "Fitness tracker with heart rate monitor and GPS.",
//       uz: "Yurak urishi va GPS kuzatuvli fitnes treker.",
//     },
//     price: 89.00,
//     stock: 40,
//     minStock: 5,
//     images: ["https://source.unsplash.com/random/800x600?smartwatch"],
//     isActive: true,
//   },
//   {
//     name: { en: "Laptop Stand", uz: "Noutbuk stendi" },
//     description: {
//       en: "Adjustable aluminum laptop stand for desk.",
//       uz: "Stol uchun sozlanadigan alyuminiy noutbuk stendi.",
//     },
//     price: 27.75,
//     stock: 55,
//     minStock: 5,
//     images: ["https://source.unsplash.com/random/800x600?laptop-stand"],
//     isActive: true,
//   },
//   {
//     name: { en: "External Hard Drive", uz: "Tashqi qattiq disk" },
//     description: {
//       en: "1TB external USB 3.0 hard drive.",
//       uz: "1TB tashqi USB 3.0 qattiq disk.",
//     },
//     price: 64.00,
//     stock: 30,
//     minStock: 4,
//     images: ["https://source.unsplash.com/random/800x600?harddrive"],
//     isActive: true,
//   },
//   {
//     name: { en: "Noise Cancelling Headphones", uz: "Shovqinni yo'qotuvchi quloqchin" },
//     description: {
//       en: "Over-ear headphones with active noise cancellation.",
//       uz: "Faol shovqin bostiruvchi quloqchinlar.",
//     },
//     price: 120.00,
//     stock: 25,
//     minStock: 2,
//     images: ["https://source.unsplash.com/random/800x600?headphones"],
//     isActive: true,
//   },
//   {
//     name: { en: "Webcam 1080p", uz: "1080p veb kamera" },
//     description: {
//       en: "HD webcam with built-in microphone for video calls.",
//       uz: "HD veb kamera mikrofonli, video qo‘ng‘iroqlar uchun.",
//     },
//     price: 35.99,
//     stock: 70,
//     minStock: 8,
//     images: ["https://source.unsplash.com/random/800x600?webcam"],
//     isActive: true,
//   },
// ];

export const productController = {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const { count: totalCount, rows: products } =
        await Product.findAndCountAll({
          limit, // needed data
          offset, // skip data
          order: [["createdAt", "DESC"]], // sort data
        });

      res.status(200).json({
        ok: true,
        products,
        pagination: {
          totalCount,
          limit,
          offset,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, stock, minStock, isActive } =
        await ProductValidation.createProduct(req.body);

      const product = await Product.create({
        name: JSON.parse(name),
        description: JSON.parse(description),
        price,
        stock,
        minStock,
        images: (req.files as any)?.map((item: any) => item.filename),
        isActive,
      });

      // mockData.map(async (data: any) => {
      //   await Product.create({
      //     name: data.name,
      //     description: data.description,
      //     price: data.price,
      //     stock: data.stock,
      //     minStock: data.minStock,
      //     images: data.images,
      //     isActive: data.isActive,
      //   });
      // })

      res.status(201).json({
        ok: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  },
};
