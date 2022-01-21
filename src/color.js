
/* Credit: https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js) */
//c = "rgb(0,0,0)" p = 0.5
const LinearBlend=(p,c0,c1)=>{
	var i=parseInt,r=Math.round,P=1-p,[a,b,c,d]=c0.split(","),[e,f,g,h]=c1.split(","),x=d||h,j=x?","+(!d?h:!h?d:r((parseFloat(d)*P+parseFloat(h)*p)*1000)/1000+")"):")";
	return"rgb"+(x?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+i(e[3]=="a"?e.slice(5):e.slice(4))*p)+","+r(i(b)*P+i(f)*p)+","+r(i(c)*P+i(g)*p)+d;
}

const LogBlend=(p,c0,c1)=>{
	var i=parseInt,r=Math.round,P=1-p,[a,b,c,d]=c0.split(","),[e,f,g,h]=c1.split(","),x=d||h,j=x?","+(!d?h:!h?d:r((parseFloat(d)*P+parseFloat(h)*p)*1000)/1000+")"):")";
	return"rgb"+(x?"a(":"(")+r((P*i(a[3]=="a"?a.slice(5):a.slice(4))**2+p*i(e[3]=="a"?e.slice(5):e.slice(4))**2)**0.5)+","+r((P*i(b)**2+p*i(f)**2)**0.5)+","+r((P*i(c)**2+p*i(g)**2)**0.5)+d;
}

const LinearShade = (c,p) =>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}

const LogShade = (c,p) =>{
    var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:p*255**2,P=P?1+p:1-p;
    return"rgb"+(d?"a(":"(")+r((P*i(a[3]=="a"?a.slice(5):a.slice(4))**2+t)**0.5)+","+r((P*i(b)**2+t)**0.5)+","+r((P*i(c)**2+t)**0.5)+(d?","+d:")");
}

/* Return tint (or shade if negative percent) of color value
*/
const Tint = (color, percent) =>{
    var _rgb = NormalizeRGB(color);

    _rgb.r = parseInt(_rgb.r + (256 - _rgb.r) * percent / 100);
    _rgb.g = parseInt(_rgb.g + (256 - _rgb.g) * percent / 100);
    _rgb.b = parseInt(_rgb.b + (256 - _rgb.b) * percent / 100);
    return RGBToHex(_rgb.r, _rgb.g, _rgb.b);
};

/* Return shade (or tine if negative percent) of color value
*/
const Shade = (color, percent) =>{
    percent *= -1;
    var _rgb = NormalizeRGB(color);
    _rgb.r = parseInt(_rgb.r + (256 - _rgb.r) * percent / 100);
    _rgb.g = parseInt(_rgb.g + (256 - _rgb.g) * percent / 100);
    _rgb.b = parseInt(_rgb.b + (256 - _rgb.b) * percent / 100);
    return RGBToHex(_rgb.r, _rgb.g, _rgb.b);
};

/* Returns white or black based brightness of the color value
*/
const GetContrastTone = (color) =>{
    var _rgb = NormalizeRGB(color);
    var yiq = (_rgb.r * 299 + _rgb.g * 587 + _rgb.b * 114) / 1000;
    return yiq >= 128 ? '#000' : '#fff';
};

/* Returns basic color english names as Hexadecimal value
*/
const NameToHex = (name) =>{
    var _rgb = NameToRGB(name);
    return RGBToHex(_rgb.r, _rgb.g, _rgb.b);
};


const RGBToHex = (r,g,b) =>{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Take color (number, hex value, or name) and retruns rgb value
const NormalizeRGB = (color) =>{
    var _rgb = {};
    if (typeof(color) === "number") {
        //Number '0xFF00CC'
    _rgb = NumberToRGB(color);
    } else if (color.charAt(0) === "#"){
        //Hex color '#FF00CC'
        _rgb = HexToRGB(color);
    } else if(typeof(color) === "string"){
        //String color 'red'
        _rgb = NameToRGB(color);
        if(!_rgb) _rgb = color;
    }
    return _rgb;
};


const NumberToRGB = (color) =>{
    return {r:color >> 16, g: (color >> 8) & 255, b: color & 255};
};

const NameToRGB = (name) =>{
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


const HexToRGB = (hex) =>{
    hex = NormaliseHex(hex);
    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
    return {r:r, g:g, b:b};
};



const NormaliseHex = (hex) =>{
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

const DarkThemeContrastColors = () =>{
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

const LightThemeContrastColors = () =>{
    return [
        'black',        'blue',         'green',        'purple' 
    ]
}

module.exports = {
    LinearBlend,
    LogBlend,
    LinearShade,
    LogShade,
    Tint,
    Shade,
    GetContrastTone,
    NameToHex,
    RGBToHex,
    NormalizeRGB,
    NumberToRGB,
    NameToRGB,
    HexToRGB,
    NormaliseHex,
    DarkThemeContrastColors,
    LightThemeContrastColors
}