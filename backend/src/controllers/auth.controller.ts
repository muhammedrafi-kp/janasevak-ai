import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/http";

export class AuthController {
    constructor(private _authService: AuthService) {}

    async signup(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            console.log("name : ", name);
            console.log("email : ", email);
            console.log("password : ", password);

            const data = await this._authService.signup(name, email, password);
            res.status(HTTP_STATUS.OK).json(data);
        } catch (error: any) {
            console.error("Error during signup:", error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message || "Signup failed" });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log("email : ", email);
            console.log("password : ", password);

            const data = await this._authService.login(email, password);
            res.status(HTTP_STATUS.OK).json(data);
        } catch (error: any) {
            console.error("Error during login:", error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message || "Login failed" });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const data = await this._authService.logout();
            res.status(HTTP_STATUS.OK).json(data);
        } catch (error: any) {
            console.error("Error during logout:", error);
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message || "Logout failed" });
        }
    }
}
