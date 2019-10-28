angular.module("FinalApp")
.factory("EmployeeResource",function($http){
    var employeesUrl = "http://localhost:8080/employees";
    //Me baso en el video 
    //https://www.youtube.com/watch?v=DYZ2jQxxKfI&list=PLhymOpdHzdWJSCfGdx5NAtrU6jjZjGEyE&index=3&t=6s
    //Aplico una estructura similar en el service agregando los metodos cruuuuddd
    var EmployeeResource ={

        getEmployees: function(){
            //ojo es get
            return $http.get(employeesUrl).success(function(data){
                return data;
            })
            .error(function(err){
                console.log(err);
            })
        },
        getEmployee: function(employee){
            return $http.get(employeesUrl + "/" + employee.id).success(function(data){
                return data;
            })
            .error(function(err){
                console.log(err);
            })
        },
        saveEmployee: function(employee){
            return $http.post(employeesUrl,employee).success(function(data){
                return data;
            })
            .error(function(err){
                console.log(err);
            })
        },
        updateEmployee: function(employee){
            return $http.put(employeesUrl + "/" +  employee.id,employee).success(function(data){
                return data;
            })
            .error(function(err){
                console.log(err);
            })
        },
        //Me baso en https://www.youtube.com/watch?v=D7P4NrXT_T8
        //min 6:58 para saber como pasar parametros a la url
        //era mas facil de lo que pensaba :v
        deleteEmployee: function(employee){
            return $http.delete(employeesUrl + "/" + employee.id).success(function(data){
                return data;
            })
            .error(function(err){
                console.log(err);
            })
        }
    };
    return EmployeeResource;
})
;