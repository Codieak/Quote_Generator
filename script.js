const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twiterbtn= document.getElementById('twitter');
const newQuotebtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

let apiQuotes=[];

//Show new Quotes
function newQuote(){
    loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    quoteText.textContent=quote.text;
    if(!quote.author){
        authorText.textContent='Unknown';
    }
    else{
        authorText.textContent=quote.author;
    }
    complete();
}


//Getting API Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){

    }
}
getQuotes();

//Share TO Twitter
function tweetQuote(){
    const twitterUrl = `https://www.twitter.com/intent/tweet?text=?${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Our Events
twiterbtn.addEventListener('click',tweetQuote);
newQuotebtn.addEventListener('click',newQuote); 
