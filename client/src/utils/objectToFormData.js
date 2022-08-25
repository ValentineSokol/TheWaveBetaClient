const objectToFormData = (object) => {
  if (!object || !typeof object === 'object') throw new Error('The argument should be an object!');
  const body = new FormData();
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach((item) => body.append(key, item));
    } else body.append(key, object[key]);
  });
  return body;
};

export default objectToFormData;
