import * as Parser from './parser2';

export function evaluate(input : string) : object[] | null {
    const p = new Parser.Parser(input);
    const tree = p.parse();
    if(tree.errs.length == 0 && tree.ast)
        return calcRoot(tree.ast, {rooms:[], papers:[], events:[]});
    console.log('' + tree.errs);
    return null;
}


function calcRoot(node : Parser.Root, context : Context) : object[] {
    calcRooms(node.rooms, context);
    calcPapers(node.papers, context);
    calcEvents(node.events, context);
    console.log(context);
    return null;
}

function calcRooms(node : Parser.Rooms, context : Context) : object[] {
    for (let room of node.rooms) {
        const theRoom = calcRoom(room, context);
        context.rooms.push(theRoom);
    }
    return null;
}

function calcRoom(node : Parser.Room, context : Context) : Room {
    return {name : node.name, capacity : node.capacite ? parseInt(node.capacite.value) : null};
}

function calcPapers(node : Parser.Papers, context : Context) : object[] {
    for (let paper of node.papers) {
        const thePaper = calcPaper(paper, context);
        context.papers.push(thePaper);
    }
    return null;
}

function calcPaper(node : Parser.Paper, context : Context) : Paper {
    const thePaper = {
        authors:[], 
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

function calcPerson(node : Parser.Person, context : Context) : object {
    return {
        name : node.name,
        about : node.about ? node.about.value : null,
        homepage : node.homepage ? node.homepage.value : null, 
        email : node.email ? node.email.value : null
    };
}

function calcAbstract(node : Parser.Abstract, context : Context) : string {
    return node.text;
}

function calcVideo(node : Parser.Video, context : Context) : string {
    return node.url;
}

function calcEvents(node : Parser.Events, context : Context) : object[] {
    for (let event of node.events) {
        const theEvent = calcEvent(event, context);
        context.events.push(theEvent);
    }
    return null;
}
function calcEvent(node : Parser.Event, context : Context) : Event {
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
        abstract : node.abstract ? calcAbstract(node.abstract, context) : null
    };
}
function calcOrganizedEvent(node : Parser.OrganizedEvent, context : Context) : Event {
    return {
        name : node.eventName, 
        abstract : node.abstract ? calcAbstract(node.abstract, context) : null, 
        type : node.eventType, 
        organizers : node.organizers
    };
}
function calcTalkSession(node : Parser.TalkSession, context : Context) : Event {
    let papersList = [];
    for (let entry of node.papers) {
        let paperName = entry.name;
        for (let paper of context.papers) {
            if (paper.title == paperName){
                papersList.push(paper);
            }
        };
    }
    return {
        name : node.eventName, 
        abstract : node.abstract ? calcAbstract(node.abstract, context) : null, 
        type : node.eventType, 
        organizers : node.organizers,
        papersID : papersList
    };
}

// Interfaces

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
    papersID ?: Paper[];
}

interface Room {
    name : string;
    capacity : number;
}

// Schedule class

class Schedule {
    private schedulePerRoom: Map<Room, TimeSlot[]> ;
    constructor(){
      this.schedulePerRoom = new Map();
    };
    add(start:string, end:string, room:Room, event:Event){
      
    }
    fillHoles(){
      
    }
}

class TimeSlot {
    private start:Date;
    private end:Date;
    private event:object;
    constructor(start : Date, end : Date, event){
        this.start = start;
        this.end = end;
        this.event = event;
    };
}