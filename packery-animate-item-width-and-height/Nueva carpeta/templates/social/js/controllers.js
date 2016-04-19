angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

 

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/social/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
 $scope.usuarios = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://pixelesp-api.herokuapp.com/usuarios').then(function(resp) {
      $scope.usuarios = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });



})


.controller('UsuariosCtrl', function($scope, $http, $location) {


  $scope.usuarios = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://pixelesp-api.herokuapp.com/usuarios').then(function(resp) {
      $scope.usuarios = resp.data.data;

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });

})

.controller('UsuariocomunidadCtrl', function($scope, $stateParams, $http, $location) {

  $scope.usuario = {};

  $http.get('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId).then(function(resp) {
    $scope.usuario = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 
 
  


 })



.controller('EntrarCtrl', function($rootScope, $scope, $stateParams, $http, $ionicPopup, $location ) {
  
    $rootScope.userToken = ''; 
        $scope.user={};
        $scope.user.email='';
        $scope.user.password =''; 
  
   $scope.doLogin = function() {
      $http.post('http://pixelesp-api.herokuapp.com/login',$scope.user).then(function(resp) {
        console.log(resp.data);

         $rootScope.userToken = resp.data.token;

         var alertPopup = $ionicPopup.alert({
             title: 'Logeado con exito',
             template: 'Ingresa ahora'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/inicio');
           });
          
    }, function(err) {
      console.error('ERR', err);
      var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Email o contraseña invalido'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/start');
           });
      // err.status will contain the status code
    });
    };
  
})

.controller('EntrarAdminCtrl', function($rootScope, $scope, $stateParams, $http, $ionicPopup, $location ) {
  
    $rootScope.userToken = ''; 
        $scope.user={};
        $scope.user.email='';
        $scope.user.password ='';
        
  
   $scope.doLogin = function() {
      $http.post('http://pixelesp-api.herokuapp.com/login',$scope.user).then(function(resp) {
        console.log(resp.data);

         $rootScope.userToken = resp.data.token;

         var alertPopup = $ionicPopup.alert({
             title: 'Logeado con exito',
             template: 'Ingresa ahora'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/admin');
           });
          
    }, function(err) {
      console.error('ERR', err);
      var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Email o contraseña invalido'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/inicio');
           });
      // err.status will contain the status code
    });
    };
  
})

.controller('AdminCtrl', function($rootScope, $scope, $http, $location) {
    
    console.log($rootScope.userToken);     
    
    $scope.user = [];
    $http.get('http://pixelesp-api.herokuapp.com/me', {headers: {'auth-token': $rootScope.userToken}}).then(function(resp) {
      $scope.user = resp.data.data;
      console.log('Succes', resp.data.data);
      $location.path('/app/admin');
    }, function(err) {
      console.error('ERR', err);
      $location.path('/app/EntrarAdmin');
      // err.status will contain the status code
    }); 
})
.controller('UsuarioslistsCtrl', function($rootScope, $scope, $http, $location) {
    
 

  $scope.usuarios = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://pixelesp-api.herokuapp.com/usuarios').then(function(resp) {
      $scope.usuarios = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });

})
 

.controller('UsuarioCtrl', function($scope, $stateParams, $http, $location) {

  $scope.usuario = {};

  $http.get('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId).then(function(resp) {
    $scope.usuario = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);  
      $location.path('/app/usuarios');
    }, function(err) {
      console.error('ERR', err);
     
      // err.status will contain the status code
    });
     };

    $scope.doDelete = function() {
   $http.delete('http://pixelesp-api.herokuapp.com/usuarios/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/usuarios');
    }, function(err) {
      console.error('ERR', err);
      
      // err.status will contain the status code
    });


  };
  


 })

.controller('UsuarioNuevoCtrl', function($scope, $stateParams, $http, $ionicPopup, $location ) {
            
        $scope.usuario={};
        $scope.usuario.password='';
        $scope.usuario.name='';
        $scope.usuario.email='';
        $scope.usuario.id =''; 
  
   $scope.doRegister = function() {
      $http.post('http://pixelesp-api.herokuapp.com/usuarios',$scope.usuario ).then(function(resp) {
        console.log(resp.data);
         var alertPopup = $ionicPopup.alert({
             title: 'Usuario Creado con exito',
             template: 'Ingresa ahora'
           });
           alertPopup.then(function(res) {
             $location.path('/app/inicio');
           });
          
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
    };
  
})

.controller('NoticiaslistsCtrl', function($rootScope, $scope, $http, $location) {
    


  $scope.noticias = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://pixelesp-api.herokuapp.com/noticias').then(function(resp) {
      $scope.noticias = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });

})
 

