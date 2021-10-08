import styled from 'styled-components'
export const VerticalScrollBarDiv = styled.div`
  .overflow-auto {
    overflow: auto;
  }
  overflow-y: hidden;
  scrollbar-width: none;
  scrollbar-color: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    height: 2px;
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

  &::-webkit-scrollbar-thumb:horizontal:hover {
    background-color: #8f8f8f;
  }
`
