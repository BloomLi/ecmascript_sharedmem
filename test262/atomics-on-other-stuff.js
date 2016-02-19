// Copyright (C) 2015 Mozilla Corporation.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

// BEGIN PROLOGUE
beginTest("atomics-on-other-stuff");
// END PROLOGUE

/*---
es7id: TBD
description: >
  Test atomic operations on values other than TypedArrays
---*/

var values = [null,
	      undefined,
	      true,
	      false,
	      new Boolean(true),
	      10,
	      3.14,
	      new Number(4),
	      "Hi there",
	      new Date,
	      /a*utomaton/g,
	      { password: "qumquat" },
	      new DataView(new ArrayBuffer(10)),
	      new ArrayBuffer(128),
	      new SharedArrayBuffer(128),
	      new Error("Ouch"),
	      [1,1,2,3,5,8],
	      ((x) => -x),
	      new Map(),
	      new Set(),
	      new WeakMap(),
	      new WeakSet(),
	      new Promise(() => "done"),
	      Symbol("halleluja"),
	      // TODO: Proxy?
	      Object,
	      Int32Array,
	      Date,
	      Math,
	      Atomics ];

for ( var i=0 ; i < values.length ; i++ ) {
    var view = values[i];
    assert.throws(TypeError, (() => Atomics.load(view, 0)));
    assert.throws(TypeError, (() => Atomics.store(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.exchange(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.compareExchange(view, 0, 0, 0)));
    assert.throws(TypeError, (() => Atomics.add(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.sub(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.and(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.or(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.xor(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.futexWait(view, 0, 0)));
    assert.throws(TypeError, (() => Atomics.futexWake(view, 0)));
    assert.throws(TypeError, (() => Atomics.futexWakeOrRequeue(view, 0, 0, 1, 0)));
}

// BEGIN EPILOGUE
finishTest("atomics-on-other-stuff");
// END EPILOGUE