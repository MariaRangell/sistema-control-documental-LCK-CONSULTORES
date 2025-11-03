import React, { useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-c

omponents';

interface Document {
    id: number;
    title: string;
    type: string;
    category: string;
    status: string;
    date: string;
    author: string;
    size: string;
}

const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid rgba(200, 200, 200, 0.3);
`;

const Header = styled.header`
    background: linear-gradient(135deg, #DC143C, #B22222);
    color: white;
    padding: 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
`;

const Toolbar = styled.div`
    background: #f8f9fa;
    padding: 25px 30px;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;
`;

const SearchBox = styled.div`
    flex: 1;
    min-width: 300px;
    position: relative;
`;

const SearchInput = styled.input`
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

const Select = styled.select`
    padding: 10px 15px;
    border: 2px solid #dee2e6;
    border-radius: 20px;
    background: white;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 10px;

    &:focus {
        outline: none;
        border-color: #DC143C;
    }
`;

const Button = styled.button`
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

const DocumentGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    padding: 30px;
`;

const DocumentCard = styled.div`
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

const Dashboard: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: 1,
            title: "Manual de Procedimientos 2024",
            type: "pdf",
            category: "procedimientos",
            status: "activo",
            date: "2024-01-15",
            author: "Juan Pérez",
            size: "2.5 MB"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const getDocumentIcon = (type: string) => {
        const icons: Record<string, string> = {
            pdf: '📄',
            word: '📝',
            excel: '📊',
            imagen: '🖼️'
        };
        return icons[type] || '📄';
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            activo: '#DC143C',
            revision: '#FFA500',
            archivado: '#6c757d'
        };
        return colors[status] || '#6c757d';
    };

    const handleSearch = () => {
        // Implementación de la búsqueda
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Implementación del submit del formulario
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !typeFilter || doc.type === typeFilter;
        const matchesStatus = !statusFilter || doc.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <Container>
            <Header>
                <h1>📄 Sistema de Control Documental</h1>
                <p>Gestión inteligente de documentos empresariales</p>
            </Header>
            <Toolbar>
                <SearchBox>
                    <SearchInput
                        type="text"
                        placeholder="Buscar documentos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                </SearchBox>
                <div>
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">Todos los tipos</option>
                        <option value="pdf">PDF</option>
                        <option value="word">Word</option>
                        <option value="excel">Excel</option>
                        <option value="imagen">Imagen</option>
                    </Select>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos los estados</option>
                        <option value="activo">Activo</option>
                        <option value="revision">En revisión</option>
                        <option value="archivado">Archivado</option>
                    </Select>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    ➕ Nuevo Documento
                </Button>
            </Toolbar>
            <DocumentGrid>
                {filteredDocuments.map(doc => (
                    <DocumentCard key={doc.id}>
                        <div style={{ fontSize: '2em', marginBottom: '10px' }}>{getDocumentIcon(doc.type)}</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>{doc.title}</div>
                        <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                            <div><strong>Autor:</strong> {doc.author}</div>
                            <div><strong>Fecha:</strong> {doc.date}</div>
                            <div><strong>Tamaño:</strong> {doc.size}</div>
                            <div>
                                <strong>Estado:</strong>{' '}
                                <span style={{ color: getStatusColor(doc.status) }}>
                                    {doc.status}
                                </span>
                            </div>
                        </div>
                    </DocumentCard>
                ))}
            </DocumentGrid>
        </Container>
    );
};

const Dash: React.FC = () => {
    const { section } = useParams<{ section?: string }>();

    if (!section) {
        return (
            <div style={{ padding: 20 }}>
                <h1>Selecciona una sección</h1>
                <ul>
                    <li><Link to="/documentos/altas-bajas">Altas y Bajas</Link></li>
                    <li><Link to="/documentos/carga-descarga">Carga y Descarga</Link></li>
                    <li><Link to="/documentos/pendientes">Pendientes</Link></li>
                    <li><Link to="/documentos/base-datos">Base de Datos</Link></li>
                    <li><Link to="/documentos/contratos">Contratos (Dashboard)</Link></li>
                </ul>
            </div>
        );
    }

    switch (section) {
        case 'altas-bajas':
            return <h1>Sección de Altas y Bajas de Contratos</h1>;
        case 'carga-descarga':
            return <h1>Sección de Carga y Descarga de Contratos</h1>;
        case 'pendientes':
            return <h1>Sección de Contratos Pendientes</h1>;
        case 'base-datos':
            return <h1>Base de Datos de Contratos</h1>;
        case 'contratos':
            return <Dashboard />;
        default:
            return <h1>Sección no encontrada</h1>;
    }
};

export default Dash;
