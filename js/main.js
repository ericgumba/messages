let allMessages = document.getElementById('allMessages')


let sendMessage = document.getElementById('sendMessage')

let message = document.getElementById('userMessage')


let getAllMessages = async function(){
    let url = 'https://k887e1wr7b.execute-api.us-west-2.amazonaws.com/prod/message'
    let response = await fetch(url) 
    messages =  await response.json() 

    console.log(messages)
}
 

console.log("HELLO ")
getAllMessages()