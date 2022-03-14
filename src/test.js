function solution(numbers) {
    let answer = []
    const lenNums = numbers.length
    for(let k=0; k < lenNums; k++){
        for(let j = k + 1; j < lenNums; j++){
            if(j < lenNums){
                answer.push(numbers[k] + numbers[j])
            }
            
        }
        
    }
    answer = new Set(answer)
    return [...answer].sort((a, b) => a - b)
}