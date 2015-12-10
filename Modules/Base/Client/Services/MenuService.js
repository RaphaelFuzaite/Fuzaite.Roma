'use strict';

angular.module('Base').service('Menu', [
	function () {
		this.DefaultRoles = ['Admin', 'Condutor', 'Instituicao', 'Usuario'];
		
		this.Menus = {
			Itens: [],
			Extendido: false,
			Auxilio: false,
			// Navigation: {
			// 	Class: function() {
			// 		return this.GetMenuState() ? 'eight' : 'fourteen';
			// 	}
			// },			
			// FastAccess: {
			// 	Class: function() { 
			// 		return this.GetMenuState() ? 'eight' : 'two';
			// 	}
			// },
			// Main: {
			// 	Class: function() {
			// 		this.GetHelperState() ? 'nine' : 'twelve';
			// 	}	
			// },		
			// Helper: {
			// 	Class: function() {
			// 		this.GetHelperState() ? 'two' : '';
			// 	}
			// }
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
			self.Class 	= obj.Class;
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