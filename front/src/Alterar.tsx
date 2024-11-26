import React, { useState } from 'react';
import axios from 'axios';

export const AlterarTarefa = () => {
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put(`http://localhost:5273/api/tarefas/alterar/${id}`, { status })
      .then(() => setMensagem('Tarefa alterada com sucesso!'))
      .catch(() => setMensagem('Erro ao alterar tarefa.'));
  };

  return (
    <div>
      <h1>Alterar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID da Tarefa:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <label>
          Novo Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Concluída">Concluída</option>
          </select>
        </label>
        <button type="submit">Alterar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};
