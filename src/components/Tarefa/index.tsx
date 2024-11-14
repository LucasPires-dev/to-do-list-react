import { ChangeEvent, useEffect, useState } from 'react'
import * as S from './styles'
import * as enums from '../../utils/unums/Tarefa'
import { useDispatch } from 'react-redux'

import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefas'
import { Botao, BotaoSalvar } from '../../styles'
import * as unums from '../../utils/unums/Tarefa'

export type Props = TarefaClass

const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState(descricaoOriginal)

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  const alteraStatusTarefa = (evento: ChangeEvent<HTMLInputElement>) => {
    console.log(evento.target.checked)
    dispatch(alteraStatus({ id, finalizado: evento.target.checked }))
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          onChange={alteraStatusTarefa}
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraDeAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() =>
                dispatch(
                  editar({
                    titulo,
                    prioridade,
                    status,
                    descricao,
                    id
                  }),
                  setEstaEditando(false)
                )
              }
            >
              Salvar
            </BotaoSalvar>
            <S.BotãoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotãoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotãoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotãoCancelarRemover>
          </>
        )}
      </S.BarraDeAcoes>
    </S.Card>
  )
}

export default Tarefa
