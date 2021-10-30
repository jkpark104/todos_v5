// const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

// async function foo() {
//   const res = await Promise.all([
//     new Promise(resolve => setTimeout(() => resolve(1), 3000)),
//     new Promise(resolve => setTimeout(() => resolve(2), 2000)),
//     new Promise(resolve => setTimeout(() => resolve(3), 1000))
//   ]);

//   console.log(res);
// }

// // foo();

// (async () => {
//   console.log('1');

//   await sleep(2000);

//   console.log('3');
// })();

// const promise = new Promise(resolve => resolve());

// setTimeout(() => console.log(1), 0);

// promise(() => {
//   console.log('hi');
// });
