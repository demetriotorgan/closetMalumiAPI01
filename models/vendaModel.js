const mongoose = require('mongoose');

const PagamentoSchema = new mongoose.Schema({
    data:{
        type:Date,        
    },
    valor:{
        type:Number
    }
});

const VendaSchema = new mongoose.Schema({
    cliente:{
        type:String
    },
    valor:{
        type:Number
    },
    produtos:{
        type:Array
    },
    pagamentos:{
        type:[PagamentoSchema]
    },
});

module.exports = mongoose.model('venda', VendaSchema);

