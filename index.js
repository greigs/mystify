    var svg = document.getElementById("svg");

    var fps = 20;
    var num_p = 3;
    var speed = 5;
    var fadeSpeed = 20;
    var height = 300;
    var width = 300;

    var t = new Array();
    var p = new Array();

    for (i=0;i<num_p;i++) {
        p[i] = new Array();
        p[i].x = Math.round(Math.random() * width);
        p[i].y = Math.round(Math.random() * height);
        p[i].a = Math.round(Math.random() * (Math.PI*2));
    }
    
    var drawFrame = function() {
        
        // construct
        dat = new Array();
        for (i=0;i<p.length;i++) {
            var speedx = Math.cos(p[i].a)*speed; 
            var speedy = Math.sin(p[i].a)*speed;
            if (p[i].x + speedx >= width || p[i].x + speedx <= 0) { var mod = 0; var hitWall = true; }
            if (p[i].y + speedy >= height || p[i].y + speedy <= 0) { var mod = Math.PI; var hitWall = true; }
                if (hitWall) {
                    p[i].a = ((p[i].a + Math.PI) - (p[i].a * 2)) + mod;
                    if (p[i].a > Math.PI*2 ) p[i].a -= Math.PI*2;
                    else if (p[i].a < 0) p[i].a += Math.PI*2;
                    var speedx = Math.cos(p[i].a)*speed; 
                    var speedy = Math.sin(p[i].a)*speed;
                    hitWall = false;
                }
            p[i].x += Math.round(speedx);
            p[i].y += Math.round(speedy);
            dat.push(p[i].x,p[i].y);
        }
        dat.push(100);
        t.push(dat);

        // draw
        for (i=0;i<t.length;i++) {

            var alpha = t[i][num_p*2];
            if (alpha <= 0) t.splice(i,1);
            for (j=0;j<num_p*2;j+=2) {
                var lineNum = (i * 3) + (j / 2);
                var line = document.getElementById(lineNum +  "l");

                if (j < num_p) {

                    line.setAttribute('x1',t[i][j])
                    line.setAttribute('y1',t[i][j+1])
                    line.setAttribute('x2',t[i][j+2])
                    line.setAttribute('y2',t[i][j+3])
                    line.setAttribute('opacity',alpha / 100);
                }
                else {
                    line.setAttribute('x1',t[i][j])
                    line.setAttribute('y1',t[i][j+1])
                    line.setAttribute('x2',t[i][0])
                    line.setAttribute('y2',t[i][1])
                    line.setAttribute('opacity',alpha / 100);
                }
            }

            t[i][num_p*2] -= fadeSpeed;
        }
    }

    setInterval(function() { drawFrame() }, 1000 / fps)
