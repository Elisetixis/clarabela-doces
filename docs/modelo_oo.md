# Modelo Orientado a Objetos e Manutenção — Clarabela Doces (E3)

## 1. Classes Centrais do Projeto
* **Usuario:** Controle de acesso e perfis (Gestão, Balcão e Cozinha).
* **Cliente:** Dados cadastrais e contato dos clientes da doceria.
* **Produto:** Catálogo de bolos, doces e itens disponíveis para encomenda.
* **Encomenda:** Entidade principal do pedido, datas, status de produção, sinal e assinatura digital.
* **ItemEncomenda:** Detalhamento de produtos, quantidades e observações de cada encomenda.
* **MovimentacaoCaixa:** Controle financeiro diário de entradas e saídas.

## 2. Atributos, Operações e Relacionamentos

* **Usuario:** `id`, `nome`, `email`, `senhaHash`, `perfil` | *Ops:* `autenticar()`, `verificarPermissao()`
* **Cliente:** `id`, `nome`, `telefone`, `email` | *Ops:* `cadastrar()`, `atualizarContato()`
* **Produto:** `id`, `nome`, `categoria`, `precoBase` | *Ops:* `calcularPreco()`, `atualizarValor()`
* **Encomenda:** `id`, `dataPedido`, `dataEntrega`, `status`, `valorTotal`, `valorSinal`, `assinaturaBase64` | *Ops:* `adicionarItem()`, `calcularTotal()`, `registrarAssinatura()`, `avancarStatus()`
* **ItemEncomenda:** `id`, `quantidade`, `observacaoDecoracao`, `subtotal` | *Ops:* `calcularSubtotal()`
* **MovimentacaoCaixa:** `id`, `tipo`, `descricao`, `valor`, `dataHora` | *Ops:* `registrarLancamento()`, `calcularSaldoDia()`

### Relacionamentos
* **Cliente (1) ─── (0..*) Encomenda:** Associação (um cliente faz várias encomendas).
* **Encomenda (1) ◄─── (1..*) ItemEncomenda:** Composição forte (os itens pertencem à encomenda).
* **Produto (1) ─── (0..*) ItemEncomenda:** Associação (um produto aparece em vários itens).
* **Usuario (1) ─── (0..*) Encomenda:** Associação (um atendente registra várias encomendas).
* **Encomenda (1) ─── (0..1) MovimentacaoCaixa:** Associação (o sinal pago gera entrada no caixa).

## 3. Manutenção Futura Prevista
* **Mudança:** Integração com API de pagamento PIX para baixa automática do sinal de 50%.
* **Tipo:** **Manutenção Evolutiva**, por adicionar uma nova funcionalidade ao produto.
