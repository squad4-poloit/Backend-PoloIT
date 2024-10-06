class ApiError extends Error {
	readonly httpCode: number;
	readonly type: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	details?: any;

	constructor(httpCode: number, type: string, message: string) {
		super(message);
		this.httpCode = httpCode;
		this.type = type;
		this.name = "ApiError"; // Nombre explícito del error
		Error.captureStackTrace(this, this.constructor); // Captura la traza de stack correctamente
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	withDetails(details: any) {
		this.details = details;
		return this;
	}

	toJSON() {
		return {
			httpCode: this.httpCode,
			type: this.type,
			message: this.message,
			details: this.details,
			stack: this.stack,
		};
	}
}

export default ApiError;
