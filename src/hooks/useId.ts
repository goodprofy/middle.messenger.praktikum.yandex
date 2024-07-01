const ids = [];

const generateId = () => {
  return `id:${ids.length}`;
};

export const useId = () => {
  const id = generateId();
  ids.push(id);
  return id;
};
