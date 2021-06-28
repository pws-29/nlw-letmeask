
import { Link, useHistory } from 'react-router-dom'
// Tipagem de evento
import { FormEvent, useState } from 'react'
 
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import '../styles/auth.scss'

import { Button }  from '..//components/Button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth';
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/AuthContent';

// Componete de nova sala, semalhante ao Home, função para criar sala
export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');


  // Criando nova sala (onSubmit e onChange)
  async function handleCreateNewRoom(event: FormEvent) {
    event.preventDefault(); // previnir redirecionamento do submit
    
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id // id do login, importante para futuras permissões
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

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
              <h2>Criar uma nova sala</h2>
              
              <form onSubmit={handleCreateNewRoom}>
                <input 
                  type="text"
                  placeholder="Nome da sala"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                />
                <Button type="submit">
                  Criar sala
                </Button>
              </form>

              {/* Link é exportado do react-router-dom, substitui o <a> */}
              <p>
                Quer entra em uma sala existente? <Link to="/">clique aqui</Link>
              </p>

          </div>
      </main>
    </div>
  );
}
