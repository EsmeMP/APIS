// Se cumple o no se cumple

// // Funcion tipo collback recibe (resolove & reject)
const myPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
    const coin = Math.random()> 0.5?"Cara": "Cruz";
    if(coin === 'Cara')
        return resolve("Ganaste")
    else
        return reject("Perdiste");
    // return resolve ("Todo ok!")
    },1000);
})

myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error))