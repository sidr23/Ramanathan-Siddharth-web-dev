/**
 * Created by ram45 on 12/23/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Twitter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite:updateWebsite,
            deleteWebsite:deleteWebsite
        };
        return api;

        function createWebsite(userId,website) {
            var website_new= {
                _id: (new Date()).getTime().toString(),
                name:website.name,
                developerId: userId,
                description: website.description
            };
            websites.push(website_new);
            return website_new;
        }


        function findWebsitesByUser(userId) {
            websites_list=[];
            for (var w in websites){
                if (websites[w].developerId ===  userId)
                {
                    websites_list.push(websites[w]);
                }
            }
            return websites_list;
        }


        function findWebsiteById(websiteId) {
            for (var w in websites){
                website = websites[w];
                if (website._id ===  websiteId){
                    return JSON.parse(JSON.stringify(website));                }
            }
            return null;
        }


        function updateWebsite(websiteId, website) {
            for (var w in websites){
                currentWebsite = websites[w];
                if (currentWebsite._id ===  websiteId){
                    currentWebsite.name = website.name;
                    currentWebsite.developerId = website.developerId;
                    currentWebsite.description = website.description;
                    return true;
                }
                return false;
            }
        }

        function deleteWebsite(websiteId) {
            for (var i in websites){
                website = websites[i];
                if (website._id ===  websiteId){
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }


    }
})();