# 👥 Cadastro de Clientes

Este é meu segundo projeto com Angular! Uma aplicação completa de cadastro de clientes que demonstra conceitos avançados do framework, incluindo Reactive Forms, Observables, integração com Firebase, APIs externas e muito mais.

## 🚀 Live Demo

Acesse a aplicação aqui:  
🔗 [Build Vercel](https://cadastro-de-clientes-tan.vercel.app/consulta)

## 📸 Preview

https://github.com/user-attachments/assets/29e29c58-4c5f-43c6-854e-dfebd693468e

## 📚 O que você encontrará aqui

### 🏗️ **Arquitetura e Estrutura**

- **Componentes Reutilizáveis:** Estrutura standalone com componentes separados para formulário, tabela, header, footer e drawer
- **Serviços Especializados:** Separação clara de responsabilidades com serviços para clientes e integração com APIs
- **Repositories Pattern:** Camada de abstração para operações de dados com Firebase
- **Models Tipados:** Interfaces TypeScript bem definidas para Cliente, Estado e Município
- **Roteamento:** Navegação entre páginas com Angular Router

### 📝 **Formulários Avançados**

- **Reactive Forms:** Implementação de formulários reativos ao invés de template-driven forms
- **Debounce:** Implementação de debounce (espera 500ms) antes de validar campos, evitando chamadas desnecessárias ao servidor
- **Máscaras:** Aplicação de máscaras nos campos de CPF e data de nascimento
- **Validações Customizadas:** Validações síncronas e assíncronas personalizadas

### 🔄 **Observables e Reatividade**

- **Padrão Observer:** Implementação do padrão Observer para comunicação entre componentes
- **Gerenciamento de Estado:** Controle de estado reativo com observables para notificações de mudanças
- **Separação de Responsabilidades:** Feedback apenas no iniciador da ação, atualização de dados nos consumidores

### 🌐 **Integração com APIs**

- **Brasil API:** Consumo da API pública para listar estados e municípios
- **API Própria:** Endpoint `/api/clientes` para restaurar dados base dos clientes
- **Tratamento de Erros:** Implementação robusta de tratamento de erros nas chamadas de API

### 🔥 **Firebase Integration**

- **Firestore Database:** Armazenamento em nuvem dos dados dos clientes
- **CRUD Completo:** Operações de Create, Read, Update e Delete no Firestore
- **Restauração de Dados:** Funcionalidade para restaurar dados originais via API própria
- **Validação de Dados:** Verificação de integridade dos dados armazenados

### 📱 **Design Responsivo**

- **Mobile-First:** Design otimizado para dispositivos móveis
- **Tailwind CSS:** Framework CSS utilitário para estilização responsiva
- **Breakpoints:** Adaptação automática para diferentes tamanhos de tela
- **Drawer Navigation:** Menu lateral para dispositivos móveis
- **Tabela Responsiva:** Colunas que se adaptam ao tamanho da tela

### 🎨 **Interface e UX**

- **ng-zorro-antd:** Framework de UI moderno
- **Feedback Visual Personalizado:** Estados de loading específicos para cada operação
- **Mensagens Contextuais:** Feedback específico para cada ação do usuário
- **Animações:** Transições suaves entre estados
- **Ícones Intuitivos:** Interface rica em ícones para melhor usabilidade

### 🔍 **Funcionalidades Implementadas**

#### **Cadastro de Clientes**

- ✅ Formulário completo com validações
- ✅ Verificação de email e CPF únicos
- ✅ Integração com API de estados e municípios
- ✅ Máscaras nos campos (CPF, data)
- ✅ Debounce nas validações assíncronas
- ✅ Persistência no Firebase Firestore

#### **Consulta e Listagem**

- ✅ Tabela paginada com dados dos clientes
- ✅ Busca por nome em tempo real
- ✅ Formatação de datas para exibição
- ✅ Ações de editar e excluir
- ✅ Design responsivo com colunas adaptativas

#### **Edição de Clientes**

- ✅ Carregamento de dados existentes
- ✅ Preenchimento automático do formulário
- ✅ Manutenção do ID original
- ✅ Navegação automática após edição

#### **Exclusão de Clientes**

- ✅ Confirmação antes da exclusão
- ✅ Timeout automático para cancelar
- ✅ Atualização imediata da lista

#### **Gerenciamento de Dados**

- ✅ Restauração dos dados originais via API
- ✅ Controle de quantidade de clientes
- ✅ Notificações de mudanças via observables
- ✅ Estados de loading específicos

#### **Navegação Responsiva**

- ✅ Header adaptativo com menu hambúrguer
- ✅ Drawer lateral para dispositivos móveis
- ✅ Menu horizontal para desktop
- ✅ Navegação fluida entre páginas

## 🛠️ Tecnologias Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Tipagem de dados
- **Firebase/Firestore** - Banco de dados em nuvem
- **ng-zorro-antd** - Framework de UI
- **Tailwind CSS** - Framework CSS utilitário
- **ngx-mask** - Biblioteca para máscaras
- **RxJS** - Biblioteca para programação reativa
- **Brasil API** - API pública para dados geográficos
- **Vercel** - Plataforma de deploy e hosting
- **UUID** - Geração de IDs únicos

## 🔧 Conceitos Avançados Demonstrados

### **Reactive Forms vs Template-Driven Forms**

Este projeto utiliza **Reactive Forms**, que oferecem:

- Maior controle sobre as validações
- Melhor performance para formulários complexos
- Facilidade para implementar validações customizadas
- Melhor testabilidade

### **Debounce Implementation**

Implementação de debounce para evitar chamadas desnecessárias:

```typescript
private debounceTimer?: number;
private readonly debounceDelay: number = 500;

// Aguarda 500ms antes de validar
```

### **Padrão Observer**

Separação clara entre quem inicia ações e quem reage:

- **Iniciador:** Exibe feedback
- **Consumidores:** Apenas atualizam dados

### **Repository Pattern**

Abstração da camada de dados:

```typescript
// Repository abstrai as operações do Firebase
export class ClienteRepository {
  async getClientes(): Promise<Cliente[]>;
  async salvar(cliente: Cliente): Promise<Cliente[]>;
  async atualizar(cliente: Cliente): Promise<void>;
  async excluir(cliente: Cliente): Promise<Cliente[]>;
}
```

### **Design Responsivo**

Implementação de breakpoints e componentes adaptativos:

- **Mobile:** Drawer navigation, colunas ocultas
- **Tablet:** Layout intermediário
- **Desktop:** Menu horizontal, todas as colunas visíveis

## 🚀 Como Executar

1. **Clone o repositório:**

```bash
git clone https://github.com/renardbergson/cadastro-de-clientes.git
cd cadastro-de-clientes
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute o projeto:**

```bash
ng serve
```

4. **Acesse no navegador:**

```
http://localhost:4200
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout/           # Componentes de layout (header, footer, drawer)
│   │   ├── header/       # Header responsivo com navegação
│   │   ├── footer/       # Footer da aplicação
│   │   └── conteudo-central/ # Container principal
│   ├── pages/           # Páginas da aplicação
│   │   ├── cadastro/    # Página de cadastro
│   │   └── consulta/    # Página de consulta
│   └── shared/          # Componentes e serviços compartilhados
│       ├── models/      # Interfaces e tipos
│       ├── repositories/ # Camada de acesso a dados
│       ├── services/    # Serviços da aplicação
│       └── utils/       # Utilitários
├── api/                 # API própria (Vercel Functions)
└── environments/        # Configurações de ambiente
```

## 🎯 Diferenças do Primeiro Projeto

Comparado ao [Shopping List](https://github.com/renardbergson/shopping-list), este projeto demonstra:

| Aspecto          | Shopping List       | Cadastro de Clientes   |
| ---------------- | ------------------- | ---------------------- |
| **Formulários**  | Template-driven     | Reactive Forms         |
| **Observables**  | Básicos             | Próprios + Nativos     |
| **APIs**         | Não utilizadas      | Integração completa    |
| **Validações**   | Simples             | Assíncronas + Debounce |
| **Persistência** | LocalStorage básico | Firebase Firestore     |
| **Arquitetura**  | Mais básica         | Múltiplos componentes  |
| **Design**       | Básico              | Responsivo + Moderno   |
| **Deploy**       | Vercel              | Vercel + API Functions |

## 🔥 Principais Melhorias Implementadas

### **Migração para Firebase**

- Substituição do localStorage por Firestore
- Persistência em nuvem com sincronização em tempo real

### **Design Responsivo**

- Implementação de Tailwind CSS
- Breakpoints para diferentes dispositivos
- Componentes adaptativos (drawer, tabela responsiva)

### **API Própria**

- Endpoint `/api/clientes` para restaurar dados base
- Deploy na Vercel com serverless functions
- Proxy configuration para desenvolvimento local

### **Feedback Personalizado**

- Estados de loading específicos para cada operação
- Mensagens contextuais e informativas
- Componente de loading reutilizável

### **Navegação Melhorada**

- Header responsivo com menu hambúrguer
- Drawer lateral para dispositivos móveis
- Navegação fluida e intuitiva

## 👨‍💻 Sobre o Desenvolvedor

Desenvolvido por **Renard Bergson** - [LinkedIn](https://www.linkedin.com/in/renardbergson/)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
