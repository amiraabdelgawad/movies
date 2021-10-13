let apiResponse, responseData;
let imgSrc = "https://image.tmdb.org/t/p/w500";
let movies = [];


/******************side navbar********************/
$("#openBtn").click(function(){
    $("#openBtn").css("display","none");
    $("#closeBtn").css("display", "block");
    $("#sideNavbar").css("left","240px");
    $("#navMenu ul li").animate({opacity:"1",paddingTop:"25px"},1000)
    $("#navMenu").addClass("open");
    $("#navMenu").removeClass("close");
})
$("#closeBtn").click(function () {
    $("#openBtn").css("display", "block");
    $("#closeBtn").css("display", "none");
    $("#sideNavbar").css("left", "0px");
    $("#navMenu ul li").animate({ opacity: "0", paddingTop: "500px" },500);
    $("#navMenu").addClass("close");
    $("#navMenu").removeClass("open");
});

/******************movies api********************/
$(document).ready(function () {
    getMoviesData("now_playing")
});
async function getMoviesData(type){
    apiResponse = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=260e2dafbfd7bf87ccb64e60aebcdbc5&language=en-US&page=1`);
    responseData = await apiResponse.json();
    displayMovies();
}

async function getTrendingMoviesData(){
    apiResponse = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=260e2dafbfd7bf87ccb64e60aebcdbc5`);
    responseData = await apiResponse.json();
    displayMovies();
}
$("a[movieType]").click(function (e) { 
    let typeOfMovies = $(e.target).attr("movieType");
    if (typeOfMovies == "trending"){
        getTrendingMoviesData();
    }
    else{
    getMoviesData(typeOfMovies);
    }
});

function displayMovies(){
    movies = responseData.results;
    let cartona = "";
    for(let i=0;i<movies.length;i++){
        cartona += `<div class="col-lg-4 col-md-6 my-3 m-style">
                    <div class="movie position-relative overflow-hidden">
                        <img src="${imgSrc + movies[i].poster_path}" class ="w-100 img-fluid" alt="">
                        <div class="movie-info d-flex justify-content-center flex-column align-items-center text-center">
                            <h2>${movies[i].original_title}</h2>
                            <p>${movies[i].overview}</p>
                            <p>Rate:${movies[i].vote_average}</p>
                            <p>${movies[i].release_date}</p>
                        </div>
                    </div>
                </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
}
/******************search api********************/
function searchCurrentMovies(term){
    let cartona = "";
    console.log(term)
    for(let i=0;i<movies.length;i++){
        if (movies[i].original_title.toLowerCase().includes(term.toLowerCase())){
            cartona += `<div class="col-lg-4 col-md-6 my-3 m-style">
                    <div class="movie position-relative overflow-hidden">
                        <img src="${imgSrc + movies[i].poster_path}" class ="w-100 img-fluid" alt="">
                        <div class="movie-info d-flex justify-content-center flex-column align-items-center text-center">
                            <h2>${movies[i].original_title}</h2>
                            <p>${movies[i].overview}</p>
                            <p>Rate:${movies[i].vote_average}</p>
                            <p>${movies[i].release_date}</p>
                        </div>
                    </div>
                </div>`;
        }
        
    }
    document.getElementById("rowData").innerHTML = cartona;
}
async function searchApi(term) {
    apiResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=260e2dafbfd7bf87ccb64e60aebcdbc5&language=en-US&query=${term}&page=1&include_adult=false`);
    responseData = await apiResponse.json();
    displayMovies();
}
$("#apiSearch").keyup(function (e) { 
    searchApi(e.target.value);
});
$("#search").keyup(function (e) { 
    searchCurrentMovies(e.target.value);
});

/******************form validation api********************/
let submitBtn = document.getElementById("submit");
let passworValue ;
let counter = 0;
function userNameValidation(){
    let value = $("#userName").val();
    var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;
    if(regex.test(value)== true){
        $("#userName").addClass("is-valid");
        $("#userName").removeClass("is-invalid");
        $("#alertName").addClass("d-none");
        $("#alertName").removeClass("d-block");
        counter++;
        return true;
    }
    else{
        $("#userName").removeClass("is-valid");
        $("#userName").addClass("is-invalid");
        $("#alertName").removeClass("d-none");
        $("#alertName").addClass("d-block");
        return false;
    }
}

