import styled from 'styled-components'

export const ScrollBarDiv = styled.div`
  .overflow-auto {
    overflow: auto;
  }
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: auto;
  &::-webkit-scrollbar {
    width: 8px;
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #ffffff;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    -webkit-box-shadow: inset 0 0 6px #f5f5f5;
    background: #ebebeb;
  }

  &::-webkit-scrollbar-thumb:vertical:hover {
    background-color: #8f8f8f;
  }
`
