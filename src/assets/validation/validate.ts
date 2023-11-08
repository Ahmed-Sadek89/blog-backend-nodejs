export function validate(body: { [key: string]: any }) {
    let emptyProperties: string[] = [];
    body = Object.entries(body);
    if (body !== null) {
      body.forEach((index: any) => {
        if (
          index[1] === "" ||
          Number.isNaN(index[1]) ||
          index[1] === 0 ||
          index[1] === undefined ||
          index[1] === false
        ) {
          emptyProperties.push(`${index[0]}`);
        }
      });
    }
    return emptyProperties.toString();
  }