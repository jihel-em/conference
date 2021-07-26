"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const Parser = require("./parser2");
function evaluate(input) {
    const p = new Parser.Parser(input);
    const tree = p.parse();
    if (tree.errs.length == 0 && tree.ast)
        return calcRoot(tree.ast, { rooms: [], papers: [], events: [] });
    console.log('' + tree.errs);
    return null;
}
exports.evaluate = evaluate;
function calcRoot(node, context) {
    calcRooms(node.rooms, context);
    calcPapers(node.papers, context);
    calcEvents(node.events, context);
    console.log(context);
    return null;
}
function calcRooms(node, context) {
    for (let room of node.rooms) {
        const theRoom = calcRoom(room, context);
        context.rooms.push(theRoom);
    }
    return null;
}
function calcRoom(node, context) {
    return { name: node.name, capacity: node.capacite ? parseInt(node.capacite.value) : null };
}
function calcPapers(node, context) {
    for (let paper of node.papers) {
        const thePaper = calcPaper(paper, context);
        context.papers.push(thePaper);
    }
    return null;
}
function calcPaper(node, context) {
    const thePaper = {
        authors: [],
        title: node.paperName,
        abstract: node.abstract ? calcAbstract(node.abstract, context) : null,
        video: node.video ? calcVideo(node.video, context) : null
    };
    for (let author of node.authors) {
        const theAuthor = calcPerson(author, context);
        thePaper.authors.push(thePaper);
    }
    return thePaper;
}
function calcPerson(node, context) {
    return {
        name: node.name,
        about: node.about ? node.about.value : null,
        homepage: node.homepage ? node.homepage.value : null,
        email: node.email ? node.email.value : null
    };
}
function calcAbstract(node, context) {
    return node.text;
}
function calcVideo(node, context) {
    return node.url;
}
function calcEvents(node, context) {
    for (let event of node.events) {
        const theEvent = calcEvent(event, context);
        context.events.push(theEvent);
    }
    return null;
}
function calcEvent(node, context) {
    if (node.kind == Parser.ASTKinds.SimpleEvent) {
        return calcSimpleEvent(node, context);
    }
    if (node.kind == Parser.ASTKinds.OrganizedEvent) {
        return calcOrganizedEvent(node, context);
    }
    if (node.kind == Parser.ASTKinds.TalkSession) {
        return calcTalkSession(node, context);
    }
    return null;
}
function calcSimpleEvent(node, context) {
    return {
        name: node.eventName,
        abstract: node.abstract ? calcAbstract(node.abstract, context) : null
    };
}
function calcOrganizedEvent(node, context) {
    return {
        name: node.eventName,
        abstract: node.abstract ? calcAbstract(node.abstract, context) : null,
        type: node.eventType,
        organizers: node.organizers
    };
}
function calcTalkSession(node, context) {
    let papersList = [];
    for (let entry of node.papers) {
        let paperName = entry.name;
        for (let paper of context.papers) {
            if (paper.title == paperName) {
                papersList.push(paper);
            }
        }
        ;
    }
    return {
        name: node.eventName,
        abstract: node.abstract ? calcAbstract(node.abstract, context) : null,
        type: node.eventType,
        organizers: node.organizers,
        papersID: papersList
    };
}
// Schedule class
class Schedule {
    constructor() {
        this.schedulePerRoom = new Map();
    }
    ;
    add(start, end, room, event) {
    }
    fillHoles() {
    }
}
class TimeSlot {
    constructor(start, end, event) {
        this.start = start;
        this.end = end;
        this.event = event;
    }
    ;
}
