const $ = (selector) => document.querySelector(selector);
const money = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
  minimumFractionDigits: 2
});

const state = {
  updatedSalary: 0,
  januaryBonus: 0,
  decemberBonus: 0,
  doubleSalary: 0,
  total: 0
};

function nextOccurrence(monthIndex, day = 1) {
  const now = new Date();
  let target = new Date(now.getFullYear(), monthIndex, day, 0, 0, 0);
  if (target <= now) target = new Date(now.getFullYear() + 1, monthIndex, day, 0, 0, 0);
  return target;
}

function formatCountdown(target) {
  const distance = target.getTime() - Date.now();
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance % 86_400_000) / 3_600_000);
  const minutes = Math.floor((distance % 3_600_000) / 60_000);
  const seconds = Math.floor((distance % 60_000) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function updateCountdowns() {
  const january = nextOccurrence(0, 1);
  const december = nextOccurrence(11, 1);

  $("#januaryCountdown").textContent = formatCountdown(january);
  $("#decemberCountdown").textContent = formatCountdown(december);
  $("#januaryDate").textContent = january.toLocaleDateString("es-DO", { dateStyle: "long" });
  $("#decemberDate").textContent = december.toLocaleDateString("es-DO", { dateStyle: "long" });
}

function renderResults() {
  $("#updatedSalary").textContent = money.format(state.updatedSalary);
  $("#januaryBonus").textContent = money.format(state.januaryBonus);
  $("#decemberBonus").textContent = money.format(state.decemberBonus);
  $("#doubleSalary").textContent = money.format(state.doubleSalary);
  $("#totalAmount").textContent = money.format(state.total);
}

$("#benefitsForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const salary = Number($("#salary").value);
  const years = Number($("#years").value);
  const increase = Number($("#increase").value || 0);
  const goodYear = $("#goodYear").checked;

  if (!Number.isFinite(salary) || salary <= 0 || !Number.isFinite(years) || years < 0) {
    alert("Introduce un salario y tiempo en la empresa válidos.");
    return;
  }

  const updatedSalary = salary * (1 + increase / 100);
  const octoberInput = $("#octoberBonus").value.trim();
  const octoberBonus = octoberInput === "" ? updatedSalary : Number(octoberInput);

  const decemberBonus = updatedSalary * (years < 3 ? 1.59 : 2.52);
  const januaryBonusRaw = years < 3
    ? updatedSalary * 2.48 - octoberBonus
    : updatedSalary * (goodYear ? 6.88 : 6.40);

  state.updatedSalary = updatedSalary;
  state.januaryBonus = Math.max(0, januaryBonusRaw);
  state.decemberBonus = decemberBonus;
  state.doubleSalary = updatedSalary;
  state.total = state.januaryBonus + state.decemberBonus + state.doubleSalary;

  renderResults();
});

$("#benefitsForm").addEventListener("reset", () => {
  setTimeout(() => {
    Object.keys(state).forEach((key) => state[key] = 0);
    renderResults();
  }, 0);
});

$("#copyResult").addEventListener("click", async () => {
  const summary = [
    "Resumen de beneficios",
    `Salario actualizado: ${money.format(state.updatedSalary)}`,
    `Bono de enero: ${money.format(state.januaryBonus)}`,
    `Bono de diciembre: ${money.format(state.decemberBonus)}`,
    `Doble sueldo: ${money.format(state.doubleSalary)}`,
    `Total estimado: ${money.format(state.total)}`
  ].join("\n");

  try {
    await navigator.clipboard.writeText(summary);
    $("#copyResult").textContent = "Resumen copiado";
    setTimeout(() => $("#copyResult").textContent = "Copiar resumen", 1500);
  } catch {
    alert(summary);
  }
});

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

updateCountdowns();
setInterval(updateCountdowns, 1000);
renderResults();
