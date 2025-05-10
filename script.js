const API_BASE = "https://your-cloud-function-url"; // Update this later

const balanceEl = document.getElementById("balance");
const btcPriceEl = document.getElementById("btc-price");
const ethPriceEl = document.getElementById("eth-price");
const tradeForm = document.getElementById("trade-form");
const responseBox = document.getElementById("response");

async function fetchPrices() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
  const data = await res.json();
  btcPriceEl.textContent = `$${data.bitcoin.usd}`;
  ethPriceEl.textContent = `$${data.ethereum.usd}`;
}

async function fetchBalance() {
  const res = await fetch(`${API_BASE}/balance`);
  const data = await res.json();
  balanceEl.textContent = `$${data.balance.toFixed(2)}`;
}

tradeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const symbol = document.getElementById("symbol").value;
  const side = document.getElementById("side").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const res = await fetch(`${API_BASE}/trade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol, side, amount }),
  });
  const result = await res.json();
  responseBox.textContent = JSON.stringify(result, null, 2);
  fetchBalance();
});

fetchPrices();
fetchBalance();
setInterval(fetchPrices, 5000);
