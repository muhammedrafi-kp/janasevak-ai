import supabase from "../configs/superbase";
import User from "../models/User";

export class AuthService {
    async signup(name: string, email: string, password: string) {
        // 1. Sign up user via Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        
        if (error) throw error;

        // 2. Save the user in MongoDB
        try {
            // Check if user already exists in Mongo (in case Supabase succeeded before but Mongo failed)
            let mongoUser = await User.findOne({ email });
            if (!mongoUser) {
                mongoUser = await User.create({
                    name,
                    email,
                    password, // Using plain text here, but Supabase handles real authentication
                });
            }
            return { session: data.session, user: mongoUser };
        } catch (dbError: any) {
            console.error("Error saving user to MongoDB:", dbError);
            throw new Error("User registered but failed to save in database.");
        }
    }

    async login(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) throw error;

        // Fetch corresponding MongoDB user to return app-specific data (e.g. role, name)
        const mongoUser = await User.findOne({ email });
        
        return { 
            session: data.session, 
            supabaseUser: data.user,
            user: mongoUser 
        };
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { message: "Logged out successfully" };
    }
}
