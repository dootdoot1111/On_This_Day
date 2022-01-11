var url = "https://byabbe.se/on-this-day/"

var xhr = new XMLHttpRequest();

var date = new Date();
var month = String(date).split(" ")[1];
var day = date.getDate();
var year = date.getFullYear();
var month_num = (date.getMonth()+1);

var today = month + " " + day + " " + year;

function urlMod(url, month_num, day)
{
    return url + "/" + month_num + "/" + day + "/" + "events.json";
}

function callback(json_data)
{
    const nums_arr = [];

    for(let i = 0; i < 3; i++)
    {
        while(true)
        {
            var num = Math.random() * (json_data.events.length) | 0;
            if(!nums_arr.includes(num))
            {
                nums_arr.push(num);
                break;
            }
        }

        var doc = document.getElementById("fact");
        const li = document.createElement("li");
        const b = document.createElement("b");
        const tnode0 = document.createTextNode(json_data.events[num].year + ": ");
        const tnode1 = document.createTextNode(json_data.events[num].description);

        b.appendChild(tnode0);
        li.appendChild(b);
        li.appendChild(tnode1);
        doc.appendChild(li);
    }
}

function httpGetAsync(url, callback)
{

    xhr.onreadystatechange = function() {

        if(xhr.readyState == 4 && xhr.status == 200)
        {
            callback(JSON.parse(xhr.responseText));
        }
    }

    xhr.open("GET", url, true);
    xhr.setRequestHeader("accept", "application/json");
    xhr.send(null);

}
var txt_date = document.createTextNode(today);
document.getElementById("todays_date").appendChild(txt_date);

httpGetAsync(urlMod(url, month_num, day), callback);