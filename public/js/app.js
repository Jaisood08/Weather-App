
console.log("client side js")


const chuck =()=>{

    const location = document.getElementById('lname').value

    console.log("Location = ", location)

    if(location === "")
    {
        return alert("Provide Location Please");
    }

    fetch('/weather/?search='+location).then((resp)=>
    {
        resp.json().then((data)=>
        {
            console.log(data)
            if(data.error)
            {
                console.log(data)
                return alert(data.error);
            }

            document.getElementById("results").innerHTML = '';

            data.Locations.forEach(({index,Longitude,Latitude}) => 
            {
                fetch('/weather/Location?index='+index+'&Longitude='+Longitude+'&Latitude='+Latitude).then((resp_res)=>
                {
                    resp_res.json().then((result)=>
                    {
                        if(result.error)
                        {
                            console.log(result)
                            return alert(result.error);
                        }

                        const ul = document.createElement("ul");
                        for (const prop in result.Data) 
                        {
                            const l = document.createElement("li");
                            l.appendChild(document.createTextNode(prop +" : "+ result.Data[prop]));
                            ul.appendChild(l);
                        }
                        document.getElementById("results").appendChild(ul);
                        console.log("Data : ",result)
                    });
                });
            });
        })
    })

}


