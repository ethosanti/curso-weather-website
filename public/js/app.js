console.log('Client side Javascript file is loaded!')
/* captura datos de una web le da formato json y despliega en consola del explorador
fetch('http://puzzle.mead.io/puzzle').then ((response)=>{
    response.json().then((data) =>{
        console.log(data)
    })

})

// captura desde la propia web que contiene este js/app.js
// para resultados ver consola developer de chrome
fetch('http://localhost:3000/weather?dir=panama').then ((response)=>{
    response.json().then((data) =>{
        console.log(data)
    })

})
*/
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mensajeUno = document.querySelector('#msg-1') //se usa el id del parrarfo
const mensajeDos = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()  //para controlar la salidas sin refrescar la pagina
    const location= search.value
    console.log('En prueba ...'+ location)
    //se elimino http://localhost:3000 por heroku
    fetch('/weather?dir='+location).then ((response)=>{
        response.json().then((data) =>{
            if(data.error){ //recordar if(body.features.length === 0) de geocode para dir=! no funciona
                console.log(data.error)
                mensajeUno.textContent=data.error
                mensajeDos.textContent=""
            }else{
                console.log(data.location)
                console.log(data.forecast)
                mensajeUno.textContent=data.location
                mensajeDos.textContent=data.forecast
            }
            
        })

    })

})


