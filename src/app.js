const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode1')
const forecast = require('./utils/forecast')
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))
const app = express()
//comentario para forzar git ...
//se indica a Express el motor de plantilla instalado ...hbs@4.1.2
// Define los path para Express
app.set('view engine','hbs')    //hay que eliminar el index.html statico, después de coiarlo en index.hbs
app.set('views', path.join(__dirname, '../templates/views'));//especifica donde estan las plantillas
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

//Configura directorio estatico 
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res)=>{   //captura la solictud el explorador internet ... index
    res.render('index',{
        titulo:'Plantilla Dinamica con HBS',
        usuario: 'santimateo'
    })     //rederiza la plantilla index.hbs

}) 

app.get('/about',(req, res)=>{
    res.render('about', {
        titulo: "Quienes Somos...HBS",
        mensaje1: "Trabajando con Nodejs;- plantillas"
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.dir){  //distinto de req.query.search .... capta la variable dir enviada por el explorador
        return res.send({
            error: "** Faltan parametros para la consulta ..."
        })
    }
    console.log(req.query.dir)

    geocode(req.query.dir, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({geocode: error})
        }
        console.log(location +'==> '+ latitude+' longitud => '+longitude)   //por default asigno las de Panama
        forecast(latitude, longitude ,(error, forcastData)=>{
            if(error){
                return res.send({forecast:error})
            }

            res.send( {
                forecast: forcastData,
                location,
                url:req.query   
            })
        })

    })
   /* res.send( {
        forecast: "Quiere llover ...",
        location: "Santiago",
        url:req.query.dir   //para que muestre parametro de busqueda dir
    })*/
})

app.get('/ayuda',(req, res)=>{
    res.render('ayuda', {
        titulo:"Quiero Ayudar :- HBS",
        mensaje: "Se han eliminado los archivos estaticos:index.html, about.html y help.html de ../public"
    })
})

app.get('/ayuda/*',(req, res)=>{   
    res.render('nfound', {
        titulo:"El articulo de ayuda no se encuentra :- HBS",
        
    })
})

app.get('*',(req, res)=>{   //generico debe colocarse de ultimo
    res.render('nfound', {
        titulo:"Page no found :- HBS",
        
    })
})

/* app.use esta renderizando index.htlm por lo cual este segmento no se va a ejecutar
app.get('', (req, res)=>{   //captura la solictud el explorador internet
    res.send('Hola expresss en action!')

})
*/
//app.use(express.static(path.join(__dirname, '../public/help.html'))) ...no es necesaria
/*app.get('/ayuda', (req, res)=>{
    res.send('Hola usted entr&oacute; en p&aacute;gina de AYUDA!')

})

app.get('/weather', (req, res)=>{
    res.send([{
        provincia:"Veraguas",
        capital: 'Santiago'
    },{
        provincia:'Cocle',
        capital: 'Penonome'
        }])

})
//app.use(express.static(path.join(__dirname, '../public/about.html')))...no es necesaria
app.get('/about', (req, res)=>{
    res.send('<h1>Se trata de una Prueba</h1>')

})*/

app.listen(3000, ()=>{
    console.log('Servidor activo en puerto 3000')

})





