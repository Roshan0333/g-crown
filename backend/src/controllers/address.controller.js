import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const {
      firstName, lastName, country, address,
      city, state, zip, phone, email
    } = req.body;

    if (!firstName || !lastName || !country || !address || !city || !state || !zip || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAddress = new Address(req.body);
    await newAddress.save();

    res.status(201).json({ message: "Address saved successfully", newAddress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().sort({ createdAt: -1 });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const updated = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
