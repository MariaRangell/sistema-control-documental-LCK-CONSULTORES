import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
    min-height: 100vh;
    padding: 20px;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(200, 200, 200, 0.3);
`;

export const Header = styled.header`
  background: linear-gradient(135deg, #DC143C, #B22222);
  color: white;
  padding: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export const Toolbar = styled.div`
  background: #f8f9fa;
  padding: 25px 30px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchBox = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px 50px 15px 20px;
  border: 2px solid #dee2e6;
  border-radius: 50px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  color: #333;

  &:focus {
    outline: none;
    border-color: #DC143C;
    box-shadow: 0 0 20px rgba(220, 20, 60, 0.2);
    transform: translateY(-2px);
  }
`;

export const Button = styled.button`
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #DC143C, #B22222);
  color: white;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(220, 20, 60, 0.3);
  }
`;

export const Select = styled.select`
  padding: 10px 15px;
  border: 2px solid #dee2e6;
  border-radius: 20px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #DC143C;
  }
`;

export const MainContent = styled.div`
  display: flex;
  min-height: 600px;
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  padding: 30px;

  h3 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    margin-bottom: 30px;
  }

  li {
    margin-bottom: 15px;
  }

  a {
    color: #6c757d;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 12px 15px;
    border-radius: 15px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(220, 20, 60, 0.1);
      color: #DC143C;
      transform: translateX(5px);
    }

    &.active {
      background: linear-gradient(135deg, #DC143C, #B22222);
      color: white;
    }
  }
`;

export const ContentArea = styled.main`
  flex: 1;
  padding: 30px;
  background: white;
`;

export const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid #dee2e6;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(220, 20, 60, 0.05), rgba(178, 34, 34, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: 1;
  }
`;

export const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 25px;
`;

export const DocumentCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #dee2e6;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #DC143C, #B22222);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #DC143C;
  }
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  border: 1px solid #dee2e6;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 600;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 2px solid #dee2e6;
    border-radius: 10px;
    font-size: 14px;
    transition: border-color 0.3s ease;
    background: white;
    color: #333;

    &:focus {
      outline: none;
      border-color: #DC143C;
    }
  }
`;
