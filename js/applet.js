var sketch = new p5(function(p) {
	var tank;
	var cube;

	// Retrieve value from an input with 'id'
	function fetchValue(id) {
		let val = document.getElementById(id).value;
		return parseFloat(val);
	}

	function Tank() {
		// top-left corner of tank
		this.pos = p.createVector(30, p.height / 2);
		this.width = p.width - 60;
		this.height = p.height / 2 - 10;

		this.draw = function() {
			p.push();
			p.fill(p.color(0, 140, 184, 128));
			p.beginShape();
			p.vertex(this.pos.x, this.pos.y);
			p.vertex(this.pos.x, this.pos.y + this.height);
			p.vertex(this.pos.x + this.width, this.pos.y + this.height);
			p.vertex(this.pos.x + this.width, this.pos.y);
			p.endShape();
			p.pop();
		}
	}

	function Cube() {
		this.netForce = p.createVector();
		this.sideLen = 20;
		var pxPerMeter = 15;
		// Center <x, y> of the cube
		this.pos = p.createVector(tank.pos.x + tank.width / 2, tank.pos.y);

		this.applyForce = function(force) {
			netForce.add(force);
		}

		this.draw = function() {
			p.push();
			p.fill('#493c21');
			p.stroke('black');
			p.strokeWeight(1);
			let scaledSide = this.sideLen * pxPerMeter;
			p.rect(this.pos.x - scaledSide / 2, this.pos.y - scaledSide / 2, scaledSide, scaledSide);
			p.pop();
		}

		this.update = function(dTime, vars) {
			this.sideLen = p.pow(vars.volume, 1/3);

			// Update position
			let displacement = p5.Vector.mult(this.netForce, p.sq(dTime) / vars.mass);
			this.pos.add(displacement);
			this.netForce.set(0, 0);
		}
	}

	p.setup = function() {
		var cnv = p.createCanvas(800, 600);
		tank = new Tank();
		cube = new Cube();
	}

	var lastTime = Date.now();
	p.draw = function() {
		let dTime = (Date.now() - lastTime) / 1000;
		lastTime = Date.now();
		let vars = {
			mass: fetchValue('mass'),
			volume: fetchValue('volume'),
			g: fetchValue('gravity'),
			rho: fetchValue('fluid_density')
		};

		p.background('#bef5ff');

		// cube.applyForce
		cube.update(dTime, vars);
		cube.draw();

		tank.draw(); // draw tank over any other objects b/c it is translucent
	}
}, 'sim');
