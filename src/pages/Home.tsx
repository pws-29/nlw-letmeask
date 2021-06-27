// Importando contexto
import { useHistory } from 'react-router-dom'
// Tipagem de evento
import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import '../styles/auth.scss'
import { Button }  from '../components/Button'
import { useAuth } from '../hooks/useAuth'




// Autenticação e redirecionamento --------------------------------------------------------
export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    // verificando se a sala existe
    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed.')
      return;
    }

    history.push(`/rooms/${roomCode}`)
    
  }



// Componete de login, separado ---------------------------------------------------------------
  return (
    <div id="page-auth">
        
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie sala de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da audiência em tempo-real</p>
      </aside>

      <main>
  
          <div className="main-content">
              <img src={logoImg} alt="Letmeask"/>
              <button className="create-room" onClick={handleCreateRoom}>
                  <img src={googleIconImg} alt="Logo do google"/>
                  Crie sua sala com o Google
              </button>

              <div className="separator">Ou entre em uma sala</div>
              <form onSubmit={handleJoinRoom}>
                <input 
                  type="text"
                  placeholder="Digite o código da sala"
                  onChange={event => setRoomCode(event.target.value)}
                  value={roomCode}
                />
                <Button type="submit">
                  Entrar na sala
                </Button>
              </form>

          </div>
      </main>
    </div>
  );
}
