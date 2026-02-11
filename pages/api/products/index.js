let products = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    products.push(req.body);
    return res.status(201).json(req.body);
  }
}
