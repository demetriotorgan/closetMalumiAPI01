const vendaModel = require('../models/vendaModel');

module.exports.addPagmento = async(req,res)=>{
    try {
        const vendaId = req.params.id;
        const novoPagamento = req.body.pagamentos;
        
        const vendaAtualizada = await vendaModel.findByIdAndUpdate(
            vendaId,
            {$push: {pagamentos:{$each: novoPagamento}}},
            {new: true}
        );
        if(!vendaAtualizada){
            return res.status(404).json({erro: 'Venda não encontrada'});
        }
        res.status(200).json({mensage:'Pagamento atualizado com sucesso', venda: vendaAtualizada});
    } catch (error) {
        res.status(500).json({message:'Erro ao atualizar pagamento da venda'});
    }
}

module.exports.getPagamentosPorMes = async(req,res)=>{
    try {
        const {mes, ano} = req.query;

        //Verifica se o mês e ano foram fornecidos
        if(!mes || !ano){
            return res.status(400).json({erro:'For favor forneça um mês e um ano válido'});            
        }
        const mesInt = parseInt(mes);
        const anoInt = parseInt(ano);

        if(isNaN(mesInt) || isNaN(anoInt) || mesInt < 1 || mesInt > 12){
            return res.status(400).json({erro:'Mês ou ano inválido'});
        }

        //Define o inicio e o fim do mês
        const inicioMes = new Date(anoInt, mesInt -1, 1);
        const fimMes = new Date(anoInt, mesInt, 1);

        //Consulta para encontrar todas as vendas que possuem pagamento no intervalo definido
        const vendas = await vendaModel.find({
            'pagamentos.data' : {$gte: inicioMes, $lt: fimMes}
        });

        //Filtrando pagamentos
        const resultado = vendas.map(venda=>({
            nome: venda.cliente,
            pagamentos: venda.pagamentos.filter(pagamento =>
                pagamento.data >= inicioMes && pagamento.data < fimMes
            )
        })).filter(venda => venda.pagamentos.length > 0);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({erro:'Erro ao buscar pagamentos'});
    }
}

module.exports.deletePagamento = async(req,res)=>{
    try {
        const {vendaId, pagamentoId} = req.params

        //Encontra a venda pelo ID e remove o pagamento específico
        const vendaAtualizada = await vendaModel.findByIdAndUpdate(
            vendaId,
            {$pull: {pagamentos:{_id: pagamentoId}}},
            {new:true} //Retorna o documento atualizado
        );
        //Verifica se a venda foi encontrada
        if(!vendaAtualizada){
            return res.status(400).json({erro:'Venda não encontrada'});
        }
        res.status(200).json({erro:'Pagamento removido com sucesso', venda: vendaAtualizada});
    } catch (error) {
        res.status(500).json({erro:'Erro ao remover pagamento'});
    }
}