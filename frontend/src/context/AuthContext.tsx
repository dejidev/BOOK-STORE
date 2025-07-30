import {
    useEffect,
    createContext,
    useContext,
    useState,
    type FC,
    type ReactNode,

} from "react";

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";



// Define the shape of your context
interface UserCredential {
    user: User;
    providerId: string | null;
    operationType: string;
}

interface AuthContextType {
    currentUser: User | null;
    registerUser: (email: string, password: string) => Promise<UserCredential>;
    loginUser: (email: string, password: string) => Promise<UserCredential>;
    signInWithGoogle: () => Promise<UserCredential>;
    logout: () => Promise<void>;
    loading: boolean;
}

// Create the context with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Define props type for the provider
interface AuthProviderProps {
    children: ReactNode;
}



// Create the provider component
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const registerUser = async (email: string, password: string) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = async (email: string, password: string) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }


    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    }

    const logout = async () => {
        return await signOut(auth)
    }

    //Manage user 
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         setCurrentUser(user);
    //         setLoading(false);

    //         if (user.isAuthenticated) {
    //             console.log("User us Authenticated");
    //             const { email, displayName, photoURL } = user;
    //             const userData: { email: string | null, username: string | null, photo: string | null } = {
    //                 email, username: displayName, photo: photoURL
    //             }
    //         }
    //     })

    //     // Cleanup subscription on unmount
    //     return () => unsubscribe();
    // }, [])


    useEffect(() => {
        // subscribe once on mount
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // user is signed in
                setCurrentUser(user);

                // optional: pick the data you want
                const { email, displayName, photoURL } = user;
                const userData = {
                    email,
                    username: displayName,
                    photo: photoURL,
                };
                console.log("User is authenticated:", userData);
            } else {
                // user signed out
                setCurrentUser(null);
                console.log("No user, signed out");
            }

            // loading is finished in either case
            setLoading(false);
        });

        // Cleanup on unmount
        return unsubscribe;
    }, []);


    const value: AuthContextType = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};