import { useSelector } from 'react-redux'
import Tarefa, { Props } from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles/index'
import { RootReducer } from '../../store'

const ListaDeTarefa = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, valor, criterio } = useSelector(
    (state: RootReducer) => state.filtro
  )
  let tarefasFiltradas = itens

  const filtraTarefas = () => {
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const tarefas = filtraTarefas()

  return (
    <MainContainer>
      <Titulo as="p">
        {valor
          ? `${tarefas.length} Tarefa(s) marcadas como: "${criterio} = ${valor}"`
          : 'Tarefa(s) encontrada(s) como "Todas"'}{' '}
        {termo ? `"${termo}"` : ''}
      </Titulo>
      <ul>
        {tarefas.map((item) => (
          <li key={item.titulo}>
            <Tarefa
              id={item.id}
              titulo={item.titulo}
              descricao={item.descricao}
              prioridade={item.prioridade}
              status={item.status}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefa
