/**
 * Created by ram45 on 12/23/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Dylan"  },
            {_id: "345", username: "charlie",   password: "charlie", firstName: "Charlie", lastName: "Brown"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            findUserByCredentials:findUserByCredentials,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            updateUser:updateUser,
            deleteUser:deleteUser
        };
        return api;

        function createUser(user) {
            var user_new= {
                _id: (new Date()).getTime() + "",
                username:user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            };
            users.push(user_new);
            return user_new;
        }


        function findUserById(userId) {
            for (var u in users){
                user = users[u];
                if (user._id === userId){
                    return user;
                }
            }
            return null;
        }


        function findUserByUsername(username) {
            for (var u in users){
                user = users[u];
                if (user.username === username){
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users){
                var user = users[u];
                if (user.username === username && user.password === password){
                    //console.log("Found user");
                    //found == true;
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users){
                currentUser = users[u];
                if (currentUser._id === userId){
                    currentUser.firstName = user.firstName;
                    currentUser.lastName = user.lastName;
                    return true;
                }
                return false;
            }
        }

        function deleteUser(userId) {
            for (var i in users){
                user = users[i];
                if (user._id ===  userId){
                    users.splice(i, 1);
                }
            }
            return null;
        }


    }
})();