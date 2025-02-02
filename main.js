//objective: create a chrome extension that evaluates the reliability of websites presented in a google search
//parameters for the evaluation will be url, date, check if there is an author, number of sites linking to it, 
//how to present this info to the user? this website is reliable/ url 9/10 date 8/10 author ? Bias: 
//h3 selector is LC20LB DKV0Md

//get the search result URLs from the page
//perform some evaluation on them
//append a message to the matching search result heading.
//https://www.allsides.com/media-bias/media-bias-ratings
//https://mediabiasfactcheck.com/conspiracy/
let news = {
    'abcnews': { lean: 'Lean Left', trust: 3 },
    'alternet': { lean: 'Left', trust: 1 },
    'apnews': { lean: 'Lean Left', trust: 2 },
    'ap.org': { lean: 'Center', trust: 3 },
    'bbc': { lean: 'Center', trust: 3 },
    'bloomberg': { lean: 'Lean Left', trust: 3 },
    'cbs': { lean: 'Lean Left', trust: 3 },
    'cnn': { lean: 'Lean Left', trust: 3 },
    'dailymail.co.uk': { lean: 'Right', trust: 3 },
    'foodbabe': { lean: 'Pseudoscience/Conspiracy', trust: 0 },
    'forbes': { lean: 'Center', trust: 3 },
    'foxnews': { lean: 'Lean Right', trust: 3 },
    'huffpost': { lean: 'Left', trust: 3 },
    'msnbc': { lean: 'Left', trust: 3 },
    'nbcnews': { lean: 'Lean Left', trust: 3 },
    'npr': { lean: 'Center', trust: 3 },
    'nypost': { lean: 'Lean Right', trust: 3 },
    'nytimes': { lean: 'Lean Left', trust: 3 },
    'reuters': { lean: 'Center', trust: 3 },
    'thehill': { lean: 'Center', trust: 3 },
    'wsj': { lean: 'Center', trust: 3 },
    'washingtonpost': { lean: 'Lean Left', trust: 3 }
}
let div = document.querySelectorAll('.g');
let divs = [];
div.forEach(el => { if (el.className != 'g kno-kp mnr-c g-blk') { divs.push(el) } })

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
        if (((divs[node].innerHTML) != undefined)) {
            if ((divs[node].innerHTML).includes('LC20lb DKV0Md')) {
                arr.push(divs[node].querySelector("a").href)
            }
        }
    }
    return arr
}
let urls = getURLS();
//console.log(urls)

//if (((divs[node].innerHTML) != undefined) && !(divs[node].innerText).includes("People also ask")) {

let titles = document.getElementsByClassName('LC20lb DKV0Md'); //'yuRUbf'
//console.log(titles)
for (let i in titles) {
    //if ((titles[i].innerText).length > 0) {
    let domain = urls[i].split('/').slice(0, 3).join('/');
    let trustcount = 0;
    let source = 'not known';
    let name = domain.split(".").slice(-2, -1)
    if (name == "google") { //do we still need this?
        i++;
        continue;
    }
    console.log(domain, trustcount, name)
    //if url contains .org or .edu
    if (urls[i].includes('.org') || urls[i].includes('.edu') || urls[i].includes('.gov') || urls[i].includes('.int')) {
        trustcount += 2;
    }
    if (urls[i].includes('https')) {
        trustcount += 1;
    }
    if (urls[i].includes('.com')) {
        trustcount += 1;
    }
    if (news[name] != undefined) {
        //console.log(name)
        source = news[name].lean;
        //console.log(news[name].trust)
        trustcount += news[name].trust;
        // console.log('after adding', trustcount)
    }
    // for (let key in news) {
    //     if (domain.includes(key)) {
    //         console.log(domain)
    //         source = news[key].lean;
    //         console.log(news[key].trust)
    //         trustcount += news[key].trust;
    //         console.log('after adding', trustcount)
    //         break;
    //     }
    // }
    // create get request to check links to domain

    fetch(`${urls[i]}`)
        .then((response) => (response.text()))
        .then(data => console.log(data))
        .catch(error => { console.log(error) })
    // function displayData(data) {
    //     console.log(data.text())
    // }
    //     let listOfScripts = document.getElementsByTagName('script');
    //     console.log(listOfScripts)
    //     console.log(listOfScripts.length)
    //     console.log(typeof listOfScripts)
    //     let importantInformation;
    //     // loop through the script elements to find ones with the type 'application/ld+json' which has the information we need
    //     for (let i = 0; i < listOfScripts.length; i++) {
    //         if (listOfScripts[i].type === 'application/ld+json') {
    //             console.log(listOfScripts[i])
    //             //         //assign the variable with the content from the script that we want and JSON.parse it to convert it from a string to an object
    //             //         importantInformation = JSON.parse(listOfScripts[i].innerHTML);
    //             //     }
    //             // }
    //             // for example, we can now pull the author information
    //             //console.log(importantInformation.creator);
    //         }
    //     }
    // }
    // .then(function (response) {
    //     switch (response.status) {
    //         // status "OK"
    //         case 200:
    //             return response.text();
    //         // status "Not Found"
    //         case 404:
    //             throw response;
    //     }
    // })
    // .then(function (data) {
    //     console.log(data);
    // })
    // .catch(function (response) {
    //     // "Not Found"
    //     console.log(response.statusText);
    // });


    let mess = document.createElement('span')

    mess.style.fontSize = '1em'
    mess.id = 'span' + i;
    mess.style.border = "1px solid black";
    mess.removeAttribute('href');
    mess.style.textDecoration = "none";
    //console.log('before computing', trustcount)
    if (trustcount <= 1) {
        mess.style.color = 'red';
        mess.innerText = `Quality: Uncertain; Source bias: ${urls[i], source}`;
    }
    if (trustcount === 2) {
        mess.style.color = 'orange';
        mess.innerText = `Quality: OK; Source bias: ${urls[i], source}`;
    }
    if (trustcount > 2) {
        mess.style.color = 'darkgreen';
        mess.innerText = `Quality: Good; Source bias: ${urls[i], source}`;
    }
    titles[i].appendChild(mess)
    // }
}




