const url = "https://api.spaceflightnewsapi.net/v4/articles/?limit=12";
let next="";
let pre="";

window.addEventListener('load', ()=>getNewsData(url));

async function getNewsData(url){


    const request = await fetch(url);
    const response = await request.json();
    const data = response.results;

    //console.log(response);

    const ran = Math.floor(Math.random() * 12);


    document.getElementById("b").style.backgroundImage=`url(${data[ran].image_url})`;


    const cards = document.getElementById("cols");
    const template = document.getElementById("tem");

    cards.innerHTML = '';


    data.forEach(element => {
        const colClone = template.content.cloneNode(true);

        const img = element.image_url;
        colClone.getElementById("im").src=img;
        colClone.getElementById("ct").innerHTML=element.title;
        colClone.getElementById("link").href=element.url;
        colClone.getElementById("ns").innerHTML=`<b>${element.news_site}</b>`;
        // if (element.featured=="true") {
        //     colClone.getElementById("fe").innerHTML="featured";
        // }
        colClone.getElementById("summ").id = element.id;

        colClone.getElementById(`${element.id}`).addEventListener("click", ()=>{
            //This will not update the offcanvas

            // colClone.getElementById("offcanvasRight").innerHTML=
            // `<div class="offcanvas-header">
            // <h5 id="offcanvasRightLabel">${element.title}</h5>
            // <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            // </div>
            // <div class="offcanvas-body">
            //     ${element.summary}
            // </div>`;

            // This will update the offcanvas
            const offcanvas = document.getElementById("offcanvasRight");
    
            // Update the offcanvas content dynamically
            offcanvas.innerHTML = `
                <div class="offcanvas-header">
                    <h5 id="offcanvasRightLabel">${element.title}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    ${element.summary}
                    <br>
                    <p> -by <a href=${element.url}>${element.news_site}</a></p>
                    <p>Published at: ${element.published_at}</p>
                    <p>Updated at: ${element.updated_at}</p>
                    <img src=${element.image_url} style="height: 15rem; width: 22rem;">
                    <center><a href=${element.url}><button style="margin-top: 1rem;" type="button" class="button btn-dark">Visit</button></a></center>
                </div>`;
        });


        cards.appendChild(colClone);


    });

    // if (response.previous===null) {
    //     document.getElementById("pre").style.display="none";
    // }

    // else if (response.next===null) {
        
    //     document.getElementById("next").style.display="none";
    // }
    // else if (response.previous!==null) {
    //     document.getElementById("pre").style.display="block";
    // }else if (response.next!==null) {
    //     document.getElementById("next").style.display="block";
    // }

    // Handle previous button visibility
    if (response.previous === null) {
        document.getElementById("pre").style.display = "none";
    } else {
        document.getElementById("pre").style.display = "block";
    }

    // Handle next button visibility
    if (response.next === null) {
        document.getElementById("next").style.display = "none";
    } else {
        document.getElementById("next").style.display = "block";
    }


    next = response.next;
    pre = response.previous;

}



document.getElementById("next").addEventListener("click", ()=>{
    
    getNewsData(next);
});

document.getElementById("pre").addEventListener("click", () => {
    getNewsData(pre);
});


// document.getElementById("s-form").addEventListener("input", (e)=>{

//     // e.preventDefault();
//     let search = document.getElementById("key").value.trim();
//     if(search===""){
//         getNewsData(url);
//     }else{
//     console.log(search);
//     search = search.replace(/\s+/g, "+");
//     let searchURL = `https://api.spaceflightnewsapi.net/v4/articles/?limit=12&search=${search}`;
//     console.log(searchURL);
//     getNewsData(searchURL);
//     }
// });    // This good, but below is the modified version og this:


//modified version

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("key");
    const searchForm = document.querySelector(".d-flex");

    // Prevent the form from submitting when the enter key is pressed or the button is clicked
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();  // Prevent form submission and page reload
    });

    // Listen for real-time input changes in the search bar
    searchInput.addEventListener("input", () => {
        let search = searchInput.value.trim();  // Get search term and trim spaces

        if (search === "") {
            // If search field is empty, load the base URL data
            getNewsData(url);
        } else {
            // Otherwise, perform the search
            search = search.replace(/\s+/g, "+");  // Replace spaces with "+"
            let searchURL = `https://api.spaceflightnewsapi.net/v4/articles/?limit=12&search=${search}`;
            getNewsData(searchURL);  // Fetch search results
        }
    });
});






