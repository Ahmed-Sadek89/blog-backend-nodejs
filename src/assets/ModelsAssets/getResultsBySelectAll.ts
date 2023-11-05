export function getResultsBySelectAll(data: any) {
    let result: any[] = []
    let rowObject: any = {}
    data.forEach((RowDataPacket: any) => {
        for (let key in RowDataPacket) {
            rowObject[key] = RowDataPacket[key];
        }
        result.push(rowObject)
        rowObject = {}
    });
    return result
}