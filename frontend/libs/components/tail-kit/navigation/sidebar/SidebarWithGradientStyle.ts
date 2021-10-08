import styled from 'styled-components'
export const SmallScrollBar = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 15px;
    height: 15px;
    color: black;
    border: 1px solid gray;
    border-radius: 10px;
  }
  scrollbar-width: none;
`
