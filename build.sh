#!/bin/bash
tspeg grammar.peg parser2.ts        
tsc -t ES2015 -m commonjs parser2.ts
tsc -t ES2015 -m commonjs visitor.ts