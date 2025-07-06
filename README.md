# 👥 Cadastro de Clientes

Este é meu segundo projeto com Angular! Uma aplicação completa de cadastro de clientes que demonstra conceitos avançados do framework, incluindo Reactive Forms, Observables, integração com APIs externas e muito mais.

## 🚀 Live Demo

Acesse a aplicação aqui:  
🔗 [Build Vercel](https://cadastro-de-clientes-tan.vercel.app/consulta)

## 📸 Preview

> _Esta seção será atualizada com um vídeo ou GIF da aplicação em funcionamento._

## 📚 O que você encontrará aqui

### 🏗️ **Arquitetura e Estrutura**

- **Componentes Reutilizáveis:** Estrutura modular com componentes separados para formulário, tabela, header e footer
- **Serviços Especializados:** Separação clara de responsabilidades com serviços para clientes e integração com APIs
- **Models Tipados:** Interfaces TypeScript bem definidas para Cliente, Estado e Município
- **Roteamento:** Navegação entre páginas com Angular Router

### 📝 **Formulários Avançados**

- **Reactive Forms:** Implementação de formulários reativos ao invés de template-driven forms
- **Validações Assíncronas:** Verificação em tempo real de email e CPF únicos
- **Debounce:** Implementação de debounce (espera 2 segundos) antes de validar campos, evitando chamadas desnecessárias ao servidor
- **Máscaras:** Aplicação de máscaras nos campos de CPF e data de nascimento
- **Validações Customizadas:** Validações síncronas e assíncronas personalizadas

### 🔄 **Observables e Reatividade**

- **Observables Próprios:** Criação e gerenciamento de observables customizados (`Subject`)
- **Padrão Observer:** Implementação do padrão Observer para comunicação entre componentes
- **Gerenciamento de Estado:** Controle de estado reativo com observables para notificações de mudanças
- **Separação de Responsabilidades:** Feedback apenas no iniciador da ação, atualização de dados nos consumidores

### 🌐 **Integração com APIs**

- **Brasil API:** Consumo da API pública para listar estados e municípios
- **HTTP Client:** Uso do HttpClient do Angular para requisições HTTP
- **Tratamento de Erros:** Implementação robusta de tratamento de erros nas chamadas de API
- **Type Guards:** Verificação de tipos para garantir integridade dos dados recebidos

### 💾 **Persistência de Dados**

- **LocalStorage:** Armazenamento local dos dados dos clientes
- **CRUD Completo:** Operações de Create, Read, Update e Delete
- **Restauração de Dados:** Funcionalidade para restaurar dados originais
- **Validação de Dados:** Verificação de integridade dos dados armazenados

### 🎨 **Interface e UX**

- **ng-zorro-antd:** Framework de UI moderno e acessível
- **Feedback Visual:** Mensagens de sucesso e erro para todas as operações

### 🔍 **Funcionalidades Implementadas**

#### **Cadastro de Clientes**

- ✅ Formulário completo com validações
- ✅ Verificação de email e CPF únicos
- ✅ Integração com API de estados e municípios
- ✅ Máscaras nos campos (CPF, data)
- ✅ Debounce nas validações assíncronas

#### **Consulta e Listagem**

- ✅ Tabela paginada com dados dos clientes
- ✅ Busca por nome em tempo real
- ✅ Formatação de datas para exibição
- ✅ Ações de editar e excluir

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

- ✅ Restauração dos dados originais
- ✅ Controle de quantidade de clientes
- ✅ Notificações de mudanças via observables

## 🛠️ Tecnologias Utilizadas

- **Angular 19** - Framework principal
- **TypeScript** - Linguagem de programação
- **ng-zorro-antd** - Framework de UI
- **ngx-mask** - Biblioteca para máscaras
- **RxJS** - Biblioteca para programação reativa
- **Brasil API** - API pública para dados geográficos

## 🔧 Conceitos Avançados Demonstrados

### **Reactive Forms vs Template-Driven Forms**

Este projeto utiliza **Reactive Forms**, que oferecem:

- Maior controle sobre as validações
- Melhor performance para formulários complexos
- Facilidade para implementar validações customizadas
- Melhor testabilidade

### **Observables Próprios vs Nativos**

- **Observables Próprios:** Criados com `Subject` para comunicação entre componentes
- **Observables Nativos:** Utilizados do RxJS para operações HTTP e eventos

### **Debounce Implementation**

Implementação de debounce para evitar chamadas desnecessárias:

```typescript
private debounceTimer?: number;
private readonly debounceDelay: number = 2000;

// Aguarda 2 segundos antes de validar
```

### **Padrão Observer**

Separação clara entre quem inicia ações e quem reage:

- **Iniciador:** Exibe feedback
- **Consumidores:** Apenas atualizam dados

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
npm start
```

4. **Acesse no navegador:**

```
http://localhost:4200
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout/           # Componentes de layout
│   ├── pages/           # Páginas da aplicação
│   └── shared/          # Componentes e serviços compartilhados
│       ├── components/  # Componentes reutilizáveis
│       ├── models/      # Interfaces e tipos
│       ├── services/    # Serviços da aplicação
│       └── utils/       # Utilitários
└── assets/              # Recursos estáticos
```

## 🎯 Diferenças do Primeiro Projeto

Comparado ao [Shopping List](https://github.com/renardbergson/shopping-list), este projeto demonstra:

| Aspecto          | Shopping List       | Cadastro de Clientes   |
| ---------------- | ------------------- | ---------------------- |
| **Formulários**  | Template-driven     | Reactive Forms         |
| **Observables**  | Básicos             | Próprios + Nativos     |
| **APIs**         | Não utilizadas      | Integração completa    |
| **Validações**   | Simples             | Assíncronas + Debounce |
| **Persistência** | LocalStorage básico | CRUD completo          |
| **Arquitetura**  | Componente único    | Múltiplos componentes  |

## 👨‍💻 Sobre o Desenvolvedor

Desenvolvido por **Renard Bergson** - [LinkedIn](https://www.linkedin.com/in/renardbergson/)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
