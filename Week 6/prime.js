function isPrime(num) {
  if (num <= 1) return false; // 0 and 1 are not prime
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false; // not prime
    }
  }
  return true // prime
}

console.log(isPrime(7));  
console.log(isPrime(10)); 