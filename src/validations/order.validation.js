import { body } from "express-validator";

const createRules = [
  body("service")
    .notEmpty()
    .withMessage("Service is required")
    .isString()
    .withMessage("Service must be a string"),
  body("parfume")
    .notEmpty()
    .withMessage("Parfume is required")
    .isString()
    .withMessage("Parfume must be a string"),
  body("customer")
    .notEmpty()
    .withMessage("Customer is required")
    .isString()
    .withMessage("Customer must be a string"),
  body("weight")
    .notEmpty()
    .withMessage("Weight is required")
    .isFloat()
    .withMessage("Weight must be a float"),
  body("discount").optional().isInt({ max: 100 }).withMessage("discount must be a integer and not exceed 100"),
  body("status")
    .notEmpty()
    .isBoolean()
    .withMessage("discount must be a boolean"),
  body("payment_at")
    .optional()
    .isDate()
    .withMessage("Payment_at must be a date"),
  body("pickup_at")
    .optional()
    .isDate()
    .withMessage("Pickup_at must be a date"),
];

export { createRules };
