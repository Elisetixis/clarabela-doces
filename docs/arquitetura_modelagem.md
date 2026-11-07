# Documentação de Arquitetura, Modelagem e Plano de Projeto — Clarabela Doces

## 1. Revisão de Requisitos (Ajustes E1)
* **RF01 - Autenticação por Perfil:** Login individual para Gestão, Balcão e Cozinha.
* **RF02 - Registro de Encomendas:** Cadastro de pedidos com data/hora de entrega, especificações de massa/recheio e valor total.
* **RF03 - Termo com Assinatura em Tela:** Emissão de comprovante e captura de assinatura digital (Canvas HTML5).
* **RF04 - Gestão de Produção (Kanban):** Mudança visual de status (Solicitado -> Na Cozinha -> Pronto -> Entregue).
* **RF05 - Notificação por E-mail:** Envio automático de confirmação e aviso de retirada para o cliente.
* **RF06 - Controle de Caixa Básico:** Registro diário de entradas (sinais/vendas) e saídas (compras de insumos).
* **RF07 - Relatórios Sintéticos:** Exibição do faturamento e produtos mais vendidos por período.

---

## 2. Arquitetura de Alto Nível (4 Blocos)

+-----------------------------------------------------------------------+
| 1. Interface Web (Front-end: HTML5, CSS3, JavaScript)                 |
|    - Telas de Atendimento (Balcão), Painel da Cozinha e Financeiro     |
+-----------------------------------+-----------------------------------+
                                    | HTTP / JSON (API REST)
+-----------------------------------+-----------------------------------+
| 2. Servidor de Aplicação (Back-end: PHP / Python FastAPI)             |
|    - Validação de Regras de Negócio e Controle de Fluxo de Produção   |
+-----------------+---------------------------------+-------------------+
                  |                                 |
+-----------------+---------------+   +-------------+-------------------+
| 3. Serviço de Notificação       |   | 4. Banco de Dados               |
|    - Envio de E-mails (PHPMailer|   |    - Armazenamento Relacional   |
|      / SMTP)                    |   |      (MySQL / PostgreSQL)        |
+---------------------------------+   +---------------------------------+

---

## 3. Diagramas UML

### Diagrama 1: Casos de Uso (Mapeamento de Atores)
* **Atendente (Balcão):** Cadastrar Encomenda, Coletar Assinatura do Cliente, Consultar Status.
* **Confeiteiro (Cozinha):** Visualizar Fila de Produção, Atualizar Status para "Pronto".
* **Gestor:** Lançar Saídas de Caixa, Visualizar Relatórios Financeiros.

### Diagrama 2: Sequência (Fluxo de Registro de Encomenda)
1. **Atendente -> Front-end:** Preenche os dados da encomenda e solicita assinatura.
2. **Cliente -> Front-end:** Assina no Canvas digital.
3. **Front-end -> Back-end:** Envia dados do pedido + imagem da assinatura (POST /encomendas).
4. **Back-end -> Banco de Dados:** Salva cliente, encomenda e valor do sinal pago.
5. **Back-end -> Serviço E-mail:** Dispara e-mail de confirmação ao cliente.
6. **Back-end -> Front-end:** Retorna confirmação de sucesso para o balcão.

---

## 4. Interfaces Principais e Dados Manipulados

* **Dados Principais (Entidades):**
  * `Cliente`: ID, Nome, Telefone, E-mail.
  * `Encomenda`: ID, Cliente_ID, Data_Entrega, Status, Valor_Total, Valor_Sinal, Assinatura_Path.
  * `Item_Encomenda`: ID, Encomenda_ID, Produto_ID, Quantidade, Observacao.
  * `Movimentacao_Caixa`: ID, Tipo (Entrada/Saída), Descricao, Valor, Data.

---

## 5. Plano de Projeto, Equipe e Riscos

* **Equipe:**
  * **Luiz:** Arquitetura do Sistema, Back-end e Banco de Dados.
  * **Daniel:** Front-end, Protótipos de Tela e Diagramas UML.
* **Riscos e Ações Preventivas:**
  1. *Falta de tempo por acúmulo de provas:* Manter tarefas curtas organizadas no repositório.
  2. *Dificuldade na integração da assinatura:* Fazer um teste rápido com biblioteca Canvas HTML5 na primeira semana.
* **Acompanhamento:** Reuniões breves de alinhamento e revisões pelo GitHub.
