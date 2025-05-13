const Joi = require('joi');

const playerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  team: Joi.string().required().messages({
    'string.empty': 'Team is required',
    'any.required': 'Team is required'
  }),
  country: Joi.string().required().messages({
    'string.empty': 'Country is required',
    'any.required': 'Country is required'
  }),
  runs: Joi.number().integer().required().messages({
    'number.base': 'Runs must be a number',
    'number.integer': 'Runs must be an integer',
    'any.required': 'Runs is required'
  }),
  image: Joi.string().required().messages({
    'string.empty': 'Image URL is required',
    'any.required': 'Image URL is required'
  }),
  role: Joi.string().valid('Batsman', 'Bowler', 'All-rounder').required().messages({
    'string.empty': 'Role is required',
    'any.only': 'Role must be one of Batsman, Bowler, or All-rounder',
    'any.required': 'Role is required'
  }),
  salary: Joi.number().positive().required().messages({
    'number.base': 'Salary must be a number',
    'number.positive': 'Salary must be a positive number',
    'any.required': 'Salary is required'
  })
});

const validatePlayer = (req, res, next) => {
  const { error } = playerSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }
  
  next();
};

const validatePlayerUpdate = (req, res, next) => {
  const updateSchema = Joi.object({
    name: Joi.string(),
    team: Joi.string(),
    country: Joi.string(),
    runs: Joi.number().integer(),
    image: Joi.string(),
    role: Joi.string().valid('Batsman', 'Bowler', 'All-rounder'),
    salary: Joi.number().positive()
  });
  
  const { error } = updateSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }
  
  next();
};

module.exports = {
  validatePlayer,
  validatePlayerUpdate
}; 