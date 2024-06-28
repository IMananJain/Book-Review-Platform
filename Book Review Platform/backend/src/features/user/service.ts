import envConfig from "../../config/envConfig";
import { USER_STATUS, saltRounds } from "../../utils/commonConstants";
import { IFacebookCredential, IGoogleCredential, ILogIn, ISignUp, IUserData} from "./interfaces";
import User from "./model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { IObjectId, IResponse } from "../../utils/commonInterfaces";

const { secretKey } = envConfig();

const response: IResponse = {
  message: "",
  success: false,
};

type SignUpData = ISignUp | IGoogleCredential | IFacebookCredential;
type LogInData = ILogIn | IGoogleCredential | IFacebookCredential;

function isISignUp(data: any): data is ISignUp {
  return (data as ISignUp).username !== undefined &&
         (data as ISignUp).email !== undefined &&
         (data as ISignUp).password !== undefined;
}

function isILogIn(data: any): data is ILogIn {
  return (data as ILogIn).email !== undefined &&
         (data as ILogIn).password !== undefined;
}

function isIGoogleCredential(data: any): data is IGoogleCredential {
  return (data as IGoogleCredential).googleCredential !== undefined;
}
function isIFacebookCredential(data: any): data is IFacebookCredential {
  return (data as IFacebookCredential).username !== undefined &&
         (data as IFacebookCredential).email !== undefined &&
         (data as IFacebookCredential).image !== undefined ;
}

class UserService {
  static async signUp(data: SignUpData): Promise<IResponse> {
    if( isISignUp(data)){
      const userExists = await User.findOne({ email: data.email });
      if (userExists) {
        response.message = "User already exists! Please go to Login Page";
        response.data = null;
        response.success = false;
        return response;
      }
      
      const hashPassword = await bcrypt.hash(data.password!,saltRounds);

      const newUser = new User({
        username: data.username,
        email: data.email,
        password: hashPassword,
        image: data.image
      });

      await newUser.save();

      const savedUser = await User.findOne({ email: data.email },{__v:0,  password:0, createdAt:0,updatedAt:0});

      response.message = "SignUp successfully";
      response.data = savedUser;
      response.success = true;
    }

    else if(isIGoogleCredential(data)){
      const {googleCredential} = data;

      if(googleCredential){
        const decodedData = jwt.decode(googleCredential) as { email: string; given_name: string, family_name: string, picture: string };
        const email = decodedData.email;
        const userExists = await User.findOne({ email });
        
        if (userExists) {
          response.message = "User already exists! Please go to Login Page";
          response.success = false;
          response.data = null;
          return response;
        }

        const username = decodedData?.family_name ? `${decodedData?.given_name ?? ''} ${decodedData?.family_name}`: decodedData?.given_name ?? '';
        const newUser = new User({
          username: username,
          email: email,
          password: null,
          image: decodedData?.picture
        });
        
        await newUser.save();
        
      const userDetails = await User.findOne({ email: email },{__v:0,  password:0, createdAt:0,updatedAt:0});
      const token = jwt.sign({ email: email }, secretKey, { expiresIn: "2000s"});

      response.message = "SignUp successfully";
      response.success = true;
      response.data = { token,userDetails };
      }
    }
    else if( isIFacebookCredential(data)){
      const userExists = await User.findOne({ email: data.email });
      if (userExists) {
        response.message = "User already exists! Please go to Login Page";
        response.success = false;
        response.data = null;
        return response;
      }

      const newUser = new User({
        username: data.username,
        email: data.email,
        password: null,
        image: data?.image
      });

      await newUser.save();

      const userDetails = await User.findOne({ email: data.email },{__v:0,  password:0, createdAt:0,updatedAt:0});
      const token = jwt.sign({ email: data.email }, secretKey, { expiresIn: "2000s"});
      response.message = "SignUp successfully";
      response.success = true;
      response.data = { token, userDetails };
    }
    return response;
  }

