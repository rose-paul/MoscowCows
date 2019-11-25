const MovingCow = require('./moving_cow')

window.MovingCow = MovingCow;

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('game-canvas');
    const ctx = el.getContext('2d');

    let cow1 = new MovingCow({ pos: [50, 50], vel: [15, 15], radius: 5, color: 'brown' })
    let cow2 = new MovingCow({ pos: [100, 100], vel: [20, 100], radius: 5, color: 'brown' })
    let cow3 = new MovingCow({ pos: [200, 200], vel: [300, 500], radius: 5, color: 'brown' })
    let cow4 = new MovingCow({ pos: [1000, 400], vel: [150, 200], radius: 5, color: 'brown' })
    cow1.draw(ctx)
    cow2.draw(ctx)
    cow3.draw(ctx)
    cow4.draw(ctx)
    
    console.log('in add event listener')

})