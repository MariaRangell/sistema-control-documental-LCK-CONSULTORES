import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f5f5f5;
  }
`;

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Header = styled.header`
  text-align: center;
  color: #333;
  margin-bottom: 30px;

  h1 {
    margin: 0;
    font-size: 2.5em;
    color: #DC143C;
  }

  p {
    margin: 10px 0 0;
    color: #666;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;

  span {
    position: absolute;
    right: 10px;
    color: #999;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #DC143C;
  }
`;

export const Select = styled.select`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #DC143C;
  }
`;

export const Button = styled.button`
  background-color: #DC143C;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b01030;
  }
`;

export const MainContent = styled.div`
  display: flex;
  gap: 20px;
`;

export const Sidebar = styled.aside`
  width: 250px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;

  h3 {
    color: #333;
    margin: 0 0 15px 0;
    font-size: 1.1em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 25px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  li {
    margin: 8px 0;
  }

  a {
    color: #666;
    text-decoration: none;
    display: block;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover, &.active {
      background-color: #f0f0f0;
      color: #DC143C;
    }
  }
`;

export const ContentArea = styled.main`
  flex: 1;
`;

export const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

export const StatCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;

  .stat-number {
    font-size: 2em;
    font-weight: bold;
    color: #DC143C;
    margin-bottom: 5px;
  }

  .stat-label {
    color: #666;
    font-size: 0.9em;
  }
`;

export const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const DocumentCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .document-icon {
    font-size: 2em;
    margin-bottom: 10px;
  }

  .document-title {
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
  }

  .document-meta {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 15px;

    > div {
      margin-bottom: 5px;
    }
  }

  .document-actions {
    display: flex;
    justify-content: flex-start;
    gap: 10px;

    button {
      padding: 5px 10px;
      font-size: 0.9em;
    }
  }
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  position: relative;

  span {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 1.5em;
    cursor: pointer;
    color: #666;

    &:hover {
      color: #333;
    }
  }

  h2 {
    margin: 0 0 20px 0;
    color: #333;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    color: #666;
  }

  input[type="text"],
  input[type="file"],
  select,
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #DC143C;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

