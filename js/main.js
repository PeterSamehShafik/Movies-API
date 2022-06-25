"use strict";

// loading screen
$(document).ready(function(){
    $('body').css('overflow','auto')
    $('.loading-screen').fadeOut(500)
})
/////////// end of loading screen

// navbar
$('.nav-btn').click(function () {
    $(this).toggleClass('fa-times') //change the button icon
    if ($('.nav-header').css('left') == '0px') {
        showNav()
    } else {
        hideNav()
    }
})
//functions of show & hide
function showNav() {
    $('.nav-header').animate({ 'left': '250px' })
    $('.nav-menu').animate({ 'width': '250px' })
    $('.nav-items a').each(function (i) {
        //for reminder only:
        //200*i for each one.. for example:
        // the first ele will 200*1 =200ms
        // the sec ele will 200*2 =400ms(from the first begining) etc...
        $(this).delay(200 * i).animate(
            {
                'margin-top': '0px',
                'opacity': '1'
            }, 500)
    })
}
function hideNav() {
    $('.nav-header').animate({ 'left': '0px' })
    $('.nav-menu').animate({ 'width': '0px' })
    $('.nav-items a').each(function (i) {
        $(this).delay(100 * i).animate(
            {
                'margin-top': '500px',
                'opacity': '0'
            }, 500)
    })
}
//add events to nav links
$('.nav-items ul').children().click(async function(){
    let genre = $(this).attr('id');
    await getData(genre)
    showData()
})
/////////// end of navbar


// Handling Data
let movies;
async function getData(genre='now_playing') {
    let response;
    if(genre =='trending'){
         response = await (await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=14e66f854e9919e2bea9065f6d24d42a`)).json() 
    }else{
        response = await (await fetch(`https://api.themoviedb.org/3/movie/${genre}?api_key=14e66f854e9919e2bea9065f6d24d42a&page=1`)).json()
    }
    movies = await response.results
    showData(movies)
}
async function getByWord(searchItem){
    let response;
    if(searchItem.length>=1){
        response =await(await fetch(`https://api.themoviedb.org/3/search/movie?api_key=14e66f854e9919e2bea9065f6d24d42a&query=${searchItem}&page=1`)).json()
        movies = await response.results
        showData(movies)
    }
}
function searchInPage(searchItem){
    let searchArray=[];
    for(let i=0; i<movies.length; i++){
        if(movies[i].title.toLowerCase().includes(searchItem.toLowerCase())){
            searchArray.push(movies[i])
        }
    }
    showData(searchArray)
}
async function showData(movies) {
    if(movies){
        $('main .row').html('') // clear the old results
        for (let i = 0; i < movies.length; i++) {
            $('main .row').append(`
            <div class="col-md-6 col-lg-4">
                <div class="item position-relative">
                <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" class="img-fluid rounded" alt="">
                <div class="layer">
                    <div class="item-info d-flex flex-column text-center">
                        <h2 class="name mb-4">${movies[i].title}</h2>
                        <p class="desc mb-4">${movies[i].overview}</p>
                        <span class="rate mb-4">rate: ${movies[i].vote_average}</span>
                        <span class="date">${movies[i].release_date}</span>
                    </div>
                </div>
                </div>
            </div>
        `)
        }
    }
}
//intialize the page with now playing
(async function(){
    await getData();
})();

/////////// end of hnadling data

//contact validatation
let contactInput=$('#contact input')
contactInput.each(function(i){
    $(this).on('input',()=>{
        checkValidate($(this).val(),i)
    })
})
let checks=[false,false,false,false,false,false]
let checkAll;
function checkValidate(value, inputNum){
    let name =0, email=1, phone=2,age=3, password=4,repass=5;
    let nameVal = /^[a-z ,.'-]+$/i;
    let emailVal= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneVal = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{5})$/;
    let ageVal = /^[1-9][0-9]?$/;
    let passVal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    //check the input indvidually 
    if(inputNum==name){
        if(nameVal.test(value)){
            contactInput[name].nextElementSibling.style.display='none'
            checks[name]=true;
        }else{
            contactInput[name].nextElementSibling.style.display='block'
            checks[name]=false;
        }
    }
    if(inputNum==email){
        if(emailVal.test(value)){
            contactInput[email].nextElementSibling.style.display='none'
            checks[email]=true
        }else{
            contactInput[email].nextElementSibling.style.display='block'
            checks[email]=false
        }
    }
    if(inputNum==phone){
        if(phoneVal.test(value)){
            contactInput[phone].nextElementSibling.style.display='none'
            checks[phone]=true
        }else{
            contactInput[phone].nextElementSibling.style.display='block'
            checks[phone]=false
        }
    }
    if(inputNum==age){
        if(ageVal.test(value)){
            contactInput[age].nextElementSibling.style.display='none'
            checks[age]=true
        }else{
            contactInput[age].nextElementSibling.style.display='block'
        }
    }
    if(inputNum==password){
        if(passVal.test(value)){
            contactInput[password].nextElementSibling.style.display='none'
            checks[password]=true
        }else{
            contactInput[password].nextElementSibling.style.display='block'
            checks[password]=false
        }
    }
    if(inputNum==repass){
        if(value==contactInput[password].value){
            contactInput[repass].nextElementSibling.style.display='none'
            checks[repass]=true
        }else{
            contactInput[repass].nextElementSibling.style.display='block'
            checks[repass]=false
        }
    }

    //check if all are true
    for(let i=0; i<checks.length;i++){
        checkAll=true;
        if(checks[i]==false){
            checkAll=false
            break;
        }
    }
    if(checkAll==true){
        $('#sumbit').removeClass('disabled')
    }else{
        $('#sumbit').addClass('disabled')
    }
}
/////////// end of validation



