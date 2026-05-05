function flattenDeep(obj, prefix = '') {
  const result = {};

  function recurse(current, path) {
    if (Array.isArray(current)) {
      if (current.length === 0) {
        result[path] = null;
        return;
      }
      current.forEach((item, index) => {
        recurse(item, `${path}[${index}]`);
      });
    } else if (current !== null && typeof current === 'object') {
      const keys = Object.keys(current);
      if (keys.length === 0) {
        result[path] = null;
        return;
      }
      for (const key of keys) {
        recurse(current[key], path ? `${path}.${key}` : key);
      }
    } else {
      result[path] = current;
    }
  }

  recurse(obj, prefix);
  return result;
}

module.exports = flattenDeep;

const input = {
  user: {
    name: 'Ana',
    scores: [10, 20],
    meta: { active: true }
  }
};

console.log(flattenDeep(input));