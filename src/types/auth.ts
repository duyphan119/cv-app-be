export type RegisterInput = {
	fullName: string;
	email: string;
	password: string;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type LoginOutput = {
	user: {
		id: number;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		fullName: string;
	};
	accessToken: string;
	refreshToken: string;
};

export type CheckEmailInput = {
	email: string;
};

export type GetResetCodeInput = {
	email: string;
};

export type VerifyResetCodeInput = {
	code: string;
};

export type ResetPasswordInput = {
	code: string;
	newPassword: string;
};

export type ResetCode = {
	code: string;
	expiredIn: number;
	time: number;
	email: string;
};

export type ResetCodeIsVerified = {
	code: string;
	email: string;
	isVerified: boolean;
};
