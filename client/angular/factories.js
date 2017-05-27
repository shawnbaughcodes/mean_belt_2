app.factory('UserFactory', function($http, $cookies){
    console.log('Factories');
    var factory = {}
    factory.index = function(callback){
        $http.get('/users').then(callback)
    }
    factory.create = function(newUser, callback){
		$http.post('/users', newUser).then(callback);
	}
    factory.session = function(callback){
		var user_id = $cookies.get('user_id');
		if(!user_id){
			return callback(false);
		}
		$http.get('/users/' + user_id).then(function(res){
			if(res.data.errors){
				return callback(false)
			}
			return callback(res.data);
		})
	}
    factory.login = function(loginUser, callback){
        $http.post('/sessions', loginUser).then(callback);
    }

    return factory
})
