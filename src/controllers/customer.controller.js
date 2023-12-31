import { countRecords, fetchRecords } from "../helpers/pagination.helper.js";
import Customer from "../models/customer.model.js";

export const createNew = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const existCustomerName = await Customer.findOne({ where: { name } });

    if (existCustomerName) {
      return res
        .status(409)
        .json({ message: `Customer name: ${name} already exist.` });
    }

    let reformatedPhone = phone;

    if (phone.startsWith("08")) {
      reformatedPhone = "62" + phone.slice(1);
    } else if (phone.startsWith("+62")) {
      reformatedPhone = "62" + phone.slice(3);
    }

    const existCustomerPhone = await Customer.findOne({
      where: { phone: reformatedPhone },
    });

    if (existCustomerPhone) {
      return res
        .status(409)
        .json({ message: `Customer phone: ${phone} already exist.` });
    }

    const newCustomer = await Customer.create({ name, phone: reformatedPhone });

    return res.status(200).json({ message: "Success.", data: newCustomer });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const list = async (req, res) => {
  try {
    const {
      pageSize = 10,
      page = 1,
      orderBy = "createdAt",
      order = "DESC",
    } = req.query;

    const condition = {};

    const totalRecords = await countRecords(Customer, condition);
    const services = await fetchRecords(Customer, {
      condition,
      orderBy,
      order,
      pageSize,
      page,
    });

    const totalPages = Math.ceil(totalRecords / pageSize);

    const meta = {
      totalRecords,
      totalPages,
      page: parseInt(page),
    };

    const links = {
      next:
        parseInt(page) < totalPages
          ? `/customer?page=${parseInt(page) + 1}`
          : null,
      prev: parseInt(page) > 1 ? `/customer?page=${page - 1}` : null,
    };

    return res.status(200).json({
      message: "Success.",
      data: {
        services,
        meta,
        links,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const show = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findOne({ where: { id } });

    if (!customer) {
      return res.status(404).json({ message: `customer doesn't exist.` });
    }

    return res.status(200).json({ message: "Success.", data: customer });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
