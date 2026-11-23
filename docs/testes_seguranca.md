# Plano de Testes, Bugs e Análise de Segurança — Clarabela Doces (v1.0-final)

## 1. Plano e Casos de Teste
Cobertura dos requisitos críticos: cálculo financeiro, validação de data, fluxo de produção e registro em caixa.

| ID | Nível | Cenário / Requisito | Entrada | Resultado Esperado | Resultado Obtido | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CT-01** | Unitário | Cálculo de total e sinal (50%) | `preco = 140`, `qtd = 2` | `total = 280.00`, `sinal = 140.00` | Retornou `280.00` e `140.00` | Aprovado |
| **CT-02** | Unitário | Bloqueio de data retroativa | `dataEntrega = "2025-05-10T14:00"` | `validarDataFutura()` retorna `false` e exibe erro | Erro exibido e envio bloqueado | Aprovado |
| **CT-03** | Integração | Registro de encomenda + lançamento automático no Caixa (`D4`) | Pedido de R$ 110,00 com assinatura válida | Pedido entra na fila e Caixa soma `+ R$ 55,00` | Saldo atualizado para `R$ 55,00` | Aprovado |
| **CT-04** | Sistema | Ciclo completo até entrega e quitação dos 50% restantes | Avançar status até `Entregue` | Status final `Entregue` e caixa recebe os `50%` finais | Caixa somou os 100% do pedido | Aprovado |
| **CT-05** | Aceitação | Operação de balcão e cozinha pelo usuário final | Cadastro completo + limpeza de assinatura | Fluxo claro, sem travamentos e comprovante legível | Validado com sucesso | Aprovado |

## 2. Registro de Bugs Encontrados e Correções
* **BUG-01 (Severidade Média):** O formulário aceitava datas de entrega no passado, gerando ordens inválidas para a cozinha.  
  * **Correção:** Implementada a função `validarDataFutura()` antes do registro da encomenda.
* **BUG-02 (Severidade Baixa):** Risco de injeção de HTML/script caso o nome do cliente contivesse tags `<script>`.  
  * **Correção:** Implementada a função `sanitizarTexto()` antes de renderizar os cards na fila de produção.

## 3. Análise Básica de Segurança
* **Dados Sensíveis:** O sistema manipula nome, telefone/WhatsApp e assinatura digital do cliente. Minimiza-se a coleta apenas ao estritamente necessário (princípio da minimização da LGPD).
* **Autenticação e Autorização:** Na v1.0 client-side há seleção de contexto operacional (`Atendimento` vs. `Gestão`); para a evolução em servidor (FastAPI/MySQL), está previsto login com senhas em hash `bcrypt` e controle de acesso por perfil (RBAC).
* **Validação de Entradas:** Campos obrigatórios validados antes do processamento, limite de caracteres (`maxlength`) e sanitização contra XSS via `sanitizarTexto()`.
* **Segredos e Credenciais:** Nenhuma chave de API, senha ou token encontra-se hardcoded no repositório público.
* **Dependências:** Aplicação construída em HTML5, CSS3 e JavaScript puro (zero dependências externas de terceiros, eliminando riscos de vulnerabilidades em pacotes npm/CDN).
* **Riscos Residuais:** Por operar localmente em memória do navegador nesta release `v1.0-final`, os dados não persistem após recarregar a página (F5) e não há criptografia em repouso em banco de dados, risco já mapeado para a próxima etapa de implantação com back-end e HTTPS.
