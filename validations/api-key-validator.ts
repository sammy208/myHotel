const API_KEY = 'learnable.task.X';

const apiKeyValidator = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; 

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

module.exports = apiKeyValidator;