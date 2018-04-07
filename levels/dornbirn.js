var level_dornbirn = {
	title: 'Dornbirn',
	spawns: [
		{
			type: "platform",
			time: 500
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
			time: 1500,
			conf: {
				speed: -SPEED * 1.2
			}
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {

			}
		}
	]
}