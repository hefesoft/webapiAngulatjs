(function () {
    'use strict';
    var controllerId = 'mockup';
    angular.module('app').controller(controllerId, ['common', 'datacontext', mockup]);

    function mockup(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: '',
            description: ''
        };
        vm.title = 'Mockup';
        vm.people = [];

        activate();

        function activate() {
            // En este array van las promesas que se deben cargar antes de inicializar el formulario
            var promises = [getPeople()];
            common.activateController(promises, controllerId)
                .then(function () { log('Formulario activado'); });
        }
        
        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
    }
})();