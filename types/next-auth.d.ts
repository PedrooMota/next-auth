import { type DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session extends DefaultSession {
        AccessToken: string,
        IdToken: string,
        RefreshToken: string,
                
        user: {
            id: string,
            name: string,
            email: string,
            image: string,
            cpf: string,
            contact: string,
        }
    }
}