const info = ['if (!t.isTrusted || void 0 !== t.button && 0 !== t.button)'];
debugger;
let completed;
let tIndex = info[0].search(/!\w{1}\.isT/);
if (tIndex !== -1) {
  let dIndex = info[0].search(/\.isT/);
  let numberOfLetters = dIndex - tIndex - 1;
  completed = info[0].replace(
    /!\w\.isT\w{6}/,
    `(${info[0].substr(tIndex, numberOfLetters + 11)} && (!${info[0].substr(
      tIndex + 1,
      numberOfLetters
    )}.data || ${info[0].substr(tIndex + 1, numberOfLetters)}.data[5] !== '-'))`
  );
} else {
  completed = info[0];
}
