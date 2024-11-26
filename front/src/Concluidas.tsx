import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ListarConcluidas = () => {
  const [tarefas, setTarefas] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5273/api/tarefas/concluidas')
      .then(response => setTarefas(response.data))
      .catch(() => console.error('Erro ao carregar tarefas concluídas.'));
  }, []);

  return (
    <div>
      <h1>Tarefas Concluídas</h1>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.tarefaId}>{tarefa.descricao}</li>
        ))}
      </ul>
    </div>
  );
};
