# Documento de Requisitos e Escopo — Clarabela Doces

## 1. Tema do Projeto
Sistema de Gestão Operacional, Encomendas e Controle Financeiro para a Clarabela Doces.

## 2. Declaração do Problema
A doceria Clarabela Doces enfrenta dificuldades na gestão diária do negócio devido ao uso de anotações manuais e mensagens descentralizadas para registrar encomendas de bolos e doces finos. A ausência de um sistema integrado gera falhas na confirmação de pedidos, atrasos na produção por falta de organização da fila de trabalho, erros na conferência de pagamentos de sinal (entradas) e falta de controle exato sobre os custos e a lucratividade das vendas diárias e sazonais.

## 3. Usuários e Stakeholders
* **Proprietária / Gestora:** Responsável pela aprovação de orçamentos, acompanhamento do fluxo financeiro, validação de fichas técnicas e análise de relatórios de vendas.
* **Atendentes / Vendedores:** Responsáveis por registrar novos pedidos, emitir comprovantes/termos de encomenda para os clientes e atualizar o status do atendimento.
* **Equipe de Confeitaria / Produção:** Visualizam a fila de produção dos doces, verificam especificações dos pedidos e marcam os itens como prontos para entrega/retirada.
* **Clientes (Stakeholders externos):** Recebem confirmações de pedidos e comprovantes detalhados por e-mail.

## 4. Requisitos Funcionais (RF)
* **RF01 - Autenticação e Perfis de Acesso:** O sistema deve autenticar usuários separando as permissões entre Gestão, Atendimento e Confeitaria/Produção.
* **RF02 - Gestão de Pedidos e Encomendas:** O sistema deve permitir o cadastro detalhado de encomendas (cliente, data/hora de entrega, itens solicitados, observações de recheio/decoração e valor total).
* **RF03 - Editor de Termos com Assinatura:** O sistema deve permitir a emissão de um termo de encomenda/contrato com editor simples e coleta de assinatura digital do cliente na tela (para aprovação do modelo/sinal pago).
* **RF04 - Fluxo de Trabalho da Produção (Kanban/Status):** O sistema deve controlar o ciclo de vida do pedido por etapas (Solicitado -> Em Produção -> Pronto para Retirada -> Concluído).
* **RF05 - Disparo de E-mails Transacionais:** O sistema deve enviar e-mails automáticos ao cliente confirmando o pedido e avisando quando a encomenda estiver pronta para retirada.
* **RF06 - Gestão Financeira BÁSICA:** O sistema deve registrar entradas (vendas/sinais de pagamento) e saídas (compra de insumos/ingredientes) com cálculo automático do saldo de caixa.
* **RF07 - Relatórios de Vendas:** O sistema deve gerar relatórios sintéticos dos produtos mais vendidos e faturamento por período (diário, semanal e mensal).

## 5. Requisitos Não Funcionais (RNF)
* **RNF01 - Usabilidade e Simplicidade:** A interface deve ser simples e intuitiva, permitindo que a equipe cadastre um pedido em poucos cliques no balcão.
* **RNF02 - Responsividade:** O sistema deve funcionar perfeitamente em computadores do balcão e em tablets/celulares utilizados na cozinha.
* **RNF03 - Segurança dos Dados:** Os dados dos clientes e os relatórios financeiros devem ser protegidos com senhas criptografadas no banco de dados.

## 6. Definição de Escopo

### Dentro do Escopo (MVP Inicial)
* Cadastro de produtos, insumos e clientes.
* Módulo de registro de encomendas com geração de comprovante e assinatura em tela.
* Quadro visual de status de produção dos doces.
* Envio de e-mail automático ao cliente sobre a alteração do status da encomenda.
* Lançamento diário de caixa (entradas de vendas e saídas de custos).
* Banco de dados relacional (MySQL/PostgreSQL) para armazenamento das entidades.

### Fora do Escopo Inicial (Fases Futuras)
* E-commerce completo com pagamento online automatizado via PIX/Cartão no site.
* Integração direta com iFood ou serviços de entrega via API externa.
* Emissão automatizada de nota fiscal eletrônica (NFC-e).
