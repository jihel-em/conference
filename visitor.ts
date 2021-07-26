import * as Parser from './parser2';

interface Context {
    rooms: Room[];
    papers: Paper[];
    events: Event[];
}

interface Paper{
    authors:object[];
    title: string;
    abstract: string; 
    video: string;
}

interface Event{
    name : string;
    abstract : string ;
    type ?: string;
    organizers ?: object[];
    papersID ?: number[];
}

interface Room {
    name : string;
    capacity : number;
}

export function evaluate(input : string) : object[] | null {
    const p = new Parser.Parser(input);
    const tree = p.parse();
    if(tree.errs.length == 0 && tree.ast)
        return calcROOT(tree.ast, {rooms:[], papers:[], events:[]});
    console.log('' + tree.errs);
    return null;
}


function calcROOT(node : Parser.ROOT, context : Context) : object[] {
    calcROOMS(node.rooms, context);
    calcPAPERS(node.papers, context);
    calcEVENTS(node.events, context);
    console.log(context);
    return null;
}

function calcROOMS(node : Parser.ROOMS, context : Context) : object[] {
    for (let room of node.rooms) {
        const theRoom = calcROOM(room, context);
        context.rooms.push(theRoom);
    }
    return null;
}

function calcROOM(node : Parser.ROOM, context : Context) : Room {
    return {name : node.name, capacity : node.capacite ? parseInt(node.capacite.value) : null};
}

function calcPAPERS(node : Parser.PAPERS, context : Context) : object[] {
    for (let paper of node.papers) {
        const thePaper = calcPAPER(paper, context);
        context.papers.push(thePaper);
    }
    return null;
}

function calcPAPER(node : Parser.PAPER, context : Context) : Paper {
    const thePaper = {
        authors:[], 
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

function calcPERSON(node : Parser.PERSON, context : Context) : object {
    return {
        name : node.name,
        about : node.about ? node.about.value : null,
        homepage : node.homepage ? node.homepage.value : null, 
        email : node.email ? node.email.value : null
    };
}

function calcABSTRACT(node : Parser.ABSTRACT, context : Context) : string {
    return node.text;
}

function calcVIDEO(node : Parser.VIDEO, context : Context) : string {
    return node.url;
}

function calcEVENTS(node : Parser.EVENTS, context : Context) : object[] {
    for (let event of node.events) {
        const theEvent = calcEVENT(event, context);
        context.events.push(theEvent);
    }
    return null;
}
function calcEVENT(node : Parser.EVENT, context : Context) : Event {
    if(node.kind == Parser.ASTKinds.SimpleEvent){
        return calcSimpleEvent(node, context);
    }
    if(node.kind == Parser.ASTKinds.OrganizedEvent){
        return calcOrganizedEvent(node, context);
    }
    if(node.kind == Parser.ASTKinds.TalkSession){
        return calcTalkSession(node, context);
    }
    return null;
}
function calcSimpleEvent(node : Parser.SimpleEvent, context : Context) : Event {
    return {
        name : node.eventName, 
        abstract : node.abstract ? calcABSTRACT(node.abstract, context) : null
    };
}
function calcOrganizedEvent(node : Parser.OrganizedEvent, context : Context) : Event {
    return {
        name : node.eventName, 
        abstract : node.abstract ? calcABSTRACT(node.abstract, context) : null, 
        type : node.eventType, 
        organizers : node.organizers
    };
}
function calcTalkSession(node : Parser.TalkSession, context : Context) : Event {
    let papersList = [];
    for (let entry of node.papers) {
        let paperName = entry.name;
        context.papers.forEach((paper, index) => {
            if (paper.title == paperName){
                papersList.push(index);
            }
        });
    }
    return {
        name : node.eventName, 
        abstract : node.abstract ? calcABSTRACT(node.abstract, context) : null, 
        type : node.eventType, 
        organizers : node.organizers,
        papersID : papersList
    };
}