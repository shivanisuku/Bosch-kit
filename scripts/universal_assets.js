(function(){
    var $ = jQuery;
    $(document).ready(function(){
         var slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70
        });
        $(".mobile_ham").on("click", function( evt ){
            slideout.toggle();
        })
        var mega_flag = false;
        // var sidr_pop = false;
        var mega_section;

        var viewWidth = window.innerWidth;

        var sites = [ 'cl-shows', 'cl-television', 'cl-magazine', 'cl-shop' ];

        var mob_links = $(".uNav");
        var social = $(".social_nav ul");
        var mob_social = [];

        for( var i = 0; i<$(social).children('li').length; i++ ){
            mob_social.push($(social).children('li')[i].innerHTML);
        }
        
        var m_socialBar = document.createElement('ul');
        m_socialBar.className = "mob_social_nav clearfix";
        for( var i=0; i<mob_social.length; i++){

            if( mob_social[i].indexOf("newsletter") > -1){
                var counter = i;
                var nl = mob_social[i];
                mob_social[i] = "<li><a href='//cottagelife.com' class='home'>Home</a></li>";               
            } else {
                mob_social[i] = "<li>"+mob_social[i]+"</li>";
            }
            m_socialBar.innerHTML += mob_social[i];
        }

        $(nl)[0].innerHTML = "<span>Subscribe to our</span> Newsletter";
        nl = nl.replace("Newsletter","<span>Subscribe to our</span> NewsLetter");

        $(mob_social).addClass("mob_social_nav clearfix");

        $("#menu").append(mob_links[0].outerHTML + "<ul class='mob_subscriptions clearfix'><li>" + nl + "</li><li><a class='tv_channel' href='http://tv.cottagelife.com/channel-finder/'>subscribe to our <span>tv channel</span></a></li></ul>"+ m_socialBar.outerHTML);

        for( var i=0; i< sites.length; i++){
           if( $("body").hasClass(sites[i] ) ){
                $(".site_nav .uNav #"+sites[i]).addClass("hovered");
                $(".site_nav .uNav #"+sites[i]).children('a').css({color: "#2F3438"});
                break;
            } 
        }


        function openMega( evt ){
            var to_open = $(evt.target).html().toLowerCase();

            $('.mega_nav').on("mouseleave", closeMega);

            if(mega_flag){
                mega_section.css("display", "none");
                mega_section.off("mouseleave", closeMega);
                mega_flag = false;
                trigger_open(to_open);
            } else {
                trigger_open(to_open);
            }
        }

        function trigger_open( obj ){
            switch(obj){
                    case "television":
                    open_box($('#mega_tv'));
                        break;
                    case "magazine":
                        open_box($('#mega_mag'));
                        break;
                    case "consumer shows":
                        open_box($('#mega_shows'));
                        break;
                    case "shop":
                        open_box($('#mega_shop'));
                        break;
                }
        }
        function open_box( obj ){
            obj.css("display", "block");
            mega_section = obj;
            mega_flag = true;
        }
        function closeMega( evt ){
            mega_section.css("display", "none");
            mega_flag = false;
            mega_section.off("mouseleave", closeMega);
        }

        function uni_resize(c, t) {
            onresize = function() {
                clearTimeout(t);
                t = setTimeout(c, 100)
            };
                return c
        };
    })
})();