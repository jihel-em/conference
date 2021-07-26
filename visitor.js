"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const Parser = require("./parser2");
function evaluate(input) {
    const p = new Parser.Parser(input);
    const tree = p.parse();
    if (tree.errs.length == 0 && tree.ast)
        return calcROOT(tree.ast, { rooms: [], papers: [], events: [] });
    console.log('' + tree.errs);
    return null;
}
exports.evaluate = evaluate;
function calcROOT(node, context) {
    calcROOMS(node.rooms, context);
    calcPAPERS(node.papers, context);
    calcEVENTS(node.events, context);
    console.log(context);
    return null;
}
function calcROOMS(node, context) {
    for (let room of node.rooms) {
        const theRoom = calcROOM(room, context);
        context.rooms.push(theRoom);
    }
    return null;
}
function calcROOM(node, context) {
    return { name: node.name, capacity: node.capacite ? parseInt(node.capacite.value) : null };
}
function calcPAPERS(node, context) {
    for (let paper of node.papers) {
        const thePaper = calcPAPER(paper, context);
        context.papers.push(thePaper);
    }
    return null;
}
function calcPAPER(node, context) {
    const thePaper = {
        authors: [],
        title: node.paperName,
        abstract: node.abstract ? calcABSTRACT(node.abstract, context) : null,
        video: node.video ? calcVIDEO(node.video, context) : null
    };
    for (let author of node.authors) {
        const theAuthor = calcPERSON(author, context);
        thePaper.authors.push(thePaper);
    }
    return thePaper;
}
function calcPERSON(node, context) {
    return {
        name: node.name,
        about: node.about ? node.about.value : null,
        homepage: node.homepage ? node.homepage.value : null,
        email: node.email ? node.email.value : null
    };
}
function calcABSTRACT(node, context) {
    return node.text;
}
function calcVIDEO(node, context) {
    return node.url;
}
function calcEVENTS(node, context) {
    for (let event of node.events) {
        const theEvent = calcEVENT(event, context);
        context.events.push(theEvent);
    }
    return null;
}
function calcEVENT(node, context) {
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
        abstract: node.abstract ? calcABSTRACT(node.abstract, context) : null
    };
}
function calcOrganizedEvent(node, context) {
    return {
        name: node.eventName,
        abstract: node.abstract ? calcABSTRACT(node.abstract, context) : null,
        type: node.eventType,
        organizers: node.organizers
    };
}
function calcTalkSession(node, context) {
    let papersList = [];
    for (let entry of node.papers) {
        let paperName = entry.name;
        context.papers.forEach((paper, index) => {
            if (paper.title == paperName) {
                papersList.push(index);
            }
        });
    }
    return {
        name: node.eventName,
        abstract: node.abstract ? calcABSTRACT(node.abstract, context) : null,
        type: node.eventType,
        organizers: node.organizers,
        papersID: papersList
    };
}
