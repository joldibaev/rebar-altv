export interface AuthRegisterProps {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthLoginProps {
    email: string;
    password: string;
    rememberMe: boolean;
}
