# Installation and building

```
npm install
```

Building the application

```
tsc
```

To run the application using Node:

```
node dist/index.js calc-wood-needed -w 8 -l 8
node dist/index.js getCustomer --name Bob
```

To build and run the application using npm:

```
npm start -- calc-wood-needed --width 8 --length 96 --inl
npm start -- getCustomer --name Bob
```

#Commands
---

- calc-wood-needed --width --length --inl --inw --name 
Calculates the wood needed for a house.
Flags:
-- width: the width of the house.
-- inw: Flag to tell the calculator the width is already in inches.
-- length: the length of the house.
-- inl: Flag to tell the calculator the length is already in inches.
-- name: The name of the customer.  Optional, will assign the name "Testy McTesterson" to any house without a name.

-- getCustomer --name nameOfCustomer
Gets a customer's house by their name.

##Examples

```
npm start calc-wood-needed --width 8 -l 8
npm start calc-wood-needed --width 96 -l 8 --inw
npm start getCustomer --name Bob
npm start getCustomer --name Jimmy\ Jameson
```

#Tests
---

|Test Command | Output
----------------------
| node dist/index.js calc-wood-needed -w 8 -l 96 --inl | {posts: 5, studs: 31, plates: 16}
| npm run start -- getCustomer --name Testy\ McTesterson | {widthMaterials: function: 'buildWall', inches: 96, studs: 16, posts 0, plates: 7}
|                                                         | {lengthMaterials: function: 'buildWall', inches: 96, studs: 16, posts 0, plates: 7}
----------------------


#Packages used
---

I used [Yargs](https://www.npmjs.com/package/yargs) to parse command line arguments

#Further help
---

```
npm start -- calc-wood-needed --help
npm start -- getCustomer --help
```
