const vendaModel = require('../models/vendaModel');

module.exports.getCliente = async(req,res)=>{
    const nome = req.query.nome
        if(!nome || nome.length == 0){
            return res.status(400).json({erro:'Forneça uma inicial válida'})
        }
        try {
            const regex = new RegExp(nome, 'i');
            const clientes = await vendaModel.find({
                cliente: regex
            });
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao buscar clientes', error);
            res.status(500).json({erro: 'Erro ao buscar clientes'});
        }
}