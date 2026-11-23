# Changelog — Sistema de Gestão Clarabela Doces

Todas as alterações notáveis deste projeto estão documentadas neste arquivo.

## [v1.0-final] - 2026-11-23
### Adicionado
- **Arquitetura Front-End Modular:** Separação completa entre estrutura (`src/index.html`), estilos (`src/css/style.css`), lógica (`src/js/app.js`) e imagens dos produtos (`src/img/`).
- **Catálogo Visual e Identidade Artesanal:** Cards interativos com fotos dos produtos, tipografia editorial (*Playfair Display* e *Plus Jakarta Sans*), ícones (*Lucide Icons*) e animações leves (*GSAP*).
- **Quitação Automática na Entrega:** Lançamento automático dos 50% restantes no fluxo de caixa (`D4 | Caixa`) quando o pedido atinge o status `Entregue`.
- **Seletor de Perfil e Filtros:** Troca de operador (`Atendimento` / `Gestão`) e abas de filtro na fila da confeitaria (`Todos`, `Em Aberto`, `Entregues`).
- **Documentação de Testes e Segurança (E6):** Plano de testes, casos de teste, registro de bugs e análise de segurança (`docs/testes_seguranca.md`).

### Corrigido
- **BUG-01:** Bloqueio de agendamentos com data/hora de entrega no passado por meio da validação `validarDataFutura()`.
- **BUG-02:** Sanitização de entradas de texto (`sanitizarTexto()`) para prevenção contra XSS na renderização dos cards.
- **BUG-03:** Implementação da função `limparAssinatura()` com reset automático do Canvas após cada registro.

## [v0.2.0-e5] - 2026-11-19
### Adicionado
- Painel interativo da **Fila de Produção da Confeitaria** com transição de status (`Solicitado` -> `Em Produção` -> `Pronto` -> `Entregue`).
- Controle acumulado de entradas de sinal (50%) no depósito `D4 | Caixa`.
- Análise Estruturada, Diagrama de Contexto (`DFDn0`), DFD Nível 1 (`DFDn1`) e Dicionário de Dados (`docs/analise_estruturada.md`).

## [v0.1.0-e3] - 2026-11-14
### Adicionado
- Modelagem Orientada a Objetos e Diagrama de Classes UML (`docs/modelo_oo.md`).
- Primeiro incremento funcional web com cálculo de sinal de 50% e captura de assinatura digital em Canvas HTML5.
