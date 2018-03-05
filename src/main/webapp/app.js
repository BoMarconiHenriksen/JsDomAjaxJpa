var dataFetched = {};

document.getElementById("btnsend").addEventListener("click", getData);

function getData() {
    
    let getSql = document.getElementById("btnsql").value;

    //Get user choice
    let gender = document.getElementById("gender").value;
    let region = document.getElementById("region").value;
    let amount = document.getElementById("amount").value;
    
    //Create url
    let baseUrl = "http://uinames.com/api/?";
    let amountUrl = "amount=" + amount;
    let regionUrl = "&region=" + region;
    let genderUrl = "&gender=" + gender;
    
    //Check for user choices
    if(gender === "both") {
        gender = "";
        genderUrl = "";
    }
    
    //Check for user choices
    if(region === "All") {
        region = "";
        regionUrl = "";
    }

    //Create url based on user choices
    let url = baseUrl + amountUrl + regionUrl + genderUrl;

    fetch(url) //returner objekt som promise
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Noget gik galt med fetch metoden! " + response.status.text);
            })
            .then(data => { //nu er data klar
        //Knovert object to array
                //Update the global object.
                dataFetched = data;
                
                // Use the regular Map constructor to transform a 2D key-value Array into a map
//                var myMap = new Map(kvArray);
                
                //use the keys or values iterators and convert them to an array
//                Array.from(myMap.keys()) //Will show ["key1", "key2"]
        
                //Laver rækken
                const rows = data.map(user => `<tr>
                                                <td>${user.name}</td>
                                                <td>${user.surname}</td>
                                                <td>${user.gender}</td></tr>`).join("\n");

                document.getElementById("tblbody").innerHTML = rows;
            })
            .catch(error => {
                document.getElementById("error").innerText = error.message;
            });
    
    //Press sql butoon not implemented
    if(getSql !== undefined) {
        console.log("Presed get sql...");
    }
            

}








