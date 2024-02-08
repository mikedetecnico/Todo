import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import serviceAccount from '../../admin.json';
import { getAuth } from "firebase-admin/auth";

const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const auth = getAuth(app);
export default auth;