  static async logIn(data: LogInData): Promise<IResponse> {
    
    if( isILogIn(data)){
      const userExists = await User.findOne({ email: data.email },{__v:0,createdAt:0,updatedAt:0});
      if (!userExists) {
        response.message = "Invalid User email does not exists";
        response.success = false;
        response.data = null;
        return response;
      }

      const isValidPassword = await bcrypt.compare(data.password!,userExists.password);
      if(!isValidPassword) {
        response.message = "Invalid Password";
        response.success = false;
        response.data = null;
        return response;
      }
      const {password, ...userDetails} = userExists.toObject();

      if(userExists.status === USER_STATUS.INACTIVE)
        await User.findOneAndUpdate({ email: data.email },{ $set: { status: USER_STATUS.ACTIVE } });

      const token = jwt.sign({ email: data.email }, secretKey, { expiresIn: "2000s"});
      response.message = "LogIn successfully";
      response.success = true;
      response.data = { token, userDetails };
    }

    else if(isIGoogleCredential(data)){
      const {googleCredential} = data;
      
      if(googleCredential){
        const decodedData = jwt.decode(googleCredential) as { email: string; given_name: string, family_name: string, picture: string };
        const email = decodedData.email;
        const userExists = await User.findOne({ email },{__v:0,createdAt:0,updatedAt:0});
        
        if(!userExists){
          const username = decodedData?.family_name ? `${decodedData?.given_name ?? ''} ${decodedData?.family_name}`: decodedData?.given_name ?? '';
          const newUser = new User({
            username: username,
            email: email,
            password: null,
            image: decodedData?.picture
          });
          
          await newUser.save();
        }
        else{
          if(userExists.status === USER_STATUS.INACTIVE)
            await User.findOneAndUpdate({ email: email },{ $set: { status: USER_STATUS.ACTIVE } });
        }

        const userDetails = await User.findOne({ email },{__v:0,  password:0, createdAt:0,updatedAt:0});
        const token = jwt.sign({ email: email }, secretKey, { expiresIn: "2000s"});
        
        response.message = "LogIn successfully";
        response.success = true;
        response.data = { token,userDetails };
      }
    }

    else if( isIFacebookCredential(data)){
      const userExists = await User.findOne({ email: data.email });
      if (!userExists) {
        const newUser = new User({
          username: data.username,
          email: data.email,
          password: null,
          image: data?.image
        });
  
        await newUser.save();
      }
      else{
        if(userExists.status === USER_STATUS.INACTIVE)
          await User.findOneAndUpdate({ email: data.email },{ $set: { status: USER_STATUS.ACTIVE } });
      }

      const userDetails = await User.findOne({ email: data.email },{__v:0,  password:0, createdAt:0, updatedAt:0});
      const token = jwt.sign({ email: data.email }, secretKey, { expiresIn: "2000s"});
      response.message = "LogIn successfully";
      response.success = true;
      response.data = { token,userDetails };
    }
    
    return response;
  }

  static async editProfile(data: IUserData): Promise<IResponse> {
    const userDetails = await User.findByIdAndUpdate(data.id, data, { new: true, fields: { __v: 0, password:0, createdAt: 0, updatedAt: 0 } });

    if (!userDetails) {
      response.message = "User not found or could not be updated";
      response.success = false;
      return response;
    }

    response.message = "Profile updated successfully";
    response.data = { userDetails };
    response.success = true;
    return response;
  }

  static async deleteProfile(data: IObjectId): Promise<IResponse>{
    const deletedUser = await User.findByIdAndUpdate(data.id, {$set:{status: USER_STATUS.INACTIVE}}, { new: true, fields: { __v: 0, password:0, createdAt: 0, updatedAt: 0 } });

    if (!deletedUser) {
      response.message = "User not found or could not be deleted";
      response.success = false;
      response.data = null;
      return response;
    }

    response.message = "User deleted successfully";
    response.success = true;
    response.data = null;
    return response;
  }
}

export default UserService;
