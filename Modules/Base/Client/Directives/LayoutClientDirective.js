'use strict';

angular.module('Base').directive('layoutNavigationBar', ['Menu', function(Menu) {
		return {
			restrict: 'A',
			replace: true,
			scope: {},
			templateUrl: '/Modules/Base/Templates/NavigationBarTemplate.html',
			link: function($scope, elem, attr) {
				$scope.Menu = Menu;
				
				Menu.AddMenuItem({ Titulo: 'Análise', Tipo: 'header'});
				Menu.AddMenuItem({ Titulo: 'Dashboard', Link: '/#!/Dashboard', Icon: 'area chart', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Relatórios', Link: '/#!/Relatorios', Icon: 'calculator', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Histórico', Link: '/#!/Historico', Icon: 'history', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Gerenciamento', Tipo: 'header'});
				Menu.AddMenuItem({ Titulo: 'Escolas', Link: '/#!/Escolas', Icon: 'university', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Passageiros', Link: '/#!/Passageiros', Icon: 'users', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Cálculo de Rotas', Link: '/#!/CalculoDeRotas', Icon: 'marker', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Veículo', Link: '/#!/Veiculo', Icon: 'car', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Configurações', Tipo: 'header'});
				Menu.AddMenuItem({ Titulo: 'Opções', Link: '/#!/Opcoes', Icon: 'options', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Usuário', Link: '/#!/Usuario', Icon: 'idea', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Perfil', Link: '/#!/Perfil', Icon: 'child', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Mensagens', Link: '/#!/Mensagens', Icon: 'comment outline', Tipo: 'item'});
				Menu.AddMenuItem({ Titulo: 'Sair', Link: '/#!/Logout', Icon: 'power', Tipo: 'item'});	
				
				$scope.Itens = Menu.GetMenu().Itens;
				
				$scope.Size = function() {
					elem.removeAttr('class');
					elem.addClass(Menu.BuildBooleanClass(Menu.GetMenuState, 'eight wide column', 'three wide column')); 
				};
			}
		};
}]).directive('layoutMainHeader', ['Menu','UsuarioClientModel', function(Menu, UsuarioClientModel) {
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		templateUrl: '/Modules/Base/Templates/MainHeaderTemplate.html',
		link: function($scope, elem, attr) {
			
			var Usuario = new UsuarioClientModel();
			$scope.Authentication = Usuario.Authentication.Get();
			
			$scope.Menu = Menu;
			$scope.Size = function() {
				elem.removeAttr('class');
				elem.addClass(Menu.BuildBooleanClass(Menu.GetMenuState, 'eight wide column', 'thirteen wide column')); 
			};
		}
	};
}]).directive('layoutContentDefinition', ['Menu', function(Menu) {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: '/Modules/Base/Templates/ContentDefinitionTemplate.html',
        controller: ['$scope','$state', '$rootScope', function($scope, $state, $rootScope){
            $scope.Menu = Menu;
            
            $rootScope.$on('$stateChangeSuccess', function(){
                $scope.Title = $state.current.ncyBreadcrumbLabel || $state.current.name;
            });
        }]
	};
}]).directive('layoutHelper', ['Menu', function(Menu) {
	return {
		restrict: 'A',
		replace: true,
		scope: {},
		templateUrl: '/Modules/Base/Templates/HelperTemplate.html',
		link: function($scope, elem, attr) {
			$scope.Menu = Menu.GetMenu();
			$scope.Size = function() {
				elem.removeAttr('class');
				elem.addClass(Menu.BuildBooleanClass(Menu.GetHelperState, 'three wide column', 'wide column')); 
			};
		}
	};
}]);