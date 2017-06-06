var sketch = new p5(function(p) {
	function Tank() {
		// top-left corner of tank
		this.pos = p.createVector(30, p.height / 2);
		this.width = p.width - 60;
		this.height = p.height / 2 - 10;

		this.draw = function() {
			p.fill(p.color(0, 140, 184, 128));
			p.beginShape();
			p.vertex(this.pos.x, this.pos.y);
			p.vertex(this.pos.x, this.pos.y + this.height);
			p.vertex(this.pos.x + this.width, this.pos.y + this.height);
			p.vertex(this.pos.x + this.width, this.pos.y);
			p.endShape();
		}
	}

	var tank;

	p.setup = function() {
		var cnv = p.createCanvas(800, 600);
		tank = new Tank();
	}

	p.draw = function() {
		p.background('#bef5ff');

		tank.draw(); // draw tank over any other objects b/c it is translucent
	}
}, 'sim');
