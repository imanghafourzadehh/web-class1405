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

export {
    controllers
}