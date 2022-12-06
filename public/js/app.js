console.log("client side js file")

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?place=boston').then((response)=>{
//     response.json().then((data) => {
//         if(data.error)
//         {
//             console.log(data.error)
//         }
//         else
//         {
//             console.log(data.forecast)
//             console.log(data.address)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')  
// #idName 
// .className
// messageOne.textContent = "From JavaScript"

weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = "loading..."
    messageTwo.textContent = " "

    fetch('http://localhost:3000/weather?place=' + location).then((response)=>
    {
        response.json().then((data) => {
            if(data.error)
            {
                // console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = " "
            }
            else
            {
                // console.log(data.address)
                messageOne.textContent = data.address
                // console.log(data.forecast)
                messageTwo.textContent = data.forecast
            }
        })
    })
})



