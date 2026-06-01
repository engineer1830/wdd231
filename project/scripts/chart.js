import { sectorColors } from "./scripts/colors.js";

let fullData = {};
let chart = null;

export async function initSectorChart() {
    const res = await fetch("/api/12month");
    const data = await res.json();

    fullData = Object.fromEntries(
        Object.entries(data).map(([sector, series]) => [
            sector,
            series.map(p => ({
                date: new Date(p.date * 1000),
                value: p.value
            }))
        ])
    );

    renderChart("12M");
    setupRangeButtons();
}

function filterRange(series, range) {
    const now = new Date();
    const cutoff = new Date();

    if (range === "1M") cutoff.setMonth(now.getMonth() - 1);
    if (range === "3M") cutoff.setMonth(now.getMonth() - 3);
    if (range === "6M") cutoff.setMonth(now.getMonth() - 6);
    if (range === "12M") cutoff.setFullYear(now.getFullYear() - 1);
    if (range === "YTD") cutoff.setMonth(0, 1);

    return series.filter(p => p.date >= cutoff);
}

function renderChart(range) {
    const ctx = document.getElementById("sectorChart").getContext("2d");

    const datasets = Object.entries(fullData).map(([sector, series]) => ({
        label: sector,
        data: filterRange(series, range).map(p => ({
            x: p.date,
            y: p.value * 100
        })),
        borderColor: sectorColors[sector],
        borderWidth: 2,
        fill: false,
        tension: 0.25
    }));

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "time",
                    time: { unit: "month" },
                    grid: { display: false }
                },
                y: {
                    ticks: {
                        callback: v => v.toFixed(1) + "%"
                    }
                }
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                        pointStyle: "circle"
                    }
                },
                tooltip: {
                    callbacks: {
                        label: ctx =>
                            `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}%`
                    }
                }
            }
        }
    });
}

function setupRangeButtons() {
    document.querySelectorAll("#rangeButtons button").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector("#rangeButtons .active")?.classList.remove("active");
            btn.classList.add("active");
            renderChart(btn.dataset.range);
        });
    });
}
