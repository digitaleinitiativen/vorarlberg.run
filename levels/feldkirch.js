var level_feldkirch = {
	title: 'Feldkirch',
	welcome: '2 1 Feldkirch',
	spawns: [
		{
			type: 'enemy',
			time: 500,
			conf: {
			}
		},
		{
			type: "platform",
			time: 400
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {
			}
		},
		{
			type: 'decoration',
			time: 500,
			conf: {
				image: 'flower1'
			}
		},
		{
			type: 'powerup',
			time: 2000,
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
			type: 'decoration',
			time: 500,
			conf: {
				image: 'flower2'
			}
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'obstacle',
			time: 500
		},
		{
			type: 'enemy',
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'decoration',
			time: 500,
			conf: {
				image: 'flower0'
			}
		},
		{
			type: "platform",
			time: 700
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
			type: 'enemy',
			time: 500,
			conf: {
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
			type: 'decoration',
			time: 500,
			conf: {
				image: 'flower3'
			}
		},
		{
			type: "platform",
			time: 250
		},
		{
			type: 'obstacle',
			time: 1500
		},
		{
			type: 'enemy',
			time: 3000,
			conf: {
				speed: -ENEMY_SPEED * 1.2
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
			type: 'enemy',
			time: 3000,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: "platform",
			time: 500
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
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.5
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
			time: 500
		},
		{
			type: "platform",
			time: 800
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
			time: 0
		},
		{
			type: 'enemy',
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.5
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
			type: 'obstacle',
			time: 500,
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
			time: 800
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
				image: 'finish-feldkirch'
			}
		},

		{
			type: 'enemy',
			time: 1000,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		}
	]
}