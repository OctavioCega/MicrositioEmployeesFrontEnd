angular.module("FinalApp",["lumx","ngRoute","ngResource"])
.config(function($routeProvider){
    $routeProvider
        .when("/",{
            controller: "MainController",
            templateUrl: "templates/home.html"
        })
        .when("/employees/submit",{
            controller: "SubmitEmployeeController",
            templateUrl: "templates/employee_form.html"
        })
        .when("/employees/submit/:id",{
            controller: "SubmitEmployeeController",
            templateUrl: "templates/employee_form.html"
        })
        .when("/employees/:id", {
			controller: "GetEmployeeController",
			templateUrl: "templates/employee.html"
        })			
        //Por default me envia al home si pongo una solicitud
        //a un recurso inexistente
        //Ref https://stackoverflow.com/questions/24228596/angularjs-ngroute-otherwise-not-working
        .otherwise({redirectTo:'/'})
});