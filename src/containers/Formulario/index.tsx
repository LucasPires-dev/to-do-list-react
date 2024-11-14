import { Form, Opcoes } from './styles'
import { MainContainer, Titulo, Campo, BotaoSalvar } from '../../styles'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as enums from '../../utils/unums/Tarefa'
import { cadastrar } from '../../store/reducers/tarefas'
import { useNavigate } from 'react-router-dom'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()
    dispatch(
      cadastrar({
        titulo,
        descricao,
        prioridade,
        status: enums.Status.PENDENTE
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Nova Tarefa</Titulo>
      <Form onSubmit={cadastrarTarefa}>
        <Campo
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          type="text"
          placeholder="Título"
        />
        <Campo
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <Opcoes>
          <p>Prioridade:</p>
          <input
            value={enums.Prioridade.URGENTE}
            type="radio"
            name="prioridade"
            id="urgente"
            onChange={(evento) =>
              setPrioridade(evento.target.value as enums.Prioridade.URGENTE)
            }
          />{' '}
          <label htmlFor="urgente">Urgente</label>
          <input
            value={enums.Prioridade.IMPORTANTE}
            type="radio"
            name="prioridade"
            id="importante"
            onChange={(evento) =>
              setPrioridade(evento.target.value as enums.Prioridade.IMPORTANTE)
            }
          />{' '}
          <label htmlFor="importante">Importante</label>
          <input
            value={enums.Prioridade.NORMAL}
            type="radio"
            name="prioridade"
            id="normal"
            onChange={(evento) =>
              setPrioridade(evento.target.value as enums.Prioridade.NORMAL)
            }
            defaultChecked={true}
          />{' '}
          <label htmlFor="normal">Normal</label>
        </Opcoes>
        <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
