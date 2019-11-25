const MovingCow = require('./moving_cow')

window.MovingCow = MovingCow;

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');

    let cow1 = new MovingCow({ pos: [50, 50], vel: [10, 10], radius: 5, color: 'brown' })
    cow1.draw(ctx)
    console.log('in add event listener')

})