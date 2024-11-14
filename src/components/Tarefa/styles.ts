import styled from 'styled-components'
import variaveis from '../../styles/variaveis'
import * as enums from '../../utils/unums/Tarefa'
import { Botao } from '../../styles'

type TagProps = {
  prioridade?: enums.Prioridade
  status?: enums.Status
  parametro: 'status' | 'prioridade'
}

const retornaCorDeFundo = (props: TagProps): string => {
  if (props.parametro === 'status') {
    if (props.status === enums.Status.PENDENTE) return variaveis.amarelo1
    if (props.status === enums.Status.CONCLUIDA) return variaveis.verde
  } else {
    if (props.prioridade === enums.Prioridade.IMPORTANTE)
      return variaveis.vermelho
    if (props.prioridade === enums.Prioridade.URGENTE) return variaveis.amarelo2
  }
  return '#ccc'
}

export const Card = styled.div`
  background-color: #fcfcfc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 16px;

  label {
    display: flex;
    align-itens: center;
    margin-bottom: 16px;
  }
`
export const Titulo = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`
export const Tag = styled.span<TagProps>`
  padding: 4px 8px;
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => retornaCorDeFundo(props)};
  border-radius: 8px;
  margin-right: 16px;
  display: inline-block;
`
export const Descricao = styled.textarea`
  color: 8b8b8b;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  line-height: 24px;
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;
  resize: none;
  border: none;
  background-color: transparent;
`
export const BarraDeAcoes = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
`

export const BotãoCancelarRemover = styled(Botao)`
  background-color: ${variaveis.vermelho};
`
