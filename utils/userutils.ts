import { userJoiSchema, userLoginSchema } from "../config/joi";

export const validateSignupInput = (email: string, password: string,name: string) => {
    try {
        const result = userJoiSchema.validate({ email, password,name });
        return result;
    } catch (error) {
        console.log("Error occurred during input validation", error);
        throw new Error("Invalid input");
    }
};

export const validateLoginInput = (email: string, password: string) => {
    try {
        const result = userLoginSchema.validate({ email, password });
        return result;
    } catch (error) {
        console.log("Error occurred while validating joi", error);
    }
};