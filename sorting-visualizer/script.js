const arrayContainer = document.getElementById("array");
const sizeInput = document.getElementById("sizeInput");
let arr = [];
let isSorting = false;

function generateArray(size = 12) {
  arr = [];
  arrayContainer.innerHTML = "";
  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 100) + 1;
    arr.push(value);

    const num = document.createElement("div");
    num.classList.add("num");
    num.textContent = value;
    arrayContainer.appendChild(num);
  }
  isSorting = false;
}

function generateNewArray() {
  const size = parseInt(sizeInput.value) || 12;
  generateArray(size);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function swapElements(el1, el2) {
  return new Promise(resolve => {
    const parent = el1.parentNode;
    const next1 = el1.nextSibling;
    const next2 = el2.nextSibling;

    el1.classList.add("swapping");
    el2.classList.add("swapping");

    setTimeout(() => {
      if (next1 === el2) {
        parent.insertBefore(el2, el1);
      } 
      else if (next2 === el1) {
        parent.insertBefore(el1, el2);
      } 
      else {
        parent.insertBefore(el1, next2);
        parent.insertBefore(el2, next1);
      }

      el1.classList.remove("swapping");
      el2.classList.remove("swapping");
      resolve();
    }, 400);
  });
}

async function bubbleSort() {
  if (isSorting) return;
  isSorting = true;

  const nums = document.getElementsByClassName("num");

  for (let i = 0; i < arr.length-1; i++) {
    for (let j = 0; j < arr.length-i-1; j++) {
      nums[j].classList.add("comparing");
      nums[j+1].classList.add("comparing");

      await sleep(300);

      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        await swapElements(nums[j], nums[j+1]);
      }

      nums[j].classList.remove("comparing");
      nums[j+1].classList.remove("comparing");
    }
    nums[arr.length-i-1].classList.add("sorted");
  }
  nums[0].classList.add("sorted");

  isSorting = false;
}

generateArray();