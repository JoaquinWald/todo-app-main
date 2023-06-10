


function isValidSubsequence(array, sequence) {

  let n = array.length;
  let m = sequence.length;
  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    if (array[i] === sequence[j]) {
      j++
    }
    i++;
  }

  return j === m;
}


const array = [5, 1, 22, 25, 6, -1, 8, 10]
const sequence = [1, 6, -1, 10]

isValidSubsequence(array, sequence);



const isPrime = (element) => {

  let start = 2;
  for (let i = start; i <= Math.sqrt(element); i++) {
    if (element % i === 0) {
      return false;
    }
  }

  return element > 1;

}

const primeNumbers = [4, 5, 8, 12].filter(isPrime);

console.log(primeNumbers);