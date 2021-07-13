const mercadoPago = require('mercadopago');
const mercadoPagoController = {};
const ispaid = new Boolean(false);
const url = require('url');
const pool = require('../../database');
let id = '';
let iddocent = '';
let monto;
//Credentials 
mercadoPago.configure({
    access_token : `TEST-3122964072939737-063001-244415f3891992caa450d5c566662e4d-782364957`
})



mercadoPagoController.checkout = async(req,res,next) =>{
    const {title, price} = req.body;
    let preferences = {
        items :[
            {
            title : title,
            unit_price : Number(price),
            quantity : 1
            }],
            back_urls : {
            success : 'http://localhost:3000/dashboard/participar',
           
            
            },
            auto_return: "approved",
        


    }
    mercadoPago.preferences.create(preferences)
    .then((response) =>{
            res.status(200).json(response.body)
             id = response.body.id;
            console.log("id generado por compra = "  + id)
    }).catch((error) =>{
        console.log(error)
    })


}
mercadoPagoController.approved = async(req,res,next) =>{
    try {
        const {price, iddocente} = req.body;
        await pool.query('insert into preinscripcion(fecha_pago,monto, pago_v) values($1,$2,$3)', [new Date().getDate(), price, '1'])
        const idprelast = await pool.query(`SELECT *
        FROM preinscripcion
        ORDER by id_pre DESC
        LIMIT 1;`)
  
        await pool.query('Update nominas_docentes SET id_pre = $1 where iddocente = $2', [idprelast.rows[0].id_pre, iddocente ])
        
        
          res.status(200).json({
              pago : "Verficado",
              idpre : idprelast.rows[0].id_pre
          })
     
    
    } catch (error) {
        console.log(error)
    }


  

  

}




module.exports = mercadoPagoController;






