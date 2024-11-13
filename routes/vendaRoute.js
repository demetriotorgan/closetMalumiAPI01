const {Router} = require('express');
const { getVendas, saveVendas, deleteVenda } = require('../controllers/vendaController');
const {getCliente} = require('../controllers/clienteController');
const {addPagmento, deletePagamento, getPagamentosPorMes} = require('../controllers/pagamentoController');


const router = Router();

router.get('/', getVendas);
router.post('/vendas', saveVendas);
router.delete('/vendas/:vendaId', deleteVenda);

router.get('/vendas/clientes', getCliente);

router.get('/vendas/pagamentos', getPagamentosPorMes);
router.put('/vendas/:id/pagamentos', addPagmento);
router.delete('/vendas/:vendaId/pagamentos/:pagamentoId', deletePagamento);

module.exports = router;