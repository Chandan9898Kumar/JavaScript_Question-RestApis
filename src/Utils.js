export const CountStringLength = (data) => {
  const result = data?.map((item) => item?.description)
    .reduce((acc, curr) => {
      acc = acc + curr.length;
      return acc;
    }, 0);

  return result;
};
