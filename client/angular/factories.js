/**************************************
        ANGULAR USER FACTORY
**************************************/
app.factory('UserFactory', function($http, $cookies){
    console.log('User Factory');
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
    factory.show = function(id, callback){
        $http.get('/users/' + id).then(callback)
    }

    return factory
})

/**************************************
        ANGULAR BUCKET FACTORY
**************************************/
app.factory('BucketFactory', function($http, $cookies){
    console.log('Bucket Factory');
    var factory = {}

    factory.index = function(callback){
        $http.get('/buckets').then(callback)
    }
    factory.create = function(newBucket, callback){
        // console.log(newBucket);
		$http.post('/buckets', newBucket).then(callback);
	}

    return factory
})
/**************************************
        ANGULAR ITEM FACTORY
**************************************/
app.factory('ItemFactory', function($http, $cookies){
    var factory = {}

    factory.index = function(callback){
        $http.get('/items').then(callback)
    }
    factory.create = function(newItem, callback){
        $http.post('/items', newItem).then(callback);
    }

    return factory
})
