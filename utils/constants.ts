export const URL_API: string = process.env.NEXT_PUBLIC_AUTH !== undefined ? process.env.NEXT_PUBLIC_AUTH : ''
export const NEXTAUTH_SECRET: string = process.env.NEXTAUTH_SECRET !== undefined ? process.env.NEXTAUTH_SECRET : '';
export const JWT_SIGNING_KEY: string = process.env.JWT_SECRET !== undefined ? process.env.JWT_SECRET : '';

