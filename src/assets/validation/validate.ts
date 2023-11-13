export function validate(body: { [key: string]: any }) {
  let emptyProperties: string[] = [];
  body = Object.entries(body);
  if (body !== null) {
    const isValidate = (value: string| number| boolean): boolean => {
      return (
        value === "" ||
        Number.isNaN(value) ||
        value === 0 ||
        value === "0" ||
        value === undefined ||
        value === null ||
        value === false
      );
    };
    body.forEach((index: any) => {
      if ( isValidate(index[1]) ) {
        emptyProperties.push(`${index[0]}`);
      }
    });
  }
  return emptyProperties.toString();
}
