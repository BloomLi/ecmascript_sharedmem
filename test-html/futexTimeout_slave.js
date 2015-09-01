importScripts("worker-harness.js");

var mem;
var WAITLOC;

onmessage =
    function (ev) {
	try {
	    switch (ev.data[0]) {
            case "start":
		mem = new SharedInt32Array(ev.data[1]);
		WAITLOC = ev.data[2];
		break;
	    case "timeout":
		var [_, ms, result] = ev.data;
		postMessage(["msg", "Going into " + ms + "ms wait in the worker"]);
		var t0 = Date.now();
		var r = Atomics.futexWait(mem, WAITLOC, 0, ms);
		postMessage(["msg", "Wait returned " + r]);
		var t1 = Date.now();
		switch (r) {
		case Atomics.TIMEDOUT:
		    postMessage(["timedout", result, t1-t0]);
		    break;
		case Atomics.NOTEQUAL:
		    postMessage(["notequal", result, t1-t0]);
		    break;
		case Atomics.OK:
		    postMessage(["woken", result, t1-t0]);
		    break;
		default:
		    postMessage(["failure", [result, r], t1-t0]);
		    break;
		}
		break;
	    default:
		postMessage("Bogus command: " + ev.data.join(","));
		break;
	    }
	}
	catch (e) {
	    postMessage("Caught exception: " + e);
	}
    };
