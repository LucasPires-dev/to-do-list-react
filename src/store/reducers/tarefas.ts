import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefas'
import * as enums from '../../utils/unums/Tarefa'
import { allowedNodeEnvironmentFlags } from 'process'

type TarefaSlice = {
  itens: Tarefa[]
}

const initialState: TarefaSlice = {
  itens: [
    {
      id: 1,
      titulo: 'Estudar JavaScript',
      descricao: 'Assitir a aula do modulo 7',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.CONCLUIDA
    },
    {
      id: 2,
      titulo: 'Estudar React',
      descricao: 'Assitir a aula do modulo 7',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.CONCLUIDA
    },
    {
      id: 3,
      titulo: 'Estudar Redux',
      descricao: 'Assitir a aula do modulo 7',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.CONCLUIDA
    },
    {
      id: 4,
      titulo: 'Estudar Inglês',
      descricao: 'Assitir de inglês',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLocaleLowerCase() ===
          action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]
        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
