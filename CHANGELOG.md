# Changelog — Sistema de Gestão Clarabela Doces

Todas as alterações notáveis deste projeto são documentadas neste arquivo.

## [v0.2.0-e5] - 2026-11-19
### Adicionado
- **Fila de Produção (Confeitaria):** Painel interativo para acompanhamento de pedidos e transição de status (`Solicitado` -> `Em Produção` -> `Pronto` -> `Entregue`).
- **Controle de Caixa Acumulado:** Soma automática das entradas de sinal (50%) no depósito `D4 | Caixa`.
- **Botão Limpar Assinatura:** Permite refazer a assinatura no Canvas em caso de erro no traço.
- **Documentação Estruturada (E4):** Diagrama de Contexto (`DFDn0`), DFD Nível 1 (`DFDn1`) e Dicionário de Dados (`docs/analise_estruturada.md`).

### Corrigido (Bug / Melhoria Registrada)
- **Bug corrigido:** Na versão `v0.1.0-e3`, se o cliente errasse a assinatura no Canvas ou registrasse um segundo pedido em seguida, o traço anterior permanecia travado na tela (`assinou = true`) sem opção de limpeza. Adicionada a função `limparAssinatura()` e o reset automático do Canvas após cada registro.

## [v0.1.0-e3] - 2026-11-14
### Adicionado
- Modelagem Orientada a Objetos e Diagrama de Classes UML (`docs/modelo_oo.md`).
- Primeiro incremento funcional web (`src/index.html`) com cálculo de sinal de 50% e assinatura digital.
