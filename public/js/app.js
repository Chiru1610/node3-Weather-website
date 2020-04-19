
fetch('http://puzzle.mead.io/puzzle').then((response) =>{

    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event) =>{
     event.preventDefault()
     const location = search.value
     messageOne.textContent='loading ... '
     fetch('/weather?address='+ location).then((response)=>{

        response.json().then((data)=>{
            if(data.error){
                messagetwo.textContent=data.error
                   messageOne.textContent ='';

            }else{
                messageOne.textContent =data.location
                messagetwo.textContent=data.forecast
            }
            
            
        })
    
    })


})
