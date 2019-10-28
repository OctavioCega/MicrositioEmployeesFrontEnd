angular.module("FinalApp")
    .controller("MainController", function ($scope, $resource, EmployeeResource) {
        $scope.employees = {};
        EmployeeResource.getEmployees().then(function (data) {
            console.log(data.data);
            //variable global que puedo utilizar
            //desde las views
            $scope.employees = data.data;
        });
    })

    .controller("SaveEmployeeController",function ($scope, $resource,$location,EmployeeResource) {
        $scope.employee = {};
        $scope.saveEmployee = function(employee){
            console.log("Intentando guardar " + employee)
            EmployeeResource.saveEmployee(employee).then(function (data) {
                console.log("Employee guardado " +  data.data);                    
                $location.path("/" + data.data.id);
            });
        }
    })
    .controller("SubmitEmployeeController", function ($scope, $routeParams, $location, EmployeeResource) {
        $scope.employee = {};

        //Editare o creare el usuario aqui si es que pase uno
        //Esto simplemente configura los inputs para rellenarlos si es que estamos por editar
        if ($routeParams.id) {
            console.log("Empleado a editar: " + $routeParams.id);
            //Creo el employee (este bloque se ejecuta en automatico cuando la vista invoca al controller)
            EmployeeResource.getEmployee({ id: $routeParams.id }).then(function (data) {
                console.log(data.data);
                $scope.employee = data.data;
                console.log("Empleado cargado : " + $scope.employee.id);
                //debo definir el modelo en el controlador y no en la vista
                //por eso si el input tiene un ng-model este no se vera afectado por un value=""
                //referencia https://stackoverflow.com/questions/10610282/angularjs-value-attribute-on-an-input-text-box-is-ignored-when-there-is-a-ng-m
                //respuesta de vojta
                //aqui el problema es mas bien la insconsistencia del "rest api" usado
                /*$scope.employee.name = $scope.employee.employee_name;
                $scope.employee.age = $scope.employee.employee_age;
                $scope.employee.salary = $scope.employee.employee_salary;
                */
                $scope.title = "Editando empleado: " + $scope.employee.id;
            });
        }
        else {
            $scope.title = "Crear nuevo empleado";
        }

        $scope.submitEmployee = function (employee) {
            console.log("Subiendo employee " + employee);
            //Si pase un id entonces quiero PUT
            if ($routeParams.id) {
                EmployeeResource.updateEmployee(employee).then(function (data) {
                    console.log(data.data);
                    $location.path("/");
                });
            }
            else {
                //entonces quiero POST
                EmployeeResource.saveEmployee(employee).then(function (data) {
                    console.log(data.data);                    
                    $location.path("/");
                });
            }
        }

    })
    .controller("EmployeeActionsController", function ($scope, EmployeeResource) {
        $scope.deleteEmployee = function (employee) {
            console.log("Empleado a eliminar: " + employee.id);
            EmployeeResource.deleteEmployee(employee).then(function (data) {
                console.log(data.data);
                console.log("Empleado " + employee.id + " eliminado");
            });
            //Elimino del array el empleado y automaticante el view se actualizara gracias al ng repeat
            //Ojo la lista de empleado sigue siendo la misma que cuando se cargo el sitio
            $scope.employees.splice($scope.employees.findIndex(item => item.id === employee.id), 1)

            //O puedo mejor mandar a actualizar employees... aqui solo estoy repitiendo el codigo del maincontroller
            //No funciono esto, no se actualizo automaticamente el ng repeat
            /*EmployeeResource.getEmployees().then(function (data) {
                console.log(data.data);
                $scope.employees = data.data.slice();
            });
            */

        }
    })

    .controller("GetEmployeeController", function ($scope, $routeParams, EmployeeResource) {
        $scope.employee = {};
        console.log("Empleado a ver: " + $routeParams.id);
        //Creo el employee
        $scope.employee = {};
        //si hacemos el {id: valor} estamos creando un objeto con una propiedad "id"
        EmployeeResource.getEmployee({ id: $routeParams.id }).then(function (data) {
            console.log(data.data);
            $scope.employee = data.data;
        });

    })
    ;