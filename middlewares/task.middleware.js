const { body, param, query } = require("express-validator");

const validCreateTask = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 20 })
      .withMessage("max length is 20 characters"),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("it should be Boolean"),
  ];
};

const validUpdateTask = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ max: 20 })
      .withMessage("max length is 20 characters")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("it should be string"),
    body("completed")
      .optional()
      .isBoolean()
      .withMessage("it should be Boolean"),
  ];
};

const validIdTask = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("id is required")
      .isMongoId()
      .withMessage("invalid task id"),
  ];
};

const validPageAndLimitTask = () => {
  return [
    query("limit").optional().isNumeric().withMessage("invalid limit"),
    query("page").optional().isNumeric().withMessage("invalid limit"),
  ];
};

module.exports = {
  validCreateTask,
  validUpdateTask,
  validIdTask,
  validPageAndLimitTask,
};
