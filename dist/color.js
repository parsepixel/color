export default class Color {

    //https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
    //c = "rgb(0,0,0)" p = 0.5
    static linearShade(c,p){
        var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
        return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
    }

    static logShade=(c,p)=>{
        var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:p*255**2,P=P?1+p:1-p;
        return"rgb"+(d?"a(":"(")+r((P*i(a[3]=="a"?a.slice(5):a.slice(4))**2+t)**0.5)+","+r((P*i(b)**2+t)**0.5)+","+r((P*i(c)**2+t)**0.5)+(d?","+d:")");
    }

    /* Return tint (or shade if negative percent) of color value
    */
    static tint(color, percent) {
        var _rgb = Color.normalizeRGB(color);

        _rgb.r = parseInt(_rgb.r + (256 - _rgb.r) * percent / 100);
        _rgb.g = parseInt(_rgb.g + (256 - _rgb.g) * percent / 100);
        _rgb.b = parseInt(_rgb.b + (256 - _rgb.b) * percent / 100);
        return Color.RGBToHex(_rgb.r, _rgb.g, _rgb.b);
    };

    /* Return shade (or tine if negative percent) of color value
    */
    static shade(color, percent) {
        percent *= -1;
        var _rgb = Color.normalizeRGB(color);
        _rgb.r = parseInt(_rgb.r + (256 - _rgb.r) * percent / 100);
        _rgb.g = parseInt(_rgb.g + (256 - _rgb.g) * percent / 100);
        _rgb.b = parseInt(_rgb.b + (256 - _rgb.b) * percent / 100);
        return Color.RGBToHex(_rgb.r, _rgb.g, _rgb.b);
    };

    /* Returns white or black based brightness of the color value
    */
    static getContrastTone(color) {
        var _rgb = Color.normalizeRGB(color);
        var yiq = (_rgb.r * 299 + _rgb.g * 587 + _rgb.b * 114) / 1000;
        return yiq >= 128 ? '#000' : '#fff';
    };

    /* Returns basic color english names as Hexadecimal value
    */
    static nameToHex(name){
        var _rgb = Color.nameToRGB(name);
        return Color.RGBToHex(_rgb.r, _rgb.g, _rgb.b);
    };

    
    static RGBToHex(r,g,b){
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    // Take color (number, hex value, or name) and retruns rgb value
    static normalizeRGB(color){
        var _rgb = {};
        if (typeof(color) === "number") {
            //Number '0xFF00CC'
        _rgb = Color.numberToRGB(color);
        } else if (color.charAt(0) === "#"){
            //Hex color '#FF00CC'
            _rgb = Color.hexToRGB(color);
        } else if(typeof(color) === "string"){
            //String color 'red'
            _rgb = Color.nameToRGB(color);
            if(!_rgb) _rgb = color;
        }
        return _rgb;
    };


    static numberToRGB(color){
        return {r:color >> 16, g: (color >> 8) & 255, b: color & 255};
    };

    static nameToRGB(name){
        var _colors = {
            aqua:[0,255,255],
            lime:[0,255,0],
            silver:[192,192,192],
            black:[0,0,0],
            maroon:[128,0,0],
            teal:[0,128,128],
            blue:[0,0,255],
            navy:[0,0,128],
            white:[255,255,255],
            fuchsia:[255,0,255],
            olive:[128,128,0],
            yellow:[255,255,0],
            orange:[255,165,0],
            gray:[128,128,128],
            purple:[128,0,128],
            green:[0,128,0],
            red:[255,0,0],
            pink:[255,192,203],
            cyan:[0,255,255]
        }
        if(_colors.hasOwnProperty(name)){
            return {r:_colors[name][0], g:_colors[name][1], b:_colors[name][2]};
        } else {
            return false;
        }
    };


    static hexToRGB(hex){
        hex = Color.normaliseHex(hex);
        var r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);
        return {r:r, g:g, b:b};
    };



    static normaliseHex(hex) {
        /* Method 1
        hex = hex.replace(/^\s*#|\s*$/g, ''); //<-- strip the leading # if it's there

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (hex.length == 3) {
            hex = hex.replace(/(.)/g, '$1$1');
        }*/

        /* Alternative method 2
        if (hex.length === 4) { //<-- for shorthand like #9F0
            r = hex.charAt(1);
            g = hex.charAt(2);
            b = hex.charAt(3);
            hex = "#" + r + r + g + g + b + b;
        }
        hex = parseInt(hex.substr(1), 16);
        _rgb.r = hex >> 16;
        _rgb.g = (hex >> 8) & 255;
        _rgb.b = hex & 255;
        */

        //Alternative method 3
        if (hex[0] == '#') {
            hex = hex.substr(1);
        }
        if (hex.length == 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        return hex;
    };

    static darkThemeContrastColors(){
        //https://htmlcolorcodes.com/color-names/
        return [
            'darkorange',   'deepskyblue',      'fuchsia',      'chartreuse',   'orange',       'darkturquoise',    'yellow',
            'deeppink',     'lightskyblue',     'violet',       'greenyellow',  'gold',         'cyan',             'greenyellow',
            'lightsalmon',  'dodgerblue',       'mediumpurple', 'palegreen',    'coral',        'red',              'mediumspringgreen',
            'lightpink',    'powderblue',       'darkorchid',   'aquamarine',   'mediumslateblue','paleturquoise',    
                            'cornflowerblue',   'lavender',     'mediumseagreen','crimson',     'limegreen',        'goldenrod',
            'chocolate',    'rosybrown'
        ]
    }

    static lightThemeContrastColors(){
        return [
            'black',        'blue',         'green',        'purple' 
        ]
    }
   
};

