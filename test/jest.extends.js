const extention = {
  toBeStringOrNull(received) {
    if (typeof received === 'string') {
      return {
        message: () => `expected ${received} is string`,
        pass: true,
      };
    }

    if (received === null) {
      return {
        message: () => `expected ${received} is null`,
        pass: true,
      };
    }

    return {
      message: () => `expected ${received} is nor null or string`,
      pass: false,
    };
  },
};

module.exports = extention;
