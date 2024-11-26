import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ListarNaoConcluidas = () => {
  const [tarefas, setTarefas] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5273/api/tarefas/naoconcluidas')
      .then(response => setTarefas(response.data))
      .catch(() => console.error('Erro ao carregar tarefas não concluidas'));
  }, []);

  return (
    <div>
      <h1>Tarefas Não Concluídas</h1>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.tarefaId}>{tarefa.descricao}</li>
        ))}
      </ul>
    </div>
  );
};
