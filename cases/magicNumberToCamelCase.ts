const convertMagicNumberToCamelCase = (data: string) =>
  data
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
    .replace(/ /g, '')
    .replace(/(?:^|\s)\S/g, (a) => a.toLowerCase());

const convertCamelCaseToMagicNumber = (data: string) => {
  const convert = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  return convert(data).toUpperCase();
};

export const magicNumberToCamelCase = () => {
  console.log('----- magicNumberToCamelCase -----');

  const data = 'NOTA_AI';

  const camelCase = convertMagicNumberToCamelCase(data);
  console.log(camelCase);
  console.log(convertCamelCaseToMagicNumber(camelCase));
};
