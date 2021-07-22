"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxErr = exports.parse = exports.Parser = exports.INT = exports.STRING = exports.ASTKinds = void 0;
var ASTKinds;
(function (ASTKinds) {
    ASTKinds["PROGRAM"] = "PROGRAM";
    ASTKinds["STATEMENT_1"] = "STATEMENT_1";
    ASTKinds["STATEMENT_2"] = "STATEMENT_2";
    ASTKinds["ROOMS"] = "ROOMS";
    ASTKinds["ROOM"] = "ROOM";
    ASTKinds["ROOM_$0"] = "ROOM_$0";
    ASTKinds["PAPERS"] = "PAPERS";
    ASTKinds["PAPER"] = "PAPER";
    ASTKinds["PERSON"] = "PERSON";
    ASTKinds["PERSON_$0"] = "PERSON_$0";
    ASTKinds["PERSON_$1"] = "PERSON_$1";
    ASTKinds["PERSON_$2"] = "PERSON_$2";
    ASTKinds["LINK"] = "LINK";
    ASTKinds["STRING"] = "STRING";
    ASTKinds["INT"] = "INT";
    ASTKinds["ENDLINE"] = "ENDLINE";
    ASTKinds["_"] = "_";
})(ASTKinds = exports.ASTKinds || (exports.ASTKinds = {}));
class STRING {
    constructor(val) {
        this.kind = ASTKinds.STRING;
        this.val = val;
        this.value = (() => {
            return this.val;
        })();
    }
}
exports.STRING = STRING;
class INT {
    constructor(val) {
        this.kind = ASTKinds.INT;
        this.val = val;
        this.value = (() => {
            return parseInt(this.val);
        })();
    }
}
exports.INT = INT;
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
    matchPROGRAM($$dpth, $$cr) {
        return this.loop(() => this.matchSTATEMENT($$dpth + 1, $$cr), true);
    }
    matchSTATEMENT($$dpth, $$cr) {
        return this.choice([
            () => this.matchSTATEMENT_1($$dpth + 1, $$cr),
            () => this.matchSTATEMENT_2($$dpth + 1, $$cr),
        ]);
    }
    matchSTATEMENT_1($$dpth, $$cr) {
        return this.matchROOMS($$dpth + 1, $$cr);
    }
    matchSTATEMENT_2($$dpth, $$cr) {
        return this.matchPAPERS($$dpth + 1, $$cr);
    }
    matchROOMS($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:rooms)`, $$dpth + 1, $$cr) !== null
                && this.matchENDLINE($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchROOM($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.ROOMS, };
            }
            return $$res;
        });
    }
    matchROOM($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $scope$rhs;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && (($scope$rhs = this.matchROOM_$0($$dpth + 1, $$cr)) || true)
                && this.matchENDLINE($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.ROOM, name: $scope$name, rhs: $scope$rhs };
            }
            return $$res;
        });
    }
    matchROOM_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$cap;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$cap = this.matchINT($$dpth + 1, $$cr)) !== null) {
                $$res = { kind: ASTKinds.ROOM_$0, cap: $scope$cap };
            }
            return $$res;
        });
    }
    matchPAPERS($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:#)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:papers)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && this.matchENDLINE($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchPAPER($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.PAPERS, };
            }
            return $$res;
        });
    }
    matchPAPER($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$paperName;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:##)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$paperName = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.matchENDLINE($$dpth + 1, $$cr) !== null
                && this.loop(() => this.matchPERSON($$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.PAPER, paperName: $scope$paperName };
            }
            return $$res;
        });
    }
    matchPERSON($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$name;
            let $scope$snd;
            let $scope$trd;
            let $scope$fth;
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.regexAccept(String.raw `(?:-)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$name = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && (($scope$snd = this.matchPERSON_$0($$dpth + 1, $$cr)) || true)
                && (($scope$trd = this.matchPERSON_$1($$dpth + 1, $$cr)) || true)
                && (($scope$fth = this.matchPERSON_$2($$dpth + 1, $$cr)) || true)
                && this.matchENDLINE($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.PERSON, name: $scope$name, snd: $scope$snd, trd: $scope$trd, fth: $scope$fth };
            }
            return $$res;
        });
    }
    matchPERSON_$0($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$about;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$about = this.matchSTRING($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.PERSON_$0, about: $scope$about };
            }
            return $$res;
        });
    }
    matchPERSON_$1($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$homepage;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$homepage = this.matchLINK($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.PERSON_$1, homepage: $scope$homepage };
            }
            return $$res;
        });
    }
    matchPERSON_$2($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$email;
            let $$res = null;
            if (true
                && this.regexAccept(String.raw `(?:,)`, $$dpth + 1, $$cr) !== null
                && this.match_($$dpth + 1, $$cr) !== null
                && ($scope$email = this.matchLINK($$dpth + 1, $$cr)) !== null
                && this.match_($$dpth + 1, $$cr) !== null) {
                $$res = { kind: ASTKinds.PERSON_$2, email: $scope$email };
            }
            return $$res;
        });
    }
    matchLINK($$dpth, $$cr) {
        return this.regexAccept(String.raw `(?:[a-zA-Z0-9.\/?!=\-\+:@]+)`, $$dpth + 1, $$cr);
    }
    matchSTRING($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$val;
            let $$res = null;
            if (true
                && ($scope$val = this.regexAccept(String.raw `(?:[a-zA-Z0-9][a-zA-Z0-9.\s]*)`, $$dpth + 1, $$cr)) !== null) {
                $$res = new STRING($scope$val);
            }
            return $$res;
        });
    }
    matchINT($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $scope$val;
            let $$res = null;
            if (true
                && ($scope$val = this.regexAccept(String.raw `(?:[0-9]+)`, $$dpth + 1, $$cr)) !== null) {
                $$res = new INT($scope$val);
            }
            return $$res;
        });
    }
    matchENDLINE($$dpth, $$cr) {
        return this.run($$dpth, () => {
            let $$res = null;
            if (true
                && this.match_($$dpth + 1, $$cr) !== null
                && this.loop(() => this.regexAccept(String.raw `(?:;|\n)`, $$dpth + 1, $$cr), true) !== null) {
                $$res = { kind: ASTKinds.ENDLINE, };
            }
            return $$res;
        });
    }
    match_($$dpth, $$cr) {
        return this.loop(() => this.regexAccept(String.raw `(?:\s)`, $$dpth + 1, $$cr), true);
    }
    test() {
        const mrk = this.mark();
        const res = this.matchPROGRAM(0);
        const ans = res !== null;
        this.reset(mrk);
        return ans;
    }
    parse() {
        const mrk = this.mark();
        const res = this.matchPROGRAM(0);
        if (res)
            return { ast: res, errs: [] };
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.clearMemos();
        this.matchPROGRAM(0, rec);
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
