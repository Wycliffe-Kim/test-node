export const createState = <T>(defaultValue: T) => {
  let state = defaultValue;

  const getState = () => state;
  const setState = (value: T) => {
    state = value;
    return state;
  };

  return [getState, setState] as const;
};
