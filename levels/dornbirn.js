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
			time: 400
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
			time: 2000,
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
			time: 1500,
			conf: {
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {

			}
		},
		{
			type: 'finish',
			time: 0,
			conf: {
				
			}
		},
		{
			type: "platform",
			time: 800
		},
		{
			type: 'enemy',
			time: 1000,
			conf: {

			}
		}
	]
}