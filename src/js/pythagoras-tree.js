class Tree {

	constructor() {
			this.canvas = document.querySelector('#ctx')
			this.Drange = document.querySelector('#set_degr')
			this.ctx = this.canvas.getContext('2d')
			this.ctx.lineWidth = 1         // толщина линии
			this.ctx.strokeStyle = 'white' // цвет    линии
			
			this.degrBase = 45
			this.degr = this.degrBase

			this.set_default()
			this.handleRange()
	}

	set_default() {
			this.length = 160 // первоначальная длинна лнии
			this.step_value = 10 // кол-во шагов (рисования)
			
			this.baseX = 600 // дефолтная ширина
			this.baseY = 720 // дефолтная высота (в самом низу)
			
			// координаты столба дерева
			this.lineX = 600
			this.lineY = 500
	}

	handleRange() {
			this.Drange.addEventListener('mousemove', (e)=>{
					if(e.which == 1) {
							this.rangeFunc(Number(e.target.value))
					}
			}, false)

			this.Drange.addEventListener('change', (e)=>{
							this.rangeFunc(Number(e.target.value))
			}, false)
	}

	rangeFunc(value) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

			let degrees_monitor = document.querySelector('.degrees_monitor')
					degrees_monitor.textContent = value

			this.degrBase = value
			this.degr = value

			this.set_default()
			this.makeTree()
	}

	makeTree() {
			// отрисовываем столб дерева
			this.ctx.beginPath()                     // clear field
			this.ctx.moveTo(this.baseX, this.baseY); // передвигаем перо
			this.ctx.lineTo(this.lineX, this.lineY); // рисуем линию

			this.createBranch(this.step_value, true, this.degr, this.length, this.lineX, this.lineY)

			this.set_default()
			this.ctx.moveTo(this.lineX, this.lineY); // передвигаем перо
			this.degr = this.degrBase

			this.createBranch(this.step_value, false, this.degr, this.length, this.lineX, this.lineY)

			this.ctx.stroke()
			this.ctx.closePath()
	}

	createBranch(stepValue = 10, sideBool = true, degr = 45, length, lineX, lineY) {
			let direction = sideBool ? 'right' : 'left'

			if(stepValue > 0) {
					// processing
					let result = this.count_angle(degr, length, lineX, lineY, direction)
					this.ctx.moveTo(lineX, lineY)
					this.ctx.lineTo(result.lineX, result.lineY)

					length = length / 1.6
	
					stepValue--
					this.createBranch(stepValue, sideBool, (degr - Number(this.degrBase)), length, result.lineX, result.lineY)
					this.createBranch(stepValue, sideBool, (degr + Number(this.degrBase)), length, result.lineX, result.lineY)
			}
	}

	count_angle(degr, length, lineX, lineY, side) {
			degr = Number(degr)

			if(degr <= 0) degr = 360 + degr

			if(degr > 0 && degr < 90) {
					let result = this.do_1_section_new(lineX, lineY, length, degr, side)
					lineX = result.lineX
					lineY = result.lineY
			}
			if(degr > 90 && degr < 180) {
					let result = this.do_2_section_new(lineX, lineY, length, degr, side)
					lineX = result.lineX
					lineY = result.lineY
			}
			if(degr > 180 && degr < 270) {
					let result = this.do_3_section_new(lineX, lineY, length, degr, side)
					lineX = result.lineX
					lineY = result.lineY
			}
			if(degr > 270 && degr < 360) {
					let result = this.do_4_section_new(lineX, lineY, length, degr, side)
					lineX = result.lineX
					lineY = result.lineY
			}

			/////////
			if(degr == 90)  lineY -= length

			if(degr == 180) {
					if(side == "right") {
							lineX -= length
					}
					if(side == "left") {
							lineX += length
					}
			}
			if(degr == 270) lineY += length

			if(degr == 360) {
					if(side == "right") {
							lineX += length
					}
					if(side == "left") {
							lineX -= length
					}
			}

			return {
					"lineY": lineY,
					"lineX": lineX
			}
	}

	///////
	do_1_section_new(lineX, lineY, length, degr, side) {
			let radian = degr * Math.PI / 180
	
			// if turn right
			let sin = Math.sin(radian)
			let cos = Math.cos(radian)
			let yLength = length * sin
			let xLength = length * cos
			
			if(side == "right") {
					lineX += xLength
					lineY -= yLength
			}
			if(side == "left") {
					lineX -= xLength
					lineY -= yLength
			}

			return {
					"lineY": lineY,
					"lineX": lineX
			}
	}

	do_2_section_new(lineX, lineY, length, degr, side) {
			degr = degr - 90
			let radian = degr * Math.PI / 180
	
			// if turn right
			let sin = Math.sin(radian)
			let cos = Math.cos(radian)
			let xLength = length * sin
			let yLength = length * cos
			
			if(side == "right") {
					lineX -= xLength
					lineY -= yLength
			}
			if(side== "left") {
					lineX += xLength
					lineY -= yLength
			}

			return {
					"lineY": lineY,
					"lineX": lineX
			}
	}

	do_3_section_new(lineX, lineY, length, degr, side) {
			degr = degr - 180
			let radian = degr * Math.PI / 180
	
			// if turn right
			let sin = Math.sin(radian)
			let cos = Math.cos(radian)
			let xLength = length * sin
			let yLength = length * cos
			
			if(side == "right") {
					lineX -= xLength
					lineY += yLength
			}
			if(side == "left") {
					lineX += xLength
					lineY += yLength
			}

			return {
					"lineY": lineY,
					"lineX": lineX
			}
	}

	do_4_section_new(lineX, lineY, length, degr, side) {
			degr = degr - 270
			let radian = degr * Math.PI / 180
	
			// if turn right
			let sin = Math.sin(radian)
			let cos = Math.cos(radian)
			let xLength = length * sin
			let yLength = length * cos
			
			if(side == "right") {
					lineX += xLength
					lineY += yLength
			}
			if(side == "left") {
					lineX -= xLength
					lineY += yLength
			}

			return {
					"lineY": lineY,
					"lineX": lineX
			}
	}

}

const Tree_ex = new Tree()
		Tree_ex.makeTree()