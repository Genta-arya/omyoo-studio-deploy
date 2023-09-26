import ProductModel from "./ProductModel";

const products = [
  new ProductModel(
    1,
    "Portrait Photo Package",
    "Professional portrait photo session with your choice of background.",
    100000,
    "https://www.markdesign.net/images/blog/resize_755_2000/88121-81.jpg",
    [
      [
        "Professional portrait photographer",
        "Choice of background",
        "High-resolution digital images",
      ],
    ]
  ),
  new ProductModel(
    2,
    "Wedding Photography Package",
    "Comprehensive coverage for your wedding, from preparation to reception.",
    500000,
    "https://i0.wp.com/harga.web.id/wp-content/uploads/Foto-Wedding..jpg?fit=680%2C300&ssl=1",
    [
      [
      "Professional photographer", "Full-day coverage", "Customized photo album"
    ]
  ],
  ),
  new ProductModel(
    3,
    "Outdoor Photo Session",
    "Photo session in beautiful outdoor locations with stunning natural scenery.",
    150000,
    "https://www.hotelkristal.com/wp-content/uploads/sites/221/2021/11/konsep-prewedding-outdoor.jpg",
    [
      [
        "Scenic outdoor locations",
        "Professional outdoor photographer",
        "Variety of poses and shots",
      ],
    ]
  ),
];

export default products;
