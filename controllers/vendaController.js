const vendaModel = require('../models/vendaModel');

module.exports.getVendas = async(req,res)=>{
    const vendas = await vendaModel.find()
    res.send(vendas);
}

module.exports.saveVendas = async(req,res)=>{
    const {cliente, valor, produtos, pagamentos} = req.body;
    vendaModel
        .create({cliente, valor, produtos, pagamentos})
        .then((data)=>{
            console.log('Venda cadastrada com sucesso');
            console.log(data);
            res.send(data);
        })
}

module.exports.deleteVenda = async(req, res)=>{
    try {
        const {vendaId} =req.params
        //Encontra a venda pelo ID e remove
        const vendaRemovida = await vendaModel.findByIdAndDelete(vendaId);

        //Verifica se a venda foi encontrada e removida
        if(!vendaRemovida){
            return res.status(404).json({erro:'venda não encontrada'});
        }
        res.status(200).json({message:'Venda removida com sucesso', venda: vendaRemovida});        
    } catch (error) {
        res.status(500).json({erro:'Erro ao remover vanda'})
    }
}

