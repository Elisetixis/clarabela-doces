# Sistema de Gestão - Clarabela Doces 

## Objetivo do Projeto
Desenvolver um sistema web sob medida para a doceria **Clarabela Doces**, automatizando o registro de encomendas, o acompanhamento da fila de produção na confeitaria, a emissão de comprovantes com assinatura digital e o controle do fluxo de caixa diário.

## Usuários do Sistema
* **Gestão:** Acompanhamento financeiro, aprovação de orçamentos e relatórios de vendas.
* **Atendimento:** Cadastro de clientes, lançamento de encomendas e emissão de termos com assinatura.
* **Produção / Confeitaria:** Controle visual dos pedidos a serem produzidos e prazos de entrega.

## Funcionalidades Iniciais
- Autenticação com controle de níveis de acesso (RBAC).
- Cadastro de encomendas com detalhes de personalização e data de entrega.
- Emissão de termos de pedido com captura de assinatura digital (Canvas HTML5).
- Workflow de produção de doces (Solicitado -> Em Produção -> Pronto -> Concluído).
- Envio automático de e-mail com status do pedido para o cliente.
- Controle financeiro de entradas (sinal/vendas) e saídas (insumos).
- Relatórios básicos de faturamento e itens mais vendidos.

## Tecnologias Previstas
* **Front-end:** HTML, CSS, JavaScript
* **Back-end:** PHP / Python (FastAPI)
* **Banco de Dados:** MySQL / PostgreSQL
* **Controle de Versão:** Git & GitHub

## Equipe
* **Luiz** - *Desenvolvimento  / Arquitetura*
* **Daniel** - *Desenvolvimento / Documentação /Levantamento de Requisitos*
