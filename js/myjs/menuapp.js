var app = angular.module("myMenuApp", ['ngSanitize','ngRoute','ctrlModule','ngMessages']);

app.run(function($rootScope){
    console.log("RUN=====myMenuApp=====");
    $rootScope.isAdmin = false;
});

app.config(function($routeProvider){
    console.log("CONFIG=====myMenuApp=====");
    $routeProvider.when("/",{template:"<h3>Welcome to my restaurant</h3>"});
    $routeProvider.when("/menucard",{templateUrl:"partials/menucard.html"});
    $routeProvider.when("/menuitems",{templateUrl:"partials/menuitem.html",controller:"myMenuAppController"});
    $routeProvider.otherwise({template:"<h3>No Matching route found</h3>"});
    
    $routeProvider.when("/login",{templateUrl:"partials/login.html",controller:"loginController"});
    $routeProvider.when("/error",{template:"<h3>Invalid Credentials</h3>"});
    $routeProvider.when("/logout",{templateUrl:"partials/logout.html"});
    
    $routeProvider.when("/signup",{templateUrl:"partials/signup.html",controller:"signupController"});
});

app.filter("truncate",function(){
    return function(input,limit){
        var result = input.length>limit ? input.substr(0,limit) + "..." : input;
        return result;
    }
});