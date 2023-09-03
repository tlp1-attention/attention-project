import { Dialect } from 'sequelize';
import 'dotenv/config'

const env = {
    production: {
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
        SECRET: process.env.SECRET || 'ññññññ'
    },
    development: {
        DB: {
            // Offer the chance to connect with Database URL
            URL: process.env.DB_URL,
            NAME: process.env.DEV_DB_NAME|| 'attention__dev',
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
        SECRET: process.env.SECRET || 'ñññññ'
    },
    test: {
        DB: {
            // Offer the chance to connect with Database URL
            URL: process.env.DB_URL,
            NAME: process.env.TEST_DB_NAME|| 'attention__test',
            USER: process.env.TEST_DB_USERNAME|| 'root',
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
        SECRET: process.env.SECRET || 'ñññññ'
    }
} as const;


export default env[process.env.NODE_ENV] as typeof env[keyof typeof env];