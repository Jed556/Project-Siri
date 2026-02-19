import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth } from "firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile } from "utils/firestoreService";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Firebase Auth user
    const [profile, setProfile] = useState(null); // Firestore user profile
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                try {
                    const p = await getUserProfile(firebaseUser.uid);
                    setProfile(p);
                } catch {
                    setProfile(null);
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = useMemo(() => ({ user, profile, setProfile, loading }), [user, profile, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}
