const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");

    // console.log("Mission Accomplished");
   // res.send("Server is up and running");
})

app.post("/",function(req,res){
    const query=req.body.CityName;
const appi="c3d0a1d1649c399db04608f72b19809a";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appi+"&units="+unit;

https.get(url,function(response){
    console.log(url);
     console.log(response.statusCode);

      
     response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const tempe=weatherData.main.temp;
        const description=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>the description of weather is currently "+ description +" don </p>");
        res.write("<h1>The temperature of "+query+ " is "+ tempe +" degree celcius</h1>");
        res.write("<img src=" +imageurl +">");
        res.send();
     })
    
})
})




app.listen(3000,function(){
    console.log("Server started on port 3000");
});