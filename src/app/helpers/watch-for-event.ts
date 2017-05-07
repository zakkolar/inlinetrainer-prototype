function makeEventString(event, id) {
  return event + '.' + id;
}
export const WatchForEvent = function(eventString: string, target: string, id: string, callback: Function){
  const $ = require('jquery');
  const events = eventString.split(' ');

  for (const event of events) {
    setTimeout(function () {
      $(target).on(makeEventString(event, id), function (e) {
        callback();
      });
    }, 100);
  }

};

export const UnwatchForEvent = function(eventString: string, target: string, id: string){
  const $ = require('jquery');
  const events = eventString.split(' ');
  for (const event of events){
    $(target).off(makeEventString(event, id));
  }
};
