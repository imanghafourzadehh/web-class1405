let command = process.argv[2];
let input = process.argv.slice(3);

console.log("------------------------");
console.log("command is:", command);
console.log("inputs are:", input);


let controllers =[
    {
        name: "sum",
        func: function sum(input){
            console.log("sum is:", Number(input[0]) + Number(input[1]))
        }
    },
    {
        name: "minus",
        func: function minus(input){
            console.log("result is:", Number(input[0]) - Number(input[1]))    
        }
    },
    {
        name: "print",
        func: function print(input){
            let items = {
            name: input[0],
            email: input[1],
            age: input[2]
            }   
            console.log("object is:",input);
        }   
    }
]

let found = false;
for(let i = 0; i < controllers.length; i++){
    if(controllers[i].name === command){
        found = true;
        controllers[i].func(input);
        break;
    }
}
if(!found){
    console.log("command not found.")
}
    