import eventEmitter from 'event-emitter'

let msgEmitter=new eventEmitter();

export function alert(...args){
	msgEmitter.emit('$alert',...args);
}

export function addAlertEvent(fn){
	msgEmitter.on('$alert',fn)
}

export function removeAlertEvent(fn){
	msgEmitter.off('$alert',fn);
}

export function pop(...args){
	msgEmitter.emit('$pop',...args);
}

export function addPopEvent(fn){
	msgEmitter.on('$pop',fn)
}

export function removePopEvent(fn){
	msgEmitter.off('$pop',fn);
}
