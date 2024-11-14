import styled from 'styled-components'

// import { Props } from '.'

// type propsSemLegendaEContador = Omit<
//   Props,
//   'contador' | 'legenda' | 'criterio' | 'valor'
// >

type Props = {
  active: boolean
}

export const Card = styled.div<Props>`
  padding: 8px;
  border: 1px solid ${(props) => (props.active ? '#1e90ff' : 'a1a1a1')};
  background-color: ${(props) => (props.active ? '#fff' : '#fcfcfc')};
  color: ${(props) => (props.active ? '#1e90ff' : '#5e5e5e')};
  border-radius: 8px;
  cursor: pointer;
`

export const Contador = styled.span`
  font-size: 24px;
  font-weight: bold;
  display: block;
`

export const Label = styled.span`
  font-size: 14px;
`
