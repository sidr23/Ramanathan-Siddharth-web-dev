/**
 * Created by ram45 on 12/23/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget:deleteWidget
        };
        return api;


        function createWidget(pageId,widget) {
            var widget_new= {
                _id: (new Date()).getTime()+ "",
                widgetType: widget.widgetType,
                pageId: pageId,
                size: widget.size,
                text:widget.text,
                url: "",
                width: "100%"
            };
            widgets.push(widget_new);
            return widget_new;
        }


        function findWidgetsByPageId(pageId) {
            var widgets_list=[];
            for (var w in widgets){
                if (widgets[w].pageId === pageId){
                    widgets_list.push(widgets[w]);
                }
            }
            return widgets_list;
        }


        function findWidgetById(widgetId) {
            for(var w in widgets) {
                var widget=widgets[w];
                if(widget._id === widgetId) {
                    return JSON.parse(JSON.stringify(widget));
                }
            }
            return null;
        }


        function updateWidget(widgetId, widget) {
            for (var w in widgets){
                currentWidget = widgets[w];
                if (currentWidget._id ===  widgetId){
                    currentWidget.widgetType=widget.widgetType;
                    currentWidget.pageId= widget.pageId;
                    currentWidget.size= widget.size;
                    currentWidget.text=widget.text;
                    currentWidget.url= widget.url;
                    currentWidget.width= widget.width;
                    return true;
                }
            }
            return false;

        }

        function deleteWidget(widgetId) {
            var widget=[];
            for (var i in widgets){
                widget = widgets[i];
                if (widget._id ===  widgetId){
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }




    }
})();