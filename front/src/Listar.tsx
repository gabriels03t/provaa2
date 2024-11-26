import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tarefa {
  tarefaId: number;
  descricao: string;
  status: string;
  categoria: { id: number; nome: string };
}

export const ListarTarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5273/api/tarefas/listar')
      .then(response => setTarefas(response.data))
      .catch(() => setErro('Erro ao carregar tarefas.'));
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      {erro && <p>{erro}</p>}
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.tarefaId}>
            {tarefa.descricao} - {tarefa.status} (Categoria: {tarefa.categoria.nome})
          </li>
        ))}
      </ul>
    </div>
  );
};
