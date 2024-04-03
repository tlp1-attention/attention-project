import { resolve } from 'path';
import { Dialect } from 'sequelize';
import 'dotenv/config'

const env = {
    production: {
        PORT: process.env.PORT || 8080,
        DB: {
            // Offer the chance to connect with Database URL
            URL: process.env.DB_URL,
            NAME: process.env.DB_NAME || 'attention',
            USER: process.env.DB_USERNAME || 'root',
            PASSWORD: process.env.DB_PASSWORD || '',
            HOST: process.env.DB_HOST || 'localhost',
            PORT: process.env.DB_PORT || 3306,
            DIALECT: (process.env.DB_DIALECT || 'mysql') as Dialect,
        },
        WEB_PUSH: {
            VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
            VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
            NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'mailto:example@gmail.com'
        },
        SECRET: process.env.SECRET || 'ññññññ',
        NODE_ENV: process.env.NODE_ENV,
        LOGGING_DIR: resolve(process.cwd(), process.env.LOG_DIR || "./logs"),
        CLOUDINARY: {
            CLOUD_NAME: process.env.CLOUD_NAME,
            API_KEY: process.env.API_KEY,
            API_SECRET: process.env.API_SECRET
        },
        GOOGLE: {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            ENABLED: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? true : false
        }
    },
    development: {
        PORT: process.env.PORT || 8080,
        DB: {
            // Offer the chance to connect with Database URL
            URL: process.env.DEV_DB_URL,
            NAME: process.env.DEV_DB_NAME || 'attention__dev',
            USER: process.env.DEV_DB_USERNAME || 'root',
            PASSWORD: process.env.DEV_DB_PASSWORD || '',
            HOST: process.env.DEV_DB_HOST || 'localhost',
            PORT: process.env.DEV_DB_PORT || 3306,
            DIALECT: (process.env.DEV_DB_DIALECT || 'mysql') as Dialect,
        },
        WEB_PUSH: {
            VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
            VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
            NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'mailto:example@gmail.com'
        },
        SECRET: process.env.SECRET || 'ñññññ',
        NODE_ENV: process.env.NODE_ENV,
        LOGGING_DIR: resolve(process.cwd(), process.env.LOG_DIR || "./logs"),
        CLOUDINARY: {
            CLOUD_NAME: process.env.CLOUD_NAME,
            API_KEY: process.env.API_KEY,
            API_SECRET: process.env.API_SECRET
        },
        GOOGLE: {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            ENABLED: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? true : false
        }
    },
    test: {
        PORT: process.env.PORT || 8080,
        DB: {
            // Offer the chance to connect with Database URL
            URL: process.env.TEST_DB_URL,
            NAME: process.env.TEST_DB_NAME || 'attention__test',
            USER: process.env.TEST_DB_USERNAME || 'root',
            PASSWORD: process.env.TEST_DB_PASSWORD || '',
            HOST: process.env.TEST_DB_HOST || 'localhost',
            PORT: process.env.TEST_DB_PORT || 3306,
            DIALECT: (process.env.TEST_DB_DIALECT || 'mysql') as Dialect,
        },
        WEB_PUSH: {
            VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
            VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
            NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL || 'mailto:example@gmail.com',
        },
        SECRET: process.env.SECRET || 'ñññññ',
        NODE_ENV: process.env.NODE_ENV,
        LOGGING_DIR: resolve(process.cwd(), process.env.LOG_DIR || "./logs"),
        CLOUDINARY: {
            CLOUD_NAME: process.env.CLOUD_NAME,
            API_KEY: process.env.API_KEY,
            API_SECRET: process.env.API_SECRET
        },
        GOOGLE: {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            ENABLED: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? true : false
        }
    },

} as const;

if (!(process.env.NODE_ENV in env)) {
    throw new Error('Invalid value for NODE_ENV')
}

export default env[process.env.NODE_ENV] as typeof env[keyof typeof env];
