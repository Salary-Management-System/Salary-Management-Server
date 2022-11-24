import { IUser, User } from "../model/user.model";
import { v4 as generateUUID } from "uuid";
import Employee from "../model/employee.model";
import { genSalt, hash } from "bcrypt";

export class UserService {
    // @path : /api/users
    // @method : POST
    // @param : reference of the argument and take as IUser interface
    async createUser(input : IUser) {
        const { username, password, employee_id } = input;

        const user_id = generateUUID();
        const salt = await genSalt(10)
        const hashPwd = await hash(password, salt)

        if(employee_id && await Employee.isExist(employee_id)) {
            const error = new Error('Invalid or not found employee code');
            return error;
        }

        const body = {
            user_id,
            username,
            password : hashPwd,
            created_at : new Date(),
            employee_id : employee_id ? employee_id : null
        } as IUser;

        const user = new User(body);
        await user.save();
        return user;
    }
    // @path : /api/users
    // @method : POST
    async getAllUsers() : Promise<User[]> {
        return await User.findAllUsers();
    }
}

// Apply Singleton Pattern to guarantee every places in the app just use the only one instance of the service
const userService = new UserService();
export default userService;