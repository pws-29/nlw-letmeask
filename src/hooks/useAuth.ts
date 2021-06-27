import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContent'

export function useAuth() {
    const value = useContext(AuthContext)

    return value;
}