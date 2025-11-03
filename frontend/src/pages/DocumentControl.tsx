import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GlobalStyles,
  Container,
  Header,
  Toolbar,
  SearchBox,
  ContentArea,
  Sidebar,
  Modal,
  Button,
  Select,
  SearchInput,
  MainContent,
  StatsBar,
  StatCard,
  DocumentGrid,
  DocumentCard,
  ModalContent,
  FormGroup
} from '../styles/DocumentControlStyles.js';

// Types
interface Document {
    id: number;
    title: string;
    type: 'pdf' | 'word' | 'excel' | 'imagen';
    category: string;
    status: 'activo' | 'revision' | 'archivado';
    date: string;
    author: string;
    size: string;
}

const DocumentControl: React.FC = () => {
    const navigate = useNavigate();
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
        },
        {
            id: 2,
            title: "Contrato de Servicios - Cliente ABC",
            type: "word",
            category: "contratos",
            status: "revision",
            date: "2024-01-14",
            author: "María García",
            size: "1.2 MB"
        },
        {
            id: 3,
            title: "Informe Financiero Q1",
            type: "excel",
            category: "informes",
            status: "activo",
            date: "2024-01-13",
            author: "Carlos López",
            size: "850 KB"
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        
        const newDoc: Document = {
            id: documents.length + 1,
            title: formData.get('docTitle') as string,
            type: formData.get('docType') as Document['type'],
            category: formData.get('docCategory') as string,
            status: 'activo',
            date: new Date().toISOString().split('T')[0],
            author: 'Usuario Actual',
            size: '1.0 MB'
        };

        setDocuments([newDoc, ...documents]);
        setIsModalOpen(false);
        alert('Documento agregado correctamente');
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !typeFilter || doc.type === typeFilter;
        const matchesStatus = !statusFilter || doc.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <>
            <GlobalStyles />
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        />
                        <span>🔍</span>
                    </SearchBox>
                    <div>
                        <Select 
                            value={typeFilter}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}
                        >
                            <option value="">Todos los tipos</option>
                            <option value="pdf">PDF</option>
                            <option value="word">Word</option>
                            <option value="excel">Excel</option>
                            <option value="imagen">Imagen</option>
                        </Select>
                        <Select 
                            value={statusFilter}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
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

                <MainContent>
                    <Sidebar>
                        <h3>📂 Contratos</h3>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/document-control'); }} className="active">📋 Todos los contratos</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/contratos/altas-bajas'); }}>👥 Altas/Bajas</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/contratos/carga-descarga'); }}>📤 Carga/Descarga</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/contratos/pendientes'); }}>⏳ Pendientes</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/contratos/base-datos'); }}>🗄️ Base de Datos</a></li>
                        </ul>

                        <h3>⚡ Acciones rápidas</h3>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>📤 Subir contrato</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>🔄 Sincronizar</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>📊 Generar reporte</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>⚙️ Configuración</a></li>
                        </ul>
                    </Sidebar>

                    <ContentArea>
                        <StatsBar>
                            <StatCard>
                                <div className="stat-number">1,247</div>
                                <div className="stat-label">Total Documentos</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">23</div>
                                <div className="stat-label">En Revisión</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">156</div>
                                <div className="stat-label">Nuevos este mes</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">98%</div>
                                <div className="stat-label">Cumplimiento</div>
                            </StatCard>
                        </StatsBar>

                        <DocumentGrid>
                            {filteredDocuments.map(doc => (
                                <DocumentCard key={doc.id}>
                                    <div className="document-icon">
                                        {getDocumentIcon(doc.type)}
                                    </div>
                                    <div className="document-title">{doc.title}</div>
                                    <div className="document-meta">
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
                                    <div className="document-actions">
                                        <Button onClick={() => alert(`Ver documento ID: ${doc.id}`)}>
                                            📑 Ver
                                        </Button>
                                        <Button onClick={() => alert(`Editar documento ID: ${doc.id}`)}>
                                            ✏️ Editar
                                        </Button>
                                        <Button onClick={() => alert(`Descargar documento ID: ${doc.id}`)}>
                                            ⬇️ Descargar
                                        </Button>
                                    </div>
                                </DocumentCard>
                            ))}
                        </DocumentGrid>
                    </ContentArea>
                </MainContent>

                <Modal isOpen={isModalOpen}>
                    <ModalContent>
                        <span onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Nuevo Documento</h2>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <label htmlFor="docTitle">Título del documento:</label>
                                <input type="text" id="docTitle" name="docTitle" required />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="docType">Tipo:</label>
                                <Select id="docType" name="docType" required>
                                    <option value="">Seleccionar tipo</option>
                                    <option value="pdf">PDF</option>
                                    <option value="word">Word</option>
                                    <option value="excel">Excel</option>
                                    <option value="imagen">Imagen</option>
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="docCategory">Categoría:</label>
                                <Select id="docCategory" name="docCategory" required>
                                    <option value="">Seleccionar categoría</option>
                                    <option value="informes">Informes</option>
                                    <option value="contratos">Contratos</option>
                                    <option value="politicas">Políticas</option>
                                    <option value="procedimientos">Procedimientos</option>
                                    <option value="formularios">Formularios</option>
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="docDescription">Descripción:</label>
                                <textarea id="docDescription" name="docDescription" rows={3} />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="docFile">Archivo:</label>
                                <input 
                                    type="file" 
                                    id="docFile" 
                                    name="docFile" 
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif" 
                                />
                            </FormGroup>
                            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                                <Button type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit">
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </ModalContent>
                </Modal>
            </Container>
        </>
    );
};

export default DocumentControl;
