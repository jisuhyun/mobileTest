var resTextures = [
    'woodenblock3.jpg'
    , 'woodenblock4.jpg'
    , 'woodenblock5_outline.jpg'
    , 'woodenblock6.jpg'
    , 'woodenblock7.jpeg'
    , 'iron-texture-pattern-the-metal-plate-with-scuffed-dmitr1ch.jpg'
    , 'diamond_pattern_iron_large.jpg'
];

var resNumberTextures = [
    '1.jpg'
    , '2.jpg'
    , '3.jpg'
    , '4.jpg'
    , '5.jpg'
    , '6.jpg'
    , '7.jpg'
    , '8.jpg'
    , '9.jpg'
];

function initResource() {
    let path = getTexturesResourcePath();
    for(let i=0; i< resTextures.length; ++i) {
        resTextures[i] = path + resTextures[i];    
    }

    path = getNumberTexturesResourcePath();
    for(let i=0; i< resNumberTextures.length; ++i) {
        resNumberTextures[i] = path + resNumberTextures[i];    
    }
}

initResource();

var navigationTabsSrc = ['menu', 'block'];