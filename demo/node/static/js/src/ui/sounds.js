
//http://indiegamr.com/the-state-of-audio-in-html5-games/

// sound.SoundPlayer = new Class({
//     Implements: [Options, Events],
//     options: {
//         soundManagersrc: "//cdnjs.cloudflare.com/ajax/libs/SoundJS/0.4.1/soundjs.min.js",
//         sounds: "/sound/",
//         beepsrc: "beep.mp3"
//     },
//     sounds: {},

//     initialize: function(options) {
//         this.setOptions(options);
//         this.loadingSM = false;
//     },
//     load: function() {
//         window.addEvent("domready", this.loadSoundManager.bind(this));
//         return this;
//     },
//     loadSoundManager: function() {
//         var self = this,
// 			opts = self.options;
//         if (self.loadingSM !== false)
//             return;
//         self.loadingSM = true;
//         if ($defined(self.sm)) { //... ugh
//             self.fireEvent("ready");
//             return;
//         }

//         var soundinit = function() {
// 			//var sm = self.sm = window.soundManager;
// 			var sm = self.sm = window.createjs.Sound;
//             sm.url = opts.sounds;

//             //load all sounds here
//             self.register("beep", opts.sounds + opts.beepsrc);
//             sm.addEventListener("fileload", self.fireEvent.bind(self, "ready"));
//             self.loadingSM = null;
//         };

// 		//load sound manager
//         Asset.javascript(opts.soundManagersrc, {onLoad: soundinit});
//     },
// 	register: function(alias,src) {
// 		this.sm.registerSound(src, alias);
// 		this.sounds[alias] = _.partial(this.sm.play, alias);
// 	},
//     play: function(src) {
//         this.sm.play(src);
//         return this;
//     },

//     isReady: function() {
//         return this.sm && this.sm.isReady();
//     }
// });

sound.SoundPlayer = new Class({
    Implements: [Options, Events],
    options: {
        soundManagersrc: "//cdn.jsdelivr.net/soundmanager2/2.97a.20130512/soundmanager2-nodebug-jsmin.js",
        soundsurl: "/sound/",//directory of sounds for sm
        swfurl: "/swf",
        flashVersion: 8,
        sounds: [],
        preferFlash: false//use html5 if possible
    },
    loadingSM: false,

    initialize: function(options) {
        this.setOptions(options);
        var self = this,
            opts = this.options;

        window.addEvent("domready", function() {//load soundmanager ->
            if (self.loadingSM !== false)
                return;
            self.loadingSM = true;
            if ($defined(self.sm)) {
                self.fireEvent("ready");
                return;
            }

            var soundinit = function() {
                var sm = self.sm = window.soundManager;
                //https://www.scirra.com/blog/44/on-html5-audio-formats-aac-and-ogg
                // var extension = self.extension = sm.hasHTML5 && (Browser.firefox || Browser.opera || Browser.chrome) ? ".ogg" : ".mp3";
                sm.setup({
                    url: opts.swfurl,
                    preferFlash: opts.preferFlash,
                    onready: function() {
                        _.each(opts.sounds, function(sound) {//load all sounds here
                            // self.register(sound.id, opts.soundsurl + sound.url + extension);
                            sound = _.clone(sound);
                            sound.url = _.map(sound.url, function(path) {
                                return path.contains('/') ? path : opts.soundsurl + path;
                            });
                            self.sm.createSound(sound);
                        })
                        self.loadingSM = false;
                        self.fireEvent("ready");
                    }
                }).beginDelayedInit();
                self.play = sm.play;
            };

            //load sound manager
            Asset.javascript(opts.soundManagersrc, {onLoad: soundinit});
        });
    },
    register: function(alias,src) {
        this.sm.createSound(alias, src);
    },

    isReady: function() {
        return this.sm && this.loadingSM === false;
    }
});
