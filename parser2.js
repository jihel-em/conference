"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxErr = exports.parse = exports.Parser = exports.ASTKinds = void 0;
var ASTKinds;
(function (ASTKinds) {
    ASTKinds["ROOT"] = "ROOT";
    ASTKinds["ROOMS"] = "ROOMS";
    ASTKinds["ROOM"] = "ROOM";
    ASTKinds["ROOM_$0"] = "ROOM_$0";
    ASTKinds["PAPERS"] = "PAPERS";
    ASTKinds["PAPER"] = "PAPER";
    ASTKinds["PERSON"] = "PERSON";
    ASTKinds["PERSON_$0"] = "PERSON_$0";
    ASTKinds["PERSON_$1"] = "PERSON_$1";
    ASTKinds["PERSON_$2"] = "PERSON_$2";
    ASTKinds["ABSTRACT"] = "ABSTRACT";
    ASTKinds["VIDEO"] = "VIDEO";
    ASTKinds["EVENTS"] = "EVENTS";
    ASTKinds["EVENT_1"] = "EVENT_1";
    ASTKinds["EVENT_2"] = "EVENT_2";
    ASTKinds["EVENT_3"] = "EVENT_3";
    ASTKinds["SimpleEvent"] = "SimpleEvent";
    ASTKinds["OrganizedEvent"] = "OrganizedEvent";
    ASTKinds["TalkSession"] = "TalkSession";
    ASTKinds["TalkSession_$0"] = "TalkSession_$0";
    ASTKinds["EMAIL"] = "EMAIL";
    ASTKinds["LINK"] = "LINK";
    ASTKinds["STRING"] = "STRING";
    ASTKinds["MULTISTRING"] = "MULTISTRING";
    ASTKinds["INT"] = "INT";
    ASTKinds["ENDLINE"] = "ENDLINE";
    ASTKinds["_"] = "_";
})(ASTKinds = exports.ASTKinds || (exports.ASTKinds = {}));
class Parser {
    constructor(input) {
        this.negating = false;
        this.memoSafe = true;
        this.pos = { overallPos: 0, line: 1, offset: 0 };
        this.input = input;
    }
    reset(pos) {
        this.pos = pos;
    }
    finished() {
        return this.pos.overallPos === this.input.length;
    }
    clearMemos() {
    }
    matchROOT($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$rooms;
            let $scope$papers;
            let $scope$events;
            let $$res = null;
            if (true
                && ($scope$rooms = this.matchROOMS($$dpth + 1, $$cr)) !== null
                && ($scope$papers = this.matchPAPERS($$dpth + 1, $$cr)) !== null
                && ($scope$events = this.matchEVENTS($$dpth + 1, $$cr)) !== null) {
                $$res = { kind: ASTKinds.ROOT, rooms: $scope$rooms, papers: $scope$papers, events: $scope$events };
            }
            return $$res;
        });
    }
    matchROOMS($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$rooms;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:rooms)`, $$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$rooms = this.loop(() => this.matchROOM($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.ROOMS, rooms: $scope$rooms };
            }
            return $$res;
        });
    }
    matchROOM($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $scope$capacite;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && (($scope$capacite = this.matchROOM_$0($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.ROOM, name: $scope$name, capacite: $scope$capacite };
            }
            return $$res;
        });
    }
    matchROOM_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchINT($$dpth + 1, $$cr)) !== null) {
                $$res = { kind: ASTKinds.ROOM_$0, value: $scope$value };
            }
            return $$res;
        });
    }
    matchPAPERS($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$papers;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:papers)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$papers = this.loop(() => this.matchPAPER($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.PAPERS, papers: $scope$papers };
            }
            return $$res;
        });
    }
    matchPAPER($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$paperName;
            let $scope$authors;
            let $scope$abstract;
            let $scope$video;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$paperName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$authors = this.loop(() => this.matchPERSON($$dpth + 1, $$cr), true)) !== null
                && (($scope$abstract = this.matchABSTRACT($$dpth + 1, $$cr)) || true)
                && (($scope$video = this.matchVIDEO($$dpth + 1, $$cr)) || true)) {
                $$res = { kind: ASTKinds.PAPER, paperName: $scope$paperName, authors: $scope$authors, abstract: $scope$abstract, video: $scope$video };
            }
            return $$res;
        });
    }
    matchPERSON($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $scope$about;
            let $scope$homepage;
            let $scope$email;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && (($scope$about = this.matchPERSON_$0($$dpth + 1, $$cr)) || true)
                && (($scope$homepage = this.matchPERSON_$1($$dpth + 1, $$cr)) || true)
                && (($scope$email = this.matchPERSON_$2($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.PERSON, name: $scope$name, about: $scope$about, homepage: $scope$homepage, email: $scope$email };
            }
            return $$res;
        });
    }
    matchPERSON_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.PERSON_$0, value: $scope$value };
            }
            return $$res;
        });
    }
    matchPERSON_$1($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchLINK($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.PERSON_$1, value: $scope$value };
            }
            return $$res;
        });
    }
    matchPERSON_$2($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$value;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$value = this.matchEMAIL($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.PERSON_$2, value: $scope$value };
            }
            return $$res;
        });
    }
    matchABSTRACT($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$text;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\*abstract\*:)`, $$dpth + 1, $$cr) !== null
                && this.matchENDLINE($$dpth + 1, $$cr) !== null
                && ($scope$text = this.matchMULTISTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.ABSTRACT, text: $scope$text };
            }
            return $$res;
        });
    }
    matchVIDEO($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$url;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\*video\*:)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$url = this.matchLINK($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.VIDEO, url: $scope$url };
            }
            return $$res;
        });
    }
    matchEVENTS($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$events;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:events)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$events = this.loop(() => this.matchEVENT($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.EVENTS, events: $scope$events };
            }
            return $$res;
        });
    }
    matchEVENT($$dpth, $$cr) {
        return this.choice([
            () => this.matchEVENT_1($$dpth + 1, $$cr),
            () => this.matchEVENT_2($$dpth + 1, $$cr),
            () => this.matchEVENT_3($$dpth + 1, $$cr),
        ]);
    }
    matchEVENT_1($$dpth, $$cr) {
        return this.matchSimpleEvent($$dpth + 1, $$cr);
    }
    matchEVENT_2($$dpth, $$cr) {
        return this.matchOrganizedEvent($$dpth + 1, $$cr);
    }
    matchEVENT_3($$dpth, $$cr) {
        return this.matchTalkSession($$dpth + 1, $$cr);
    }
    matchSimpleEvent($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$eventName;
            let $scope$abstract;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && (($scope$abstract = this.matchABSTRACT($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.SimpleEvent, eventName: $scope$eventName, abstract: $scope$abstract };
            }
            return $$res;
        });
    }
    matchOrganizedEvent($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$eventType;
            let $scope$eventName;
            let $scope$organizers;
            let $scope$abstract;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\()`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventType = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\))`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$organizers = this.loop(() => this.matchPERSON($$dpth + 1, $$cr), true)) !== null
                && (($scope$abstract = this.matchABSTRACT($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.OrganizedEvent, eventType: $scope$eventType, eventName: $scope$eventName, organizers: $scope$organizers, abstract: $scope$abstract };
            }
            return $$res;
        });
    }
    matchTalkSession($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$eventType;
            let $scope$eventName;
            let $scope$organizers;
            let $scope$abstract;
            let $scope$papers;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\[)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventType = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:\])`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$eventName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$organizers = this.loop(() => this.matchPERSON($$dpth + 1, $$cr), true)) !== null
                && (($scope$abstract = this.matchABSTRACT($$dpth + 1, $$cr)) || true)
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && this.regexAccept(String.raw `(?:###)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:papers)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null
                && ($scope$papers = this.loop(() => this.matchTalkSession_$0($$dpth + 1, $$cr), true)) !== null) {
                $$res = { kind: ASTKinds.TalkSession, eventType: $scope$eventType, eventName: $scope$eventName, organizers: $scope$organizers, abstract: $scope$abstract, papers: $scope$papers };
            }
            return $$res;
        });
    }
    matchTalkSession_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.loop(() => this.matchENDLINE($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.TalkSession_$0, name: $scope$name };
            }
            return $$res;
        });
    }
    matchEMAIL($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[a-zA-Z0-9.!#$%&\'*+/=?^_\`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)`, $$dpth + 1, $$cr);
    }
    matchLINK($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))`, $$dpth + 1, $$cr);
    }
    matchSTRING($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[a-zA-Z0-9][a-zA-Z0-9. ]*)`, $$dpth + 1, $$cr);
    }
    matchMULTISTRING($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:([^\n\r]+\r?\n)*)`, $$dpth + 1, $$cr);
    }
    matchINT($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[0-9]+)`, $$dpth + 1, $$cr);
    }
    matchENDLINE($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:;|\n)`, $$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.ENDLINE, };
            }
            return $$res;
        });
    }
    match_($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[ \t\r\f]*)`, $$dpth + 1, $$cr);
    }
    test() {
        const mrk = this.mark();
        const res = this.matchROOT(0);
        const ans = res !== null;
        this.reset(mrk);
        return ans;
    }
    parse() {
        const mrk = this.mark();
        const res = this.matchROOT(0);
        if (res)
            return { ast: res, errs: [] };
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.clearMemos();
        this.matchROOT(0, rec);
        const err = rec.getErr();
        return { ast: res, errs: err !== null ? [err] : [] };
    }
    mark() {
        return this.pos;
    }
    loop(func, star = false) {
        const mrk = this.mark();
        const res = [];
        for (;;) {
            const t = func();
            if (t === null) {
                break;
            }
            res.push(t);
        }
        if (star || res.length > 0) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    run($$dpth, fn) {
        const mrk = this.mark();
        const res = fn();
        if (res !== null)
            return res;
        this.reset(mrk);
        return null;
    }
    choice(fns) {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    regexAccept(match, dpth, cr) {
        return this.run(dpth, () => {
            const reg = new RegExp(match, "y");
            const mrk = this.mark();
            reg.lastIndex = mrk.overallPos;
            const res = this.tryConsume(reg);
            if (cr) {
                cr.record(mrk, res, {
                    kind: "RegexMatch",
                    // We substring from 3 to len - 1 to strip off the
                    // non-capture group syntax added as a WebKit workaround
                    literal: match.substring(3, match.length - 1),
                    negated: this.negating,
                });
            }
            return res;
        });
    }
    tryConsume(reg) {
        const res = reg.exec(this.input);
        if (res) {
            let lineJmp = 0;
            let lind = -1;
            for (let i = 0; i < res[0].length; ++i) {
                if (res[0][i] === "\n") {
                    ++lineJmp;
                    lind = i;
                }
            }
            this.pos = {
                overallPos: reg.lastIndex,
                line: this.pos.line + lineJmp,
                offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)
            };
            return res[0];
        }
        return null;
    }
    noConsume(fn) {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    negate(fn) {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
    memoise(rule, memo) {
        const $scope$pos = this.mark();
        const $scope$memoRes = memo.get($scope$pos.overallPos);
        if (this.memoSafe && $scope$memoRes !== undefined) {
            this.reset($scope$memoRes[1]);
            return $scope$memoRes[0];
        }
        const $scope$result = rule();
        if (this.memoSafe)
            memo.set($scope$pos.overallPos, [$scope$result, this.mark()]);
        return $scope$result;
    }
}
exports.Parser = Parser;
function parse(s) {
    const p = new Parser(s);
    return p.parse();
}
exports.parse = parse;
class SyntaxErr {
    constructor(pos, expmatches) {
        this.pos = pos;
        this.expmatches = [...expmatches];
    }
    toString() {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Expected one of ${this.expmatches.map(x => x.kind === "EOF" ? " EOF" : ` ${x.negated ? 'not ' : ''}'${x.literal}'`)}`;
    }
}
exports.SyntaxErr = SyntaxErr;
class ErrorTracker {
    constructor() {
        this.mxpos = { overallPos: -1, line: -1, offset: -1 };
        this.regexset = new Set();
        this.pmatches = [];
    }
    record(pos, result, att) {
        if ((result === null) === att.negated)
            return;
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.pmatches = [];
            this.regexset.clear();
        }
        if (this.mxpos.overallPos === pos.overallPos) {
            if (att.kind === "RegexMatch") {
                if (!this.regexset.has(att.literal))
                    this.pmatches.push(att);
                this.regexset.add(att.literal);
            }
            else {
                this.pmatches.push(att);
            }
        }
    }
    getErr() {
        if (this.mxpos.overallPos !== -1)
            return new SyntaxErr(this.mxpos, this.pmatches);
        return null;
    }
}
