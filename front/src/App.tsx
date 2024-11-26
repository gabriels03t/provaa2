import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ListarTarefas } from './Listar';
import { CadastrarTarefa } from './Cadastrar';
import { AlterarTarefa } from './Alterar';
import { ListarConcluidas } from './Concluidas';
import { ListarNaoConcluidas } from './NaoConcluidas';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/tarefa/listar" element={<ListarTarefas />} />
      <Route path="/tarefa/cadastrar" element={<CadastrarTarefa />} />
      <Route path="/tarefa/alterar" element={<AlterarTarefa />} />
      <Route path="/tarefa/concluidas" element={<ListarConcluidas />} />
      <Route path="/tarefa/naoconcluidas" element={<ListarNaoConcluidas />} />
    </Routes>
  );
};

export default App;
