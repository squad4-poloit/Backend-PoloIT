import ApiError from "@utils/api.error";

const errors = {
	permission_failed: new ApiError(
		401,
		"UNAUTHORIZED",
		"You are not allowed to perform this action.",
	),
	forbidden: new ApiError(
		403,
		"NOT_ALLOWED",
		"You are not allowed to get the resource.",
	),
	required_key: new ApiError(
		400,
		"REQUIRED_KEY",
		"API key is required. Please provide a valid key.",
	),
	required_auth: new ApiError(
		400,
		"REQUIRED_AUTH_TOKEN",
		"Auth token is required.",
	),
	invalid_input: new ApiError(
		400,
		"INVALID_INPUT",
		"The request input is not valid.",
	),
	invalid_pass: new ApiError(
		401,
		"UNAUTHORIZED",
		"The password you entered is incorrect. Please try again.",
	),
	invalid_input_format: new ApiError(
		400,
		"INVALID_INPUT_FORMAT",
		"The request input format is invalid.",
	),
	invalid_key: new ApiError(401, "INVALID_KEY", "Valid API key is required."),
	invalid_auth: new ApiError(
		401,
		"INVALID_AUTH",
		"Valid auth token is required.",
	),
	invalid_permission: new ApiError(
		401,
		"INVALID_PERMISSION",
		"Permission denied.",
	),
	invalid_access: new ApiError(
		401,
		"INVALID_ACCESS",
		"Access denied. Current user is not allowed.",
	),
	invalid_operation: new ApiError(
		403,
		"INVALID_OPERATION",
		"Requested operation is not allowed.",
	),
	not_found: new ApiError(404, "NOT_FOUND", "The resource could not be found."),
	not_registration: new ApiError(
		404,
		"NOT_REGISTRATION",
		"User not registered.",
	),
	input_too_large: new ApiError(
		406,
		"INPUT_TOO_LARGE",
		"The input size is too large to process.",
	),
	authentication_failed: new ApiError(
		407,
		"PROXY_AUTHENTICATION_REQUIRED",
		"Proxy authentication is required.",
	),
	conflict: new ApiError(
		409,
		"CONFLICT",
		"The request conflicts with the current state of the resource.",
	),
	internal_error: new ApiError(
		500,
		"INTERNAL_ERROR",
		"Something went wrong on the server.",
	),

	account_locked: new ApiError(
		403,
		"ACCOUNT_LOCKED",
		"Your account has been locked due to too many failed login attempts. Please contact support.",
	),
	token_expired: new ApiError(
		401,
		"TOKEN_EXPIRED",
		"Your session has expired. Please log in again.",
	),
	invalid_email: new ApiError(
		400,
		"INVALID_EMAIL",
		"The email address provided is not valid.",
	),
	user_already_exists: new ApiError(
		409,
		"USER_ALREADY_EXISTS",
		"A user with this email already exists. Please use a different email.",
	),
	insufficient_balance: new ApiError(
		402,
		"INSUFFICIENT_BALANCE",
		"Your account balance is insufficient for this operation.",
	),
	rate_limit_exceeded: new ApiError(
		429,
		"RATE_LIMIT_EXCEEDED",
		"You have exceeded the number of allowed requests. Please try again later.",
	),
	email_not_verified: new ApiError(
		403,
		"EMAIL_NOT_VERIFIED",
		"Your email address is not verified. Please check your inbox for verification instructions.",
	),
};

export default errors;
