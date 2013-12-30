(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Hot Towel Angular',
            description: 'Hot Towel Angular is a SPA template for Angular developers.',
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.values = [];
        vm.title = 'Dashboard';

        vm.NuevoEstudiante = function () {
            var estudiante = new Object();
            estudiante.Codigo = 3;
            estudiante.Nombre = 'Nuevo estudiante';
            datacontext.saveValue(estudiante).$promise.then(
                    function (e) {
                        vm.values.push(estudiante);
                    },
                    function (e) { alert(e);}
            );
        };

        vm.updateValue = function(estudiante) {
            datacontext.updateValue(estudiante).$promise.then(
                    function (e) {
                        // Metodo para actualizar
                    },
                    function (e) { alert(e); }
            );
        };

        vm.removeValue = function (element) {
            datacontext.removeValue(element).$promise.then(
                    function (succes) {
                        // funcion para eliminar elemento del array
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
    }
})();