let allMessages = document.getElementById('allMessages')


let sendMessage = document.getElementById('sendMessage')

let message = document.getElementById('userMessage')


let appendMessage = function(index, message){ 
    var node = document.createElement("ul");                 // Create a <ul> node
    var textnode = document.createTextNode(`post #${index}: \n ${message}`);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <ul>
    allMessages.appendChild(node);     // Append <li> to <ul> with id="myList"
}
let clearMessageBoard = function(){
    allMessages.innerHTML = `<div></div>`
}

let sortMessagesByDate = function(m){
    m.sort(function(a, b){return parseInt(a.date) - parseInt(b.date)});
    console.log("SORTED MESSAGES ", m)
    return m

}
let updateMessageBoard = async function(){

    clearMessageBoard() 
    
    let url = 'https://k887e1wr7b.execute-api.us-west-2.amazonaws.com/prod/message'
    let response = await fetch(url) 
    let data =  await response.json()  
    let messages = data.Items   
    messages = sortMessagesByDate(messages)
    messages.forEach( (item, index) => {  
        let message = item.message  
        appendMessage(index, message)
    });
}


let addMessageToBoard = async function(){
    let messageToAdd = message.value
    let dateMessageCreated = Date.now.toString()

    console.log("MESSAGE:", {messageToAdd})
    let url = 'https://k887e1wr7b.execute-api.us-west-2.amazonaws.com/prod/message'
    let header = {
        method: 'put',
        body: JSON.stringify({ date: dateMessageCreated, message: messageToAdd })
    } 
    let response = await fetch(url, header)  
    updateMessageBoard() 

}
 
updateMessageBoard()

sendMessage.addEventListener('click', addMessageToBoard)