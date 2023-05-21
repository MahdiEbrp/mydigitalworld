import supabase from '@/lib/supabase';
import { AuthError, Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContextType = {
    isLoading: boolean;
    session: Session | null;
    error: AuthError | null;
};

const initialAuthContext: AuthContextType = {
    isLoading: false,
    session: null,
    error: null,
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [isLoading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<AuthError | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            setLoading(true);
            const { data, error } = await supabase.auth.getSession();
            setSession(data?.session ?? null);
            setError(error ?? null);
            setLoading(false);
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setLoading(true);
            setSession(session ?? null);
            setLoading(false);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value={{ isLoading, session, error }}>
            {children}
        </AuthContext.Provider>
    );
};
