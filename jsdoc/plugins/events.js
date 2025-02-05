const events = {};

exports.handlers = {
  /**
   * @param {NewDocletEvent} e
   */
  newDoclet(e) {
    const doclet = e.doclet;
    if (doclet.kind !== 'event') return;

    const cls = doclet.longname.split('#')[0];
    if (!(cls in events)) events[cls] = [];
    events[cls].push(doclet.longname);
  },

  /**
   * @param {ParseCompleteEvent} e
   */
  parseComplete(e) {
    const doclets = e.doclets;
    for (let i = 0, ii = doclets.length - 1; i < ii; ++i) {
      const doclet = doclets[i];
      if (doclet.fires)
        if (doclet.kind == 'class') {
          const fires = [];
          for (let j = 0, jj = doclet.fires.length; j < jj; ++j) {
            let event = doclet.fires[j].replace('event:', '');
            if (events[event]) fires.push.apply(fires, events[event]);
            else if (doclet.fires[j] !== 'event:ObjectEvent') fires.push(doclet.fires[j]);
          }
          doclet.fires = fires;
        }
    }
  },
};
