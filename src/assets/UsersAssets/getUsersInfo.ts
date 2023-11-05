import { users_info } from "../../dtos/users.dto";

export function getUsersInfo(result: any): users_info[] {
    let data: users_info[] = []
    result.map((index: users_info) => {
        let { password, ...others } = index;
        data.push(others)
    })
    return data
}