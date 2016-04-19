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

             $location.path('/app/inicio');
          
          
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

    
             $location.path('/app/admin');
         
          
    }, function(err) {
      console.error('ERR', err);
      var alertPopup = $ionicPopup.alert({
             title: 'Error en el ingreso',
             template: 'Email o contraseña invalido'
           });
           alertPopup.then(function(resp) {
             $location.path('/app/EntrarAdmin');
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


//trabajos:


.controller('TrabajoslistsCtrl', function($rootScope, $scope, $http, $location) {
    


  $scope.trabajo = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    $http.get('http://pixelesp-api.herokuapp.com/trabajos').then(function(resp) {
      $scope.trabajo = resp.data.data;
      console.log('Succes', resp.data.data);
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  });

})
 

.controller('TrabajoCtrl', function($scope, $stateParams, $http, $location) {

  $scope.trabajo = {};

  $http.get('http://pixelesp-api.herokuapp.com/trabajos/'+ $stateParams.TrabajoId).then(function(resp) {
    $scope.trabajo = resp.data.data;

     
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://pixelesp-api.herokuapp.com/trabajos/'+ $stateParams.TrabajoId, $scope.trabajo).then(function(resp) {
      console.log(resp.data);  
      $location.path('/app/trabajo');
    }, function(err) {
      console.error('ERR', err);
     
      // err.status will contain the status code
    });
     };

    $scope.doDelete = function() {
   $http.delete('http://pixelesp-api.herokuapp.com/trabajos/'+ $stateParams.TrabajoId, $scope.trabajo).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/trabajo');
    }, function(err) {
      console.error('ERR', err);
      
      // err.status will contain the status code
    });


  };
  


 })


.controller('TrabajosCtrl', function($scope, $http, $location) {


  $scope.trabajos = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://pixelesp-api.herokuapp.com/trabajos').then(function(resp) {
      $scope.trabajos = resp.data.data;

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });

})

.controller('TrabajoNuevoCtrl', function($scope, $stateParams, $http, $ionicPopup, $location ) {
            
        $scope.trabajo={};
        $scope.trabajo.Titulo='';
        $scope.trabajo.Descripcion='';
        $scope.trabajo.id =''; 
  
   $scope.doRegister = function() {
      $http.post('http://pixelesp-api.herokuapp.com/trabajos',$scope.trabajo ).then(function(resp) {
        console.log(resp.data);
         var alertPopup = $ionicPopup.alert({
             title: 'Trabajo creado con exito',
             template: 'OK'
           });
           alertPopup.then(function(res) {
             $location.path('/app/trabajo');
           });
          
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
    };
  
})

//imagenes:

.controller('imagenesCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, $http, $location) {


       $scope.imagenes = [];
   $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://pixelesp-api.herokuapp.com/imagenes').then(function(resp) {
      $scope.imagenes = resp.data.data;

    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });


    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $ionicSlideBoxDelegate.slide(0);
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
  
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
  
    $scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    }
  
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  }
)

;