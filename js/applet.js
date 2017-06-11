var sketch = new p5(function(p) {
	var meterPerPx = 1/10;
	var tank;
	var cube;

	// Retrieve value from an input with 'id'
	function fetchValue(id) {
		let val = document.getElementById(id).value;
		return parseFloat(val);
	}

	function Tank() {
		// top-left corner of tank
		this.pos = p.createVector(30 * meterPerPx, (p.height / 2) * meterPerPx);
		this.width = (p.width - 60) * meterPerPx;
		this.height = (p.height / 2 - 10) * meterPerPx;

		this.draw = function() {
			p.push();
			p.fill(p.color(0, 140, 184, 128));
			p.stroke('black');
			p.beginShape();
			p.vertex(this.pos.x / meterPerPx, this.pos.y / meterPerPx);
			p.vertex(this.pos.x / meterPerPx, (this.pos.y + this.height) / meterPerPx);
			p.vertex((this.pos.x + this.width) / meterPerPx, (this.pos.y + this.height) / meterPerPx);
			p.vertex((this.pos.x + this.width) / meterPerPx, this.pos.y / meterPerPx);
			p.endShape();
			p.pop();
		}
	}

	function Cube() {
		this.sideLen = p.pow(fetchValue('volume'), 1/3); // in meters

		// Center <x, y> of the cube
		this.pos = p.createVector(tank.pos.x + tank.width / 2, tank.pos.y);
		this.vel = p.createVector();
		this.acc = p.createVector();

		this.applyForce = function(force, vars) {
			this.acc.add(force.mult(vars.mass));
		}

		this.draw = function() {
			p.push();
			p.fill('#493c21');
			p.stroke('black');
			p.strokeWeight(1);
			p.rect((this.pos.x - this.sideLen / 2) / meterPerPx, (this.pos.y - this.sideLen / 2) / meterPerPx, this.sideLen / meterPerPx, this.sideLen / meterPerPx);
			p.pop();
		}

		this.update = function(dTime, vars) {
			this.sideLen = p.pow(vars.volume, 1/3);

			// Bound cube position to the bottom of the tank
			if (this.pos.y + this.sideLen / 2 > tank.pos.y + tank.height) {
				this.vel.set(0, 0);
				this.acc.set(0, 0);
				this.pos.y = tank.pos.y + tank.height - this.sideLen / 2;
			}

			// Update position
			this.vel.add(p5.Vector.mult(this.acc, dTime));
			this.pos.add(p5.Vector.mult(this.vel, dTime));
		}
	}

	p.setup = function() {
		var cnv = p.createCanvas(800, 600);
		tank = new Tank();
		cube = new Cube();
		document.getElementById('reset').onclick = function() {
			cube = new Cube();
		}
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

		cube.applyForce(p.createVector(0, vars.g * vars.mass), vars);
		cube.update(dTime, vars);
		cube.draw();

		tank.draw(); // draw tank over any other objects b/c it is translucent
	}
}, 'sim');
