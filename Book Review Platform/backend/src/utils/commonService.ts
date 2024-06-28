import User from "../features/user/model";

export const checkUserStatus = async (email: string): Promise<boolean> => {
    const userExists = await User.findOne({ email });
    return !!userExists;
};
