export function getResultsBySelectByParams(data: any) {
    const rowObject: { [key: string]: any } = {};
    data.forEach((rowPacket: any) => {

        for (let key in rowPacket) {
            rowObject[key] = rowPacket[key];
        }

    });
    return rowObject
}