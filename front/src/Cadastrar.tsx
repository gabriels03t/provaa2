import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Categoria {
  id: number;
  nome: string;
}

export const CadastrarTarefa = () => {
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:5273/api/categoria/listar')
      .then(response => setCategorias(response.data))
      .catch(() => setMensagem('Erro ao carregar categorias.'));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://localhost:5273/api/tarefas/cadastrar', { descricao, status, categoriaId })
      .then(() => setMensagem('Tarefa cadastrada com sucesso!'))
      .catch(() => setMensagem('Erro ao cadastrar tarefa.'));
  };

  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Concluída">Concluída</option>
          </select>
        </label>
        <label>
          Categoria:
          <select value={categoriaId || ''} onChange={(e) => setCategoriaId(Number(e.target.value))}>
            <option value="">Selecione</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};