.controller('NoticiaCtrl', function($scope, $stateParams, $http, $location) {

  $scope.noticia = {};

  $http.get('http://pixelesp-api.herokuapp.com/noticias/'+ $stateParams.NoticiaId).then(function(resp) {
    $scope.noticia = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/noticias/'+ $stateParams.NoticiaId, $scope.noticia).then(function(resp) {
      console.log(resp.data);  
      $location.path('/app/noticias');
    }, function(err) {
      console.error('ERR', err);
     
      // err.status will contain the status code
    });
     };

    $scope.doDelete = function() {
   $http.delete('http://pixelesp-api.herokuapp.com/noticias/'+ $stateParams.NoticiaId, $scope.noticia).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/noticias');
    }, function(err) {
      console.error('ERR', err);
      
      // err.status will contain the status code
    });


  };
  


 })


.controller('NoticiasCtrl', function($scope, $http, $location) {


  $scope.noticias = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://pixelesp-api.herokuapp.com/noticias').then(function(resp) {
      $scope.noticias = resp.data.data;

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });

})

.controller('NoticiaNuevaCtrl', function($scope, $stateParams, $http, $ionicPopup, $location ) {
            
        $scope.noticia={};
        $scope.noticia.Titulo='';
        $scope.noticia.Descripcion='';
        $scope.noticia.id =''; 
  
   $scope.doRegister = function() {
      $http.post('http://pixelesp-api.herokuapp.com/noticias',$scope.noticia ).then(function(resp) {
        console.log(resp.data);
         var alertPopup = $ionicPopup.alert({
             title: 'Noticia creada con exito',
             template: 'OK'
           });
           alertPopup.then(function(res) {
             $location.path('/app/inicio');
           });
          
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
    };
  
})

.controller('PostNuevoCtrl', function($scope, $stateParams, $http, $ionicPopup, $location ) {
            
        $scope.imagen={};
        $scope.imagen.Titulo='';
        $scope.imagen.Descripcion='';
        $scope.imagen.id =''; 
  
   $scope.doRegister = function() {
      $http.post('http://pixelesp-api.herokuapp.com/imagenes',$scope.imagen ).then(function(resp) {
        console.log(resp.data);
         var alertPopup = $ionicPopup.alert({
             title: 'imagen creada con exito',
             template: 'OK'
           });
           alertPopup.then(function(res) {
             $location.path('/app/galeria');
           });
          
    }, function(err) {
      console.error();
      // err.status will contain the status code
    });
    };
  
})
.controller('imagenlistsCtrl', function($rootScope, $scope, $http, $location) {
    


  $scope.imagen = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://pixelesp-api.herokuapp.com/imagenes').then(function(resp) {
      $scope.imagen = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('', err);
      // err.status will contain the status code
    });
  });

})
 

.controller('imagenCtrl', function($scope, $stateParams, $http, $location) {

  $scope.imagen = {};

  $http.get('http://pixelesp-api.herokuapp.com/imagenes/'+ $stateParams.imagenId).then(function(resp) {
    $scope.imagen = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/imagenes/'+ $stateParams.imagenId, $scope.imagen).then(function(resp) {
      console.log(resp.data);  
      $location.path('/app/imagenes');
    }, function(err) {
      console.error('ERR', err);
     
      // err.status will contain the status code
    });
     };

    $scope.doDelete = function() {
   $http.delete('http://pixelesp-api.herokuapp.com/imagenes/'+ $stateParams.imagenId, $scope.imagen).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/imagenes');
    }, function(err) {
      console.error('ERR', err);
      
      // err.status will contain the status code
    });


  };
  


 })





.controller('imagenesCtrl', function($scope, $http, $location) {


  $scope.imagenes = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://pixelesp-api.herokuapp.com/imagenes').then(function(resp) {
      $scope.imagenes = resp.data.data;

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });

})