function userEmailValidation(){
    let value = $("#userEmail").val();
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
    if(regex.test(value)== true){
        $("#userEmail").addClass("is-valid");
        $("#userEmail").removeClass("is-invalid");
        $("#alertEmail").addClass("d-none");
        $("#alertEmail").removeClass("d-block");
        counter++;
        return true;
    }
    else{
        $("#userEmail").removeClass("is-valid");
        $("#userEmail").addClass("is-invalid");
        $("#alertEmail").removeClass("d-none");
        $("#alertEmail").addClass("d-block");
        return false;
    }
}

function phoneValidation(){
    let value = $("#phone").val();
    var regex = /^(01)[0125][0-9]{8}$/;
    if(regex.test(value)== true){
        $("#phone").addClass("is-valid");
        $("#phone").removeClass("is-invalid");
        $("#alertPhone").addClass("d-none");
        $("#alertPhone").removeClass("d-block");
        submitBtn.disabled == false;
        counter++;
        return true;
    }
    else{
        $("#phone").removeClass("is-valid");
        $("#phone").addClass("is-invalid");
        $("#alertPhone").removeClass("d-none");
        $("#alertPhone").addClass("d-block");
        submitBtn.disabled == true;
        return false;
    }
}

function ageValidation(){
    let value = $("#age").val();
    var regex = /^[1-9]{1}[0-9]{1}$/;
    if(regex.test(value)== true){
        $("#age").addClass("is-valid");
        $("#age").removeClass("is-invalid");
        $("#alertAge").addClass("d-none");
        $("#alertAge").removeClass("d-block");
        counter++;
        return true;
    }
    else{
        $("#age").removeClass("is-valid");
        $("#age").addClass("is-invalid");
        $("#alertAge").removeClass("d-none");
        $("#alertAge").addClass("d-block");
        submitBtn.disabled == true;
        return false;
    }
}
function passwordValidation(){
    let value = $("#password").val();
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(regex.test(value)== true){
        passworValue = value;
        $("#password").addClass("is-valid");
        $("#password").removeClass("is-invalid");
        $("#passwordAlert").addClass("d-none");
        $("#passwordAlert").removeClass("d-block");
        counter++;
        return true;
    }
    else{
        $("#password").removeClass("is-valid");
        $("#password").addClass("is-invalid");
        $("#passwordAlert").removeClass("d-none");
        $("#passwordAlert").addClass("d-block");
        submitBtn.disabled == true;
        return false;
    }
}
function repassValidation(){
    if(passworValue == $("#repass").val()){
        $("#repass").addClass("is-valid");
        $("#repass").removeClass("is-invalid");
        $("#alertRepass").addClass("d-none");
        $("#alertRepass").removeClass("d-block");
        counter++;
        return true;
    }
    else{
        $("#repass").removeClass("is-valid");
        $("#repass").addClass("is-invalid");
        $("#alertRepass").removeClass("d-none");
        $("#alertRepass").addClass("d-block");
        return false;
    }
}
function clear(){
    $("#userName").val("");
    $("#userEmail").val("");
    $("#age").val("");
    $("#phone").val("");
    $("#password").val("");
    $("#repass").val("");
}
$("#userName").keyup(function(){userNameValidation();});
$("#userEmail").keyup(function(){userEmailValidation();});
$("#phone").keyup(function(){phoneValidation();});
$("#age").keyup(function(){ageValidation();});
$("#password").keyup(function(){ passwordValidation();});
$("#repass").keyup(function(){ repassValidation();});
$("#contact .form-input input").change(function () { 
    submition();
});
submitBtn.addEventListener("click", clear)
function submition(){
    if(counter == 6){
        submitBtn.disabled = false;
    }
}