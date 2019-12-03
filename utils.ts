export const toNumberArray = (
  lineDelimitedInput: string,
  delimiter: string = '\n'
) => lineDelimitedInput.split(delimiter).map(line => Number(line));
