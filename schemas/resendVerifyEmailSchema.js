import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";
const resendVerifyEmailSchema = Joi.object({
  email: Joi.string().regex(emailRegexp).lowercase().required().messages({
    "any.required": "Missing required email field",
    "string.empty": "Email field cannot be an empty string",
  }),
});

export default resendVerifyEmailSchema;
