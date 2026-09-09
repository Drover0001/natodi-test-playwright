import dotenv from 'dotenv'
import path from 'path'
import { cleanEnv, url, str, num } from 'envalid'

dotenv.config({ path: path.resolve(__dirname, '..', '.env'), quiet: true })

export const env = cleanEnv(process.env, {
    FRONTEND_URL: url(),
    API_URL: url(),
    // DB_CONNECTION_URI: url(),
    REQRES_BASE_URL: url(),
    REQRES_EXISTING_USER_ID: num(),
    REQRES_EXISTING_USER_EMAIL: str(),
    REQRES_EXISTING_USER_FIRST_NAME: str(),
    REQRES_EXISTING_USER_LAST_NAME: str(),
    REQRES_EXISTING_USER_AVATAR: url(),
    REQRES_NON_EXISTENT_USER_ID: num(),
})