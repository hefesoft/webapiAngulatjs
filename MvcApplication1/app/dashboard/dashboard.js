(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', '$modal', dashboard]);

    function dashboard(common, datacontext, $modal) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var estudianteSeleccionado;

        var vm = this;
        vm.news = {
            title: 'Hot Towel Angular',
            description: 'Hot Towel Angular is a SPA template for Angular developers.',
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.values = [];
        vm.title = 'Dashboard';

        vm.NuevoEstudiante = function (estudiante) {
            datacontext.saveValue(estudiante).$promise.then(
                    function (e) {
                        vm.values.push(estudiante);
                    },
                    function (e) { alert(e);}
            );
        };

        vm.updateValue = function (estudiante) {
            datacontext.updateValue(estudiante);
        };

        vm.removeValue = function (element) {
            datacontext.removeValue(element).$promise.then(
                    function (succes) {
                        vm.values = _(vm.values).reject(function(el) {
                             return el.Codigo === element;
                        });
                    },
                    function (error) {
                        alert(error);
                    }
            );
        };

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople(), obtenerValues()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function obtenerValues() {
            vm.values = datacontext.obtenerValues();
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
        
        vm.VentanaNuevoEstudiante = function () {
            var modalInstance = $modal.open({
                controller: controlRegistro,
                templateUrl: 'nuevoEstudiante.html',
                resolve: {
                    estudiante: function () {
                        return ;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };
        
        vm.VentanaEditarEstudiante = function (estudiante) {
            var modalInstance = $modal.open({
                controller: controlRegistro,
                templateUrl: 'nuevoEstudiante.html',
                resolve: {
                    estudiante: function () {
                        return estudiante;
                    }
                }
            });

            modalInstance.result.then(function () {
            }, function () {

            });
        };
        
        var controlRegistro = function ($scope, $modalInstance, estudiante) {
            
            if (estudiante === undefined) {
                $scope.estudiante = { Nombre: null };
                $scope.accion = "Guardar";
            } else {
                $scope.estudiante = estudiante;
                $scope.accion = "Editar";
            }
            
            $scope.ok = function () {
                if (estudiante === undefined) {
                    vm.NuevoEstudiante($scope.estudiante);
                } else {
                    vm.updateValue($scope.estudiante);
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }
})();