const createArraySubsets = (target, subsetLength) => {
  const array = Array.isArray(target) ? target : [target];
  if (Object.is(NaN, Number(subsetLength))) throw new Error('Subset Length should be a number!');

  return array.reduce((result, value, index) => {
    if (index % subsetLength === 0) result.push(array.slice(index, index + subsetLength));
    return result;
  }, []);
};

export default createArraySubsets;
