document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultContainer = document.getElementById('result-container');
    const tuloResult = document.getElementById('tulo-result');
    const tuloBar = document.getElementById('tulo-bar');
    const poistoCard = document.getElementById('poisto-card');
    const poistoResult = document.getElementById('poisto-result');
    const poistoBar = document.getElementById('poisto-bar');

    const useLiquidCheckbox = document.getElementById('use-liquid');
    const liquidInputs = document.getElementById('liquid-inputs');
    const gt40Input = document.getElementById('gt40');
    const gt41Input = document.getElementById('gt41');
    const gt42Input = document.getElementById('gt42');

    // Translations
    const translations = {
        fi: {
            "title": "ECONET",
            "subtitle": "Lämpötilahyötysuhteen laskin",
            "ulko": "Ulkoilman lämpötila (°C)",
            "tulo": "Tuloilman lämpötila LTO jälkeen (°C)",
            "poisto": "Poistoilman lämpötila (°C)",
            "flowtulo": "Tuloilma",
            "flowpoisto": "Poistoilma",
            "opt1": "Valinn.",
            "opt2": "Valinn.",
            "opt3": "Valinnainen",
            "liquid-q": "Lisätäänkö järjestelmään ulkoista energiaa?",
            "gt40": "Nestelämpötila tuloilmapatteri meno TE40 (°C)",
            "gt41": "Nestelämpötila tuloilmapatteri paluu TE41 (°C)",
            "gt42": "Nestelämpötila poistoilmapatteri paluu TE42 (°C)",
            "jate": "Jäteilman lämpötila (°C)",
            "submit": "Laske Hyötysuhde",
            "res1": "Tuloilman hyötysuhde",
            "res2": "Poistoilman hyötysuhde",
            "opt4": "Valinn.",
            "opt5": "Valinn.",
            "liquid_flow": "Nestevirta",
            "eg_pct": "EG pitoisuus",
            "res_ilma_teho": "Ilmapuolen teho",
            "res_neste_teho": "Nestepuolen teho"
        },
        en: {
            "title": "ECONET",
            "subtitle": "Temperature Efficiency Calculator",
            "ulko": "Outdoor air temperature (°C)",
            "tulo": "Supply air temperature after heat recovery (°C)",
            "poisto": "Extract air temperature (°C)",
            "flowtulo": "Supply flow",
            "flowpoisto": "Extract flow",
            "opt1": "Opt.",
            "opt2": "Opt.",
            "opt3": "Optional",
            "liquid-q": "Is external energy added to the system?",
            "gt40": "Liquid temp supply coil flow GT40 (°C)",
            "gt41": "Liquid temp supply coil return GT41 (°C)",
            "gt42": "Liquid temp extract coil return GT42 (°C)",
            "jate": "Exhaust air temperature (°C)",
            "submit": "Calculate Efficiency",
            "res1": "Supply air efficiency",
            "res2": "Extract air efficiency",
            "opt4": "Opt.",
            "opt5": "Optional",
            "liquid_flow": "Liquid flow",
            "eg_pct": "EG concentration",
            "res_ilma_teho": "Air side power",
            "res_neste_teho": "Liquid side power"
        },
        sv: {
            "title": "ECONET",
            "subtitle": "Temperaturverkningsgrad kalkylator",
            "ulko": "Utetemperatur (°C)",
            "tulo": "Tilluftstemperatur efter återvinning (°C)",
            "poisto": "Frånluftstemperatur (°C)",
            "flowtulo": "Tilluftsflöde",
            "flowpoisto": "Frånluftsflöde",
            "opt1": "Friv.",
            "opt2": "Friv.",
            "opt3": "Frivillig",
            "liquid-q": "Tillsätts extern energi i systemet?",
            "gt40": "Vätsketemp. tilluftsbatteri fram GT40 (°C)",
            "gt41": "Vätsketemp. tilluftsbatteri retur GT41 (°C)",
            "gt42": "Vätsketemp. frånluftsbatteri retur GT42 (°C)",
            "jate": "Avluftstemperatur (°C)",
            "submit": "Beräkna Verkningsgrad",
            "res1": "Tilluftens verkningsgrad",
            "res2": "Frånluftens verkningsgrad",
            "opt4": "Friv.",
            "opt5": "Friv.",
            "liquid_flow": "Vätskeflöde",
            "eg_pct": "EG-koncentration",
            "res_ilma_teho": "Luftsidans effekt",
            "res_neste_teho": "Vätskesidans effekt"
        }
    };

    // Language switching logic
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');

            const lang = target.getAttribute('data-lang');
            const data = translations[lang];

            document.getElementById('t-title').innerText = data.title;
            document.getElementById('t-subtitle').innerText = data.subtitle;
            document.getElementById('t-ulko').innerText = data.ulko;
            document.getElementById('t-tulo').innerText = data.tulo;
            document.getElementById('t-poisto').innerText = data.poisto;
            document.getElementById('t-flowtulo').innerText = data.flowtulo;
            document.getElementById('t-flowpoisto').innerText = data.flowpoisto;
            document.getElementById('t-opt1').innerText = data.opt1;
            document.getElementById('t-opt2').innerText = data.opt2;
            document.getElementById('t-opt3').innerText = data.opt3;
            document.getElementById('t-liquid-q').innerText = data["liquid-q"];
            document.getElementById('t-gt40').innerText = data.gt40;
            document.getElementById('t-gt41').innerText = data.gt41;
            document.getElementById('t-gt42').innerText = data.gt42;
            document.getElementById('t-jate').innerText = data.jate;
            document.getElementById('t-submit').innerText = data.submit;
            document.getElementById('t-res1').innerText = data.res1;
            document.getElementById('t-res2').innerText = data.res2;
            document.getElementById('t-opt4').innerText = data.opt4;
            document.getElementById('t-opt5').innerText = data.opt5;
            document.getElementById('t-liquid-flow').innerText = data.liquid_flow;
            document.getElementById('t-eg-pct').innerText = data.eg_pct;
            document.getElementById('t-res-ilma-teho').innerText = data.res_ilma_teho;
            document.getElementById('t-res-neste-teho').innerText = data.res_neste_teho;
        });
    });

    // Toggle liquid inputs visibility
    useLiquidCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            liquidInputs.classList.add('expanded');
            gt40Input.required = true;
            gt41Input.required = true;
            gt42Input.required = true;
        } else {
            liquidInputs.classList.remove('expanded');
            gt40Input.required = false;
            gt41Input.required = false;
            gt42Input.required = false;
        }
    });

    // Number parsing supporting commas
    const parseNumber = (val) => {
        if (!val) return null;
        return parseFloat(val.replace(',', '.'));
    };

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = (progress * (end - start) + start).toFixed(1);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.classList.add('animate-pop');
                setTimeout(() => obj.classList.remove('animate-pop'), 400);
            }
        };
        window.requestAnimationFrame(step);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const ulko = parseNumber(document.getElementById('ulko').value);
        const tulo = parseNumber(document.getElementById('tulo').value);
        const poisto = parseNumber(document.getElementById('poisto').value);
        const jateInput = document.getElementById('jate').value;
        const jate = parseNumber(jateInput);

        const flowTulo = parseNumber(document.getElementById('flow-tulo').value);
        const flowPoisto = parseNumber(document.getElementById('flow-poisto').value);

        const isLiquidActive = useLiquidCheckbox.checked;
        const gt40 = parseNumber(gt40Input.value);
        const gt41 = parseNumber(gt41Input.value);
        const gt42 = parseNumber(gt42Input.value);

        // Validation
        if (isNaN(ulko) || isNaN(tulo) || isNaN(poisto)) return;
        if (isLiquidActive && (isNaN(gt40) || isNaN(gt41) || isNaN(gt42))) return;

        // Calculate Tulo hyötysuhde
        let tuloHyoty = 0;
        if (poisto !== ulko) {
            if (isLiquidActive) {
                if (gt40 !== gt41) {
                    const osoittaja = (gt42 - gt41) * (tulo - ulko);
                    const nimittaja = (gt40 - gt41) * (poisto - ulko);
                    if (nimittaja !== 0) {
                        tuloHyoty = (osoittaja / nimittaja) * 100;
                    }
                }
            } else {
                tuloHyoty = ((tulo - ulko) / (poisto - ulko)) * 100;
            }
            // Air Flow adjustments (LTO.png kaava 7)
            if (flowTulo !== null && flowPoisto !== null && flowPoisto > 0 && !isNaN(flowTulo) && !isNaN(flowPoisto)) {
                let rLto = flowTulo / flowPoisto;
                tuloHyoty = ((1 + rLto) / 2) * tuloHyoty;
            }
            tuloHyoty = Math.max(0, Math.min(100, tuloHyoty));
        }

        // Show results
        resultContainer.classList.remove('hidden');

        // Animate tulo
        animateValue(tuloResult, 0, tuloHyoty, 1000);
        setTimeout(() => {
            tuloBar.style.width = `${tuloHyoty}%`;
            // Change color dynamically based on efficiency
            if (tuloHyoty < 50) tuloBar.style.background = 'linear-gradient(to right, #ef4444, #f87171)';
            else if (tuloHyoty < 75) tuloBar.style.background = 'linear-gradient(to right, #f59e0b, #fbbf24)';
            else tuloBar.style.background = 'linear-gradient(to right, #10b981, #34d399)';
        }, 50);

        // Calculate Poisto hyötysuhde if provided
        if (jateInput.trim() !== '' && !isNaN(jate)) {
            let poistoHyoty = 0;
            if (poisto !== ulko) {
                poistoHyoty = ((poisto - jate) / (poisto - ulko)) * 100;

                // Air Flow adjustments (LTO.png kaava 7 logiikka)
                if (flowTulo !== null && flowPoisto !== null && flowPoisto > 0 && !isNaN(flowTulo) && !isNaN(flowPoisto)) {
                    let rLto = flowTulo / flowPoisto;
                    poistoHyoty = ((1 + rLto) / 2) * poistoHyoty;
                }

                poistoHyoty = Math.max(0, Math.min(100, poistoHyoty));
            }

            poistoCard.classList.remove('hidden');
            animateValue(poistoResult, 0, poistoHyoty, 1000);
            setTimeout(() => {
                poistoBar.style.width = `${poistoHyoty}%`;
                if (poistoHyoty < 50) poistoBar.style.background = 'linear-gradient(to right, #ef4444, #f87171)';
                else if (poistoHyoty < 75) poistoBar.style.background = 'linear-gradient(to right, #f59e0b, #fbbf24)';
                else poistoBar.style.background = 'linear-gradient(to right, #10b981, #34d399)';
            }, 50);
        } else {
            poistoCard.classList.add('hidden');
            poistoResult.innerHTML = '0';
            poistoBar.style.width = '0%';
        }

        // Calculate Powers
        const flowLiquid = parseNumber(document.getElementById('flow-liquid').value);
        const egPctInput = document.getElementById('eg-pct').value;
        const egPct = parseNumber(egPctInput) || 0;

        const ilmaTehoCard = document.getElementById('ilma-teho-card');
        if (!isNaN(flowTulo) && flowTulo > 0) {
            const pIlma = flowTulo * 1.2 * (tulo - ulko);
            document.getElementById('ilma-teho-result').innerText = Math.max(0, pIlma).toFixed(1);
            ilmaTehoCard.classList.remove('hidden');
        } else {
            ilmaTehoCard.classList.add('hidden');
        }

        const nesteTehoCard = document.getElementById('neste-teho-card');
        if (isLiquidActive && !isNaN(flowLiquid) && flowLiquid > 0 && !isNaN(gt40) && !isNaN(gt41)) {
            const pitoisuus = Math.max(0, Math.min(100, egPct)) / 100.0;
            const rho = 998 + (1113 - 998) * pitoisuus;
            const c = 4190 + (2360 - 4190) * pitoisuus;
            const deltaTg = Math.abs(gt41 - gt40);
            const pNeste = (rho * c * flowLiquid * deltaTg) / 1000000.0;
            document.getElementById('neste-teho-result').innerText = pNeste.toFixed(1);
            nesteTehoCard.classList.remove('hidden');
        } else {
            nesteTehoCard.classList.add('hidden');
        }
    });

    // Add subtle animation on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.parentElement.style.transform = 'translateX(5px)';
            input.parentElement.parentElement.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', () => {
            input.parentElement.parentElement.style.transform = 'translateX(0)';
        });
    });
});
