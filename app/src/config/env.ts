interface Env {
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    API_URL: string;
    NODE_ENV: string;
    IS_DEVELOPMENT: boolean;
    IS_PRODUCTION: boolean;
    APP_VERSION?: string;
    API_TIMEOUT?: number;
}

export const env: Env = {
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    FIREBASE_STORAGE_BUCKET:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    FIREBASE_MESSAGING_SENDER_ID:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? "",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    IS_DEVELOPMENT: process.env.NODE_ENV === "development",
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT ?? "30000"),
};
