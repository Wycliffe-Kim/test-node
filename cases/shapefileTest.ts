import { open } from 'shapefile';

const readShapefile = (source: ReturnType<typeof open>, _result: unknown[]) =>
  source
    .then((source) => source.read())
    .then((result) => {
      if (!result.done) {
        _result.push(result.value);
        return readShapefile(source, _result);
      }
      return result;
    });

export const shapefileTest = () => {
  const source = open('assets/MOCT_LINK');
  const result = [];

  readShapefile(source, result).then(() => {
    console.log(result);
  });
};
