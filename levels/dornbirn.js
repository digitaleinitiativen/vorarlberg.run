var level_dornbirn = {
	title: 'Dornbirn',
	spawns: [
		{
			type: 'powerup',
			time: 100,
			conf: {
				powerUpType: "timefreeze"
			}
		},
		{
			type: "platform",
			time: 500
		},
		{
			type: 'powerup',
			time: 1500,
			conf: {
				powerUpType: "extraLife"
			}
		},
		{
			type: 'enemy',
			time: 2500,
			conf: {

			}
		},
		{
			type: 'powerup',
			time: 0,
			conf: {
				powerUpType: "feather"
			}
		},
		{
			type: 'enemy',
			time: 2500,
			conf: {
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'enemy',
			time: 2500,
			conf: {

			}
		},
		{
			type: "platform",
			time: 500
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {

			}
		},
		{
			type: 'powerup',
			time: 700,
			conf: {
				powerUpType: "feather"
			}
		},
		{
			type: 'enemy',
			time: 1500,
			conf: {

			}
		},
		{
			type: 'enemy',
			time: 1500,
			conf: {
				image: 'enemy-red',
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'enemy',
			time: 1500,
			conf: {
				image: 'enemy-red',
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'powerup',
			time: 600,
			conf: {
				powerUpType: "timefreeze"
			}
		},
		{
			type: 'obstacle',
			time: 600
		},
		{
			type: 'enemy',
			time: 4000,
			conf: {
				image: 'enemy-red',
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'enemy',
			time: 3500,
			conf: {
				image: 'enemy-blue',
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: "platform",
			time: 1200
		},
		{
			type: 'powerup',
			time: 1500,
			conf: {
				powerUpType: "extraLife"
			}
		},
		{
			type: 'enemy',
			time: 1500,
			conf: {
				image: 'enemy-blue',
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: 'enemy',
			time: 2500,
			conf: {
				image: 'enemy-blue',
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: 'enemy',
			time: 2500,
			conf: {
				image: 'enemy-blue',
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: "platform",
			time: 1200
		},
		{
			type: 'enemy',
			time: 1500,
			conf: {
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: 'enemy',
			time: 3000,
			conf: {
				image: 'enemy-blue',
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: 'obstacle',
			time: 600,
		},
		{
			type: 'enemy',
			time: 4500,
			conf: {
				image: 'enemy-blue',
				speed: -ENEMY_SPEED * 1.5
			}
		},
		{
			type: "platform",
			time: 800
		},
		{
			type: 'enemy',
			time: 1200,
			conf: {

			}
		},
		{
			type: 'finish',
			time: 1000,
			conf: {
				image: 'finish-dornbirn'
			}
		},
	]
}