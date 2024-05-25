import styled from "styled-components";

export const TerminalWrapper = styled.div`
  .terminal-wrapper {
    background: url("http://oss.desain7.top/picbg-terminal.jpg");
  }

  .terminal {
    background: rgba(0, 0, 0, 0.6);
    padding: 20px;
    overflow: scroll;
  }

  .terminal::-webkit-scrollbar {
    display: none;
  }

  .terminal span {
    font-size: 16px;
  }

  .ant-collapse-header {
    color: white !important;
    padding: 0 !important;
  }

  .ant-collapse {
    background: none;
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border: none;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
  }

  .command-input {
    display: inline-block;
    width: 75%;
    padding: 0 11px;
    color: white;
    font-size: 16px;
    background-color: transparent !important;
  }
  .ant-input-outlined {
    border-width: 0;
  }
  .ant-input-outlined:focus-within {
    box-shadow: none;
  }

  input {
    color: white !important;
    font-size: 16px;
    padding: 0 10px;
  }

  .ant-input-group-addon {
    background: none;
    border: none;
    padding: 0;
  }

  .command-input-prompt {
    color: white;
    background: transparent;
  }

  .terminal-row {
    align-items: center;
    color: white;
    white-space: nowrap;
    font-size: 16px;
    font-family: courier-new, courier, monospace;
  }
`;
