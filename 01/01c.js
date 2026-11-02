let command = process.argv[2];
let input =process.argv.slice(3);
console.log("command : " ,command)
console.log("input : ", input)
if(command === 'sum'){
    console.log("sum is:", Number(input[0])+Number(input[1]))
}
else if(command === 'minus')
{
    console.log("result is:", Number(input[0])-Number(input[1]))
}
