const isObject = obj => obj !== null && typeof obj === 'object';

const replaceValueForKeyInJson = (json, target, provider) => {
  const parseJson = json => {
    const output = json;
    for (let key in json) {
      if (key in json) {
        const value = json[key];
        if (isObject(value)) {
          output[key] = parseJson(value);
        } else if (key === target) {
          output[key] = provider(value);
        }
      }
    }
    return output;
  };

  return parseJson(json);
};

export default replaceValueForKeyInJson;
