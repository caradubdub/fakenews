//objective: create a chrome extension that evaluates the reliability of websites presented in a google search
//parameters for the evaluation will be url, date, check if there is an author, number of sites linking to it, 
//how to present this info to the user? this website is reliable/ url 9/10 date 8/10 author ? Bias: 
//h3 selector is LC20LB DKV0Md

//get the search result URLs from the page
//perform some evaluation on them
//append a message to the matching search result heading.

let divs = document.querySelectorAll('.g');

//contains the full html of div // innerHTML contains HTML of element (ie h2) i think
// for (let node in divs) {
//     console.log(divs[node].outerHTML)
// }

// //gets only nodes that have titles
// for (let node in divs) {
//     if ((divs[node].innerText).length > 0) {
//         console.log(divs[node])
//     }
// }
// // and gets the urls
// for (let node in divs) {
//     if ((divs[node].innerText).length > 0) {
//         console.log(divs[node].querySelector("a").href)
//     }
// }
const getURLS = () => {
    let arr = [];
    for (let node in divs) {
        if (((divs[node].innerHTML) != undefined) && !(divs[node].innerText).includes("People also ask")) {
            if ((divs[node].innerHTML).includes('LC20lb DKV0Md')) {
                arr.push(divs[node].querySelector("a").href)
            }
        }
    }
    return arr
}
let urls = getURLS();
console.log(urls)
let titles = document.getElementsByClassName('LC20lb DKV0Md');
console.log(titles)
for (let i in titles) {
    if ((titles[i].innerText).length > 0) {
        let mess = document.createTextNode(' ' + urls[i])//why is this off by 1
        titles[i].appendChild(mess)
    }
}
// title.appendChild(mess) //<= but create a div
// //this selects the H3 divs with the search titles in them
// for (let i = 4; i < 14; i++) {
//     console.log(arr[i])
// }