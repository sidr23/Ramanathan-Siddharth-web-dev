/**
 * Created by ram45 on 12/23/2016.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        };
        return api;

        function createPage(websiteId,page) {
            var page_new= {
                _id: (new Date()).getTime() + "",
                name:page.name,
                websiteId: websiteId,
                description: page.description
            };
            pages.push(page_new);
            return page_new;
        }


        function findPageByWebsiteId(websiteId) {
            var pages_list=[];
            for (var p in pages){
                if (pages[p].websiteId === websiteId)
                {
                    pages_list.push(pages[p]);
                }
            }
            return pages_list;
        }


        function findPageById(pageId) {
            for (var p in pages){
                var page = pages[p];
                if (page._id === pageId){
                    return JSON.parse(JSON.stringify(page));
                }
            }
            return null;
        }


        function updatePage(pageId, page) {
            for (var p in pages){
                var currentPage = pages[p];
                if (currentPage._id === pageId){
                    currentPage.name = page.name;
                    currentPage.description = page.description;
                    return true;
                }
            }
            return false;

        }

        function deletePage(pageId) {
            for (var i in pages){
                var returnedPage = pages[i];
                if (returnedPage._id === pageId){
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }


    }
})();