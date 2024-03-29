const Joi = require("joi");

// Validation schema for GET /:id and GET /:id/events
const getOneSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Club ID must be a number.",
    "number.integer": "Club ID must be an integer.",
    "any.required": "Club ID is required.",
  }),
});

// Validation schema for POST /
const createSchema = Joi.object({
  clubName: Joi.string().required().messages({
    "string.base": "Club name must be a string.",
    "any.required": "Club name is required.",
  }),
  status: Joi.string().valid("active", "inactive").required().messages({
    "string.base": "Status must be a string.",
    "any.only": "Status must be either active or inactive.",
    "any.required": "Status is required.",
  }),
  imagePath: Joi.string().pattern(/^images\/file-[a-fA-F0-9-]+-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.\d{3}Z(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/).required().messages({
    "string.base": "Image path must be a string.",
    "string.pattern.base": "Image path must follow the pattern 'images/file-{hexadecimal-hash}-{timestamp}.{extension}'.",
    "any.required": "Image path is required.",
  }),
});

// Validation schema for PUT /:id
const updateSchema = {
  params: Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "Club ID must be a number.",
      "number.integer": "Club ID must be an integer.",
      "any.required": "Club ID is required.",
    }),
  }),
  body: Joi.object({
    clubName: Joi.string().messages({
      "string.base": "Club name must be a string.",
      "any.required": "Club name is required.",
    }),
    status: Joi.string().valid("active", "inactive").messages({
      "string.base": "Status must be a string.",
      "any.only": 'Status must be either "active" or "inactive".',
      "any.required": "Status is required.",
    }),
  }),
};

// Validation schema for DELETE /:id
const deleteOneSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Club ID must be a number.",
    "number.integer": "Club ID must be an integer.",
    "any.required": "Club ID is required.",
  }),
});

module.exports = {
  getOneSchema,
  createSchema,
  updateSchema,
  deleteOneSchema,
};
