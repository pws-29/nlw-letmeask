// criando contexto
import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, firebase } from '../services/firebase'


// Tipagens TS ------------------------------------
type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps = {
      children: ReactNode;
  }
// --------------------------------------------------

// Criando componente contexto, qual valor será iniciado
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

      // Criando estado undefined
  const [user, setUser] = useState<User>();

  // Hook para desparo de efeitos colaterais
  // Disparar uma função sempre que algo acontecer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const { displayName, photoURL, uid } = user
  
          if (!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.')
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  // Authenticação Google
  async function signInWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    // Caso a autenticação ocorra:
      if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }

    return (
        // Enviando valor do contexto, tudo que está dentro do provider enxerga */
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>


    );
}