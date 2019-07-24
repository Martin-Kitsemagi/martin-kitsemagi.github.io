var header_bubbles;

function navMobile() {
	$("#header_nav_mobile").on("click", function(event) {
		if ($("#page_nav").hasClass("page_nav_mobile")) {
			navMobileClose();
		} else {
			navMobileOpen();
		}
		
		event.stopPropagation();
	});
	
	$("#page_inner_wrapper").on("click", function() {
		navMobileClose();
	});
}

function navMobileOpen() {
	$("#page_nav").addClass("page_nav_mobile");
	$("#page_inner_wrapper").addClass("page_inner_wrapper_mobile");
	$("#header_nav_mobile").addClass("header_nav_mobile_animate");
}

function navMobileClose() {
	$("#page_nav").removeClass("page_nav_mobile");
	$("#page_inner_wrapper").removeClass("page_inner_wrapper_mobile");
	$("#header_nav_mobile").removeClass("header_nav_mobile_animate");
}

function navPage() {
	$(".page_nav_element").on("click", function() {
		if ($(this).attr("id") !== undefined) {
			scrollToPanel("#" + $(this).attr("id").replace("_nav", ""));
		}
		
		navMobileClose();
	});
}

function scrollToPanel(id) {
	var top = 0;
	
	if ($(id).outerHeight() < $(window).height()) {
		top = $(id).offset().top - $(".header_nav").outerHeight() + ($(id).outerHeight() - $(window).height()) / 2;
	} else {
		top = $(id).offset().top - $(".header_nav").outerHeight();
	}
	
	scrollTo(top);
}

function scrollToTop() {
	scrollTo(0);
}

function scrollTo(top) {
	var scroll_delay = 525;
	
	$("html, body").animate({
		scrollTop: top
	}, scroll_delay);
}

function headerBubbles() {
	if (header_bubbles !== undefined) return;
	
	var bubbles = [];
	var fps = 60;
	var frames = 0;
	
	var loop;
	var canvas = document.getElementById("header_canvas");
	var context = canvas.getContext("2d");
	
	resizeCanvas();
	
	var bubbleAnimation = {
		bubbles: bubbles,
		fps: fps,
		frames: frames,
		loop: loop,
		canvas: canvas,
		context: context,
		
		startBubblesAnimation: function() {
			if (this.loop === undefined) {
				var self = this;
				
				this.loop = setInterval(function() {
					self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
					
					if (self.frames % self.fps === 0) {
						self.frames = 0;
						self.bubbles.push(self.generateBubble());
					}
					
					for (var i = self.bubbles.length - 1; i >= 0; i--) {
						self.bubbles[i].draw();
						self.bubbles[i].move();
						
						if (self.bubbles[i].y < (0 - self.bubbles[i].radius)) self.bubbles.splice(i, 1);
					}
					
					self.frames++;
				}, 1000 / this.fps);
			}
		},
	
		stopBubblesAnimation: function() {
			if (this.loop !== undefined) {
				clearInterval(this.loop);
				this.loop = undefined;
			}
		},
	
		generateBubble: function() {
			var self = this;
			
			var radius_min = 10;
			var radius_max = 25;
			var radius = Math.floor(Math.random() * (radius_max - radius_min)) + radius_min;
			
			var x = Math.floor(Math.random() * (canvas.width - radius));
			var y = canvas.height + radius;
			
			var speed_min = 50;
			var speed_max = 150;
			var speed = (Math.floor(Math.random() * (speed_max - speed_min)) + speed_min) / 100;
			
			var bubble = {
				x: x,
				y: y,
				y_start: y,
				radius: radius,
				speed: speed,
				
				color: "rgba(68, 84, 111, 0.15)",
				shadow: [0, 1, 2, "#303c4f"],
				
				move: function() {
					this.y -= this.speed;
					
					this.x += Math.cos((this.y_start - this.y) / (this.speed * 50));
				},
				
				draw: function() {
					self.context.beginPath();
					self.context.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI);
					self.context.fillStyle = this.color;
					self.context.shadowOffsetX = this.shadow[0];
					self.context.shadowOffsetY = this.shadow[1];
					self.context.shadowBlur = this.shadow[2];
					self.context.shadowColor = this.shadow[3];
					self.context.fill();
				}
			}
			
			return bubble;
		}
	}
	
	function resizeCanvas() {
		$(window).on("resize", function() {
			canvas.width = $(window).innerWidth();
			canvas.height = $(window).innerHeight();
		});
		
		$(document).ready(function() {
			$(window).trigger("resize");
		});
	}
	
	header_bubbles = bubbleAnimation;
	header_bubbles.startBubblesAnimation();
}

function setHeaderHeight() {
	$("#header").height($(window).innerHeight());
}

$(document).ready(function() {
	setHeaderHeight();
	headerBubbles();
	
	navMobile();
	navPage();
});
