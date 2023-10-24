import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            
            credentials: {
                email: {},
                password: {}
            },

            async authorize ( credentials: any ) {
                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                };

                const res = await fetch(`https://7glsnn66sa.execute-api.sa-east-1.amazonaws.com/prod/clients/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const user = await res.json();
                if (user !== null && res.status === 200) {
                    let { id, name, email, cpf, contact } = user.data;
                    let { AccessToken, RefreshToken, IdToken } = user;

                    return {
                        AccessToken,
                        IdToken,
                        RefreshToken,
                        id,
                        name,
                        email,
                        cpf,
                        contact,
                    };
                } else {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                const isSignIn = user !== undefined;
                const DataAtualSeconds = Math.floor(Date.now() / 1000);
                const ExpirationTokenSeconds = Math.floor(3 * 24 * 60 * 60);

                if (isSignIn) {
                    if (user === null) {
                        return await Promise.resolve({});
                    }
                    token.AccessToken = user.AccessToken;
                    token.IdToken = user.IdToken;
                    token.RefreshToken = user.RefreshToken;
                    token.id = user.id;
                    token.name = user.name;
                    token.email = user.email;
                    token.cpf = user.cpf;
                    token.contact = user.contact;
                    token.expiration = Math.floor(DataAtualSeconds + ExpirationTokenSeconds);
                }else {
                    if (token.expiration === null) return await Promise.resolve({});
                    if (DataAtualSeconds > token.expiration) return await Promise.resolve({});
                }
            }
            return token;
        },

        async session({ session, token }: any) {
            if (token === null){
                return null;
            }
            session.AccessToken = token.AccessToken;
            session.IdToken = token.IdToken;
            session.RefreshToken = token.RefreshToken;
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                cpf: token.cpf,
                contact: token.contact
            };
            return {...session}
        },
    },

    pages: {
        signIn: '/signin',
        signOut: '/',
        newUser: '/dashboard'
    },

    session: {
        maxAge: 3 * 24 * 60 * 60, // 30 dias de token
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}