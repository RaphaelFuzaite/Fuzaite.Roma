'use strict';

angular.module('Base').service('Menu', [
	function () {
		this.DefaultRoles = ['Admin', 'Condutor', 'Instituicao', 'Usuario'];
		
		this.Menus = {
			Itens: [],
			Extendido: true,
			Auxilio: false
		};
		
		this.BuildBooleanClass = function(func ,firstClass, secondClass) {
			return func.apply(this) ? firstClass : secondClass;
		};
		
		this.GetMenuState = function() {
			return this.Menus.Extendido;
		};
		
		this.GetHelperState = function() {
			return this.Menus.Auxilio;
		};		
		
		var Menu = function(obj) {
			var self = this;
			
			self.Titulo = obj.Titulo;
			self.Link 	= obj.Link;
			self.Icon 	= obj.Icon;
			self.Tipo 	= obj.Tipo;		
		};
		
		this.ChangeMenuState = function() {			
			this.Menus.Extendido = !this.Menus.Extendido;
		};
		
		this.ChangeHelperState = function() {			
			this.Menus.Auxilio = !this.Menus.Auxilio;
		};
		
		this.GetMenu = function() {
			return this.Menus;
		};
		
		this.AddMenuItem = function(obj) {
			this.Menus.Itens.push(new Menu(obj));
			
			return this.GetMenu();	
		};
	}
]);