var level_bludenz = {
	title: 'Bludenz',
	welcome: 'Sali in Bludensch',
	spawns: [
		{
			type: 'enemy',
			time: 500,
			conf: {
			}
		},
		{
			type: 'decoration',
			time: 200,
			conf: {
				image: 'flower0'
			}
		},
		{
			type: "platform",
			time: 200
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {
				jumps: true
			}
		},
		{
			type: 'powerup',
			time: 2500,
			conf: {
				powerUpType: "extraLife"
			}
		},
		{
			type: "obstacle",
			time: 1000,
		},
		{
			type: 'powerup',
			time: 1500,
			conf: {
				powerUpType: "feather"
			}
		},
		{
			type: 'enemy',
			time: 2500,
			conf: {
				jumps: true,
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'obstacle',
			time: 500
		},
		{
			type: 'decoration',
			time: 500,
			conf: {
				image: 'flower1'
			}
		},
		{
			type: 'platform',
			time: 500
		},
		{
			type: "platform",
			time: 1500
		},
		{
			type: 'enemy',
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'powerup',
			time: 100,
			conf: {
				powerUpType: "timefreeze"
			}
		},
		{
			type: 'decoration',
			time: 500,
			conf: {
				image: 'flower2'
			}
		},
		{
			type: 'platform',
			time: 1000
		},
		{
			type: 'enemy',
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.5,
				jumps: true
			}
		},
		{
			type: 'powerup',
			time: 1500,
			conf: {
				powerUpType: "feather"
			}
		},
		{
			type: 'enemy',
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: "platform",
			time: 750
		},
		{
			type: 'obstacle',
			time: 1500
		},
		{
			type: 'enemy',
			time: 3000,
			conf: {
				speed: -ENEMY_SPEED * 1.2,
				jumps: true
			}
		},
		{
			type: 'platform',
			time: 3500
		},
		{
			type: "platform",
			time: 1500
		},
		{
			type: 'powerup',
			time: 2000,
			conf: {
				powerUpType: "extraLife"
			}
		},
		{
			type: 'enemy',
			time: 1500,
			conf: {
				speed: -ENEMY_SPEED * 1.5,
				jumps: true
			}
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: 'obstacle',
			time: 1000
		},
		{
			type: 'decoration',
			time: 500,
			conf: {
				image: 'flower1'
			}
		},
		{
			type: "platform",
			time: 1000
		},
		{
			type: 'enemy',
			time: 1200,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: "platform",
			time: 0
		},
		{
			type: 'enemy',
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.5,
				jumps: true
			}
		},
		{
			type: 'decoration',
			time: 1000,
			conf: {
				image: 'flower0'
			}
		},
		{
			type: 'platform',
			time: 500
		},
		{
			type: 'decoration',
			time: 250,
			conf: {
				image: 'flower2'
			}
		},
		{
			type: 'obstacle',
			time: 750,
		},
		{
			type: 'enemy',
			time: 500,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: "platform",
			time: 1000
		},
		{
			type: 'enemy',
			time: 3000,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: 'finish',
			time: 1000,
			conf: {
				image: 'finish-bludenz'
			}
		},

		{
			type: 'enemy',
			time: 1500,
			conf: {
				speed: -ENEMY_SPEED * 1.5,
				jumps: true
			}
		}
	]
}